// TOJI BODY - Firebase Config & Real-time Sync

class TojiFirebase {
  constructor(firebaseConfig) {
    this.config = firebaseConfig;
    this.userId = null;
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.initAuth();
  }

  initAuth() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.setupRealtimeListeners();
      }
    });
  }

  setupRealtimeListeners() {
    if (!this.userId) return;

    // Listen to workouts
    this.db.collection('users').doc(this.userId).collection('workouts')
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          localStorage.setItem(`tojiWorkout_${doc.id}`, JSON.stringify(doc.data()));
        });
        window.dispatchEvent(new Event('tojiDataSynced'));
      });

    // Listen to nutrition
    this.db.collection('users').doc(this.userId).collection('nutrition')
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          localStorage.setItem(`tojiNutrition_${doc.id}`, JSON.stringify(doc.data()));
        });
        window.dispatchEvent(new Event('tojiDataSynced'));
      });

    // Listen to PRs
    this.db.collection('users').doc(this.userId).collection('stats').doc('personals')
      .onSnapshot((doc) => {
        if (doc.exists) {
          localStorage.setItem('tojiPRData', JSON.stringify(doc.data()));
          window.dispatchEvent(new Event('tojiDataSynced'));
        }
      });
  }

  async saveWorkoutSession(dateStr, sessionData) {
    if (!this.userId) return;
    try {
      await this.db.collection('users').doc(this.userId)
        .collection('workouts').doc(dateStr)
        .set(sessionData, {merge: true});
    } catch (err) {
      console.error('Failed to save workout:', err);
    }
  }

  async saveNutrition(dateStr, nutritionData) {
    if (!this.userId) return;
    try {
      await this.db.collection('users').doc(this.userId)
        .collection('nutrition').doc(dateStr)
        .set(nutritionData, {merge: true});
    } catch (err) {
      console.error('Failed to save nutrition:', err);
    }
  }

  async updatePR(exerciseName, weight) {
    if (!this.userId) return;
    try {
      await this.db.collection('users').doc(this.userId)
        .collection('stats').doc('personals')
        .set({[exerciseName]: weight}, {merge: true});
    } catch (err) {
      console.error('Failed to update PR:', err);
    }
  }

  async getWorkoutHistory(daysBack = 30) {
    if (!this.userId) return [];
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);
      
      const snapshot = await this.db.collection('users').doc(this.userId)
        .collection('workouts')
        .where('timestamp', '>=', startDate)
        .orderBy('timestamp', 'desc')
        .get();

      return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (err) {
      console.error('Failed to get workout history:', err);
      return [];
    }
  }

  async exportData() {
    if (!this.userId) return null;
    try {
      const workouts = await this.db.collection('users').doc(this.userId).collection('workouts').get();
      const nutrition = await this.db.collection('users').doc(this.userId).collection('nutrition').get();
      const prs = await this.db.collection('users').doc(this.userId).collection('stats').doc('personals').get();

      return {
        workouts: workouts.docs.map(d => ({id: d.id, ...d.data()})),
        nutrition: nutrition.docs.map(d => ({id: d.id, ...d.data()})),
        prs: prs.data() || {}
      };
    } catch (err) {
      console.error('Failed to export data:', err);
      return null;
    }
  }
}

// PASTE YOUR FIREBASE CONFIG HERE (from Firebase Console)
 const firebaseConfig = {
    apiKey: "AIzaSyCr0XKKq2kIHYuY6vBwoyU86owMLLQYXKs",
    authDomain: "toji-58434.firebaseapp.com",
    projectId: "toji-58434",
    storageBucket: "toji-58434.firebasestorage.app",
    messagingSenderId: "16723384835",
    appId: "1:16723384835:web:5b78d8f045735f490d8c36",
    measurementId: "G-Q6GETNYK0E"
  };

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

// Initialize Firestore with offline support
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Offline persistence already enabled in another tab');
    } else if (err.code == 'unimplemented') {
      console.log('Browser does not support offline persistence');
    }
  });

// Create global instance
window.tojiFirebase = new TojiFirebase(FIREBASE_CONFIG);
