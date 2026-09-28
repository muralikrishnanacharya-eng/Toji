// TOJI BODY - Complete Application with Firebase Sync
// All your original functions integrated + Firebase integration

// ============================================================
// DATA & CONSTANTS
// ============================================================

const TOJI_WORKOUT_PLAN = {
  'Push A': {day: 'Monday', focus: 'Chest · Front/Side Delts · Triceps', exercises: [
    {name: 'Flat Bench Press', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 65, warmup: 'heavy'},
    {name: 'Incline Dumbbell Press', type: 'DB', sets: 3, minReps: 8, maxReps: 12, startWeight: 25, warmup: 'light'},
    {name: 'Overhead Barbell Press', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 40, warmup: 'heavy'},
    {name: 'Lateral Raises', type: 'DB', sets: 3, minReps: 15, maxReps: 20, startWeight: 7.5, warmup: 'light'},
    {name: 'Skull Crushers (EZ Bar)', type: 'BB', sets: 3, minReps: 10, maxReps: 12, startWeight: 20, warmup: 'light'},
    {name: 'Tricep Pushdowns', type: 'Cable', sets: 3, minReps: 12, maxReps: 15, startWeight: 45, warmup: 'none'}
  ], core: 'UPPER ABS: Decline Sit-ups (Weighted) × 3 sets × 15 reps\nLOWER ABS: Hanging Leg Raises × 3 sets × 10-15 reps', cardio: 'INCLINE WALK · 30 min · Incline 10% · Speed 5.5 km/h · Burns ~280 kcal'},
  'Pull A': {day: 'Tuesday', focus: 'Back Width · Biceps · Traps', exercises: [
    {name: 'Deadlift', type: 'BB', sets: 3, minReps: 5, maxReps: 8, startWeight: 70, warmup: 'heavy'},
    {name: 'Weighted Pull-ups (or Lat Pulldown)', type: 'BW/MC', sets: 3, minReps: 8, maxReps: 12, startWeight: 0, warmup: 'light'},
    {name: 'Chest Supported T-Bar Row', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 35, warmup: 'moderate'},
    {name: 'EZ Bar Preacher Curls', type: 'BB', sets: 3, minReps: 10, maxReps: 12, startWeight: 15, warmup: 'light'},
    {name: 'Barbell Curls', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 12, warmup: 'none'},
    {name: 'Face Pulls', type: 'Cable', sets: 3, minReps: 15, maxReps: 20, startWeight: 30, warmup: 'none'},
    {name: 'DB Shrugs', type: 'DB', sets: 3, minReps: 12, maxReps: 15, startWeight: 20, warmup: 'none'}
  ], grip: 'Landmine Rotations (3 sets 12-15 reps each side, 20kg bar + 5kg plate)', cardio: 'INCLINE WALK · 30 min · Incline 10% · Speed 5.5 km/h · Burns ~280 kcal'},
  'Legs A': {day: 'Wednesday', focus: 'Quads · Core', exercises: [
    {name: 'Barbell Squat', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 70, warmup: 'heavy'},
    {name: 'Leg Press', type: 'MC', sets: 3, minReps: 12, maxReps: 15, startWeight: 70, warmup: 'light'},
    {name: 'Walking Lunges', type: 'DB', sets: 3, minReps: 12, maxReps: 15, startWeight: 7.5, warmup: 'none'},
    {name: 'Leg Extensions', type: 'MC', sets: 3, minReps: 15, maxReps: 20, startWeight: 20, warmup: 'none'},
    {name: 'Standing Calf Raise', type: 'MC', sets: 3, minReps: 15, maxReps: 20, startWeight: 20, warmup: 'none'},
    {name: 'Cable Crunches', type: 'Cable', sets: 3, minReps: 12, maxReps: 15, startWeight: 20, warmup: 'none'}
  ], core: 'DIRECT ABS: Cable Crunches × 3 sets × 12-15 reps\nSTABILITY: Side Plank × 3 sets × 30-60s each side', cardio: 'INCLINE WALK · 20 min · Incline 8% · Speed 5.0 km/h · Burns ~170 kcal\n(Legs are already taxed → keep cardio lighter today)'},
  'Push B': {day: 'Thursday', focus: '3D Shoulders · Upper Chest · Triceps', exercises: [
    {name: 'Overhead Dumbbell Press', type: 'DB', sets: 3, minReps: 8, maxReps: 10, startWeight: 17.5, warmup: 'light'},
    {name: 'Incline Barbell Bench', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 55, warmup: 'moderate'},
    {name: 'Flat Dumbbell Press', type: 'DB', sets: 3, minReps: 8, maxReps: 12, startWeight: 22.5, warmup: 'light'},
    {name: 'Cable Lateral Raise', type: 'Cable', sets: 3, minReps: 15, maxReps: 20, startWeight: 5, warmup: 'none'},
    {name: 'Cable Crossover (High to Low)', type: 'Cable', sets: 3, minReps: 12, maxReps: 15, startWeight: 10, warmup: 'none'},
    {name: 'Overhead Tricep Extension', type: 'DB', sets: 3, minReps: 12, maxReps: 15, startWeight: 15, warmup: 'none'},
    {name: 'Rope Pushdowns', type: 'Cable', sets: 3, minReps: 12, maxReps: 15, startWeight: 50, warmup: 'none'}
  ], core: 'UPPER ABS: Decline Sit-ups (Weighted) × 3 sets × 15 reps\nLOWER ABS: Hanging Leg Raises × 3 sets × 10-15 reps', cardio: 'INCLINE WALK · 30 min · Incline 10% · Speed 5.5 km/h · Burns ~280 kcal'},
  'Pull B': {day: 'Friday', focus: 'Back Thickness · Traps · Rear Delts · Arms', exercises: [
    {name: 'T-Bar Row', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 35, warmup: 'moderate'},
    {name: 'Single Arm DB Row', type: 'DB', sets: 3, minReps: 10, maxReps: 12, startWeight: 20, warmup: 'light'},
    {name: 'Straight Arm Pulldown', type: 'Cable', sets: 3, minReps: 10, maxReps: 12, startWeight: 40, warmup: 'none'},
    {name: 'Barbell Shrugs', type: 'BB', sets: 3, minReps: 12, maxReps: 15, startWeight: 60, warmup: 'light'},
    {name: 'Rear Delt Cable Fly', type: 'Cable', sets: 3, minReps: 15, maxReps: 20, startWeight: 10, warmup: 'none'},
    {name: 'Incline Dumbbell Curls', type: 'DB', sets: 3, minReps: 10, maxReps: 12, startWeight: 5, warmup: 'none'},
    {name: 'Hammer Curls', type: 'DB', sets: 3, minReps: 12, maxReps: 15, startWeight: 10, warmup: 'none'}
  ], grip: 'Wrist Curls + Reverse Curls (3 sets 15-20 reps, 7.5kg) + Landmine Rotations (3 sets 12-15 each side, 25kg)', cardio: 'INCLINE WALK · 30 min · Incline 12% · Speed 5.5 km/h · Burns ~300 kcal'},
  'Legs B': {day: 'Saturday', focus: 'Hamstrings · Glutes · Core', exercises: [
    {name: 'Romanian Deadlift', type: 'BB', sets: 3, minReps: 8, maxReps: 10, startWeight: 50, warmup: 'moderate'},
    {name: 'Leg Curl Machine', type: 'MC', sets: 3, minReps: 12, maxReps: 15, startWeight: 40, warmup: 'none'},
    {name: 'Bulgarian Split Squat', type: 'DB', sets: 3, minReps: 10, maxReps: 12, startWeight: 5, warmup: 'none'},
    {name: 'Hip Thrust', type: 'BB', sets: 3, minReps: 12, maxReps: 15, startWeight: 30, warmup: 'light'},
    {name: 'Seated Calf Raise', type: 'MC', sets: 3, minReps: 15, maxReps: 20, startWeight: 20, warmup: 'none'}
  ], core: 'ROTATIONAL: Machine Rotation (Cable) × 3 sets × 15 reps each side\nUPPER ABS: Decline Sit-ups (Weighted) × 3 sets × 15 reps', cardio: 'INCLINE WALK · 20 min · Incline 8% · Speed 5.0 km/h · Burns ~170 kcal\n(Legs are already taxed → keep cardio lighter today)'}
};

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WORKOUT_SCHEDULE = {0: 'Rest', 1: 'Push A', 2: 'Pull A', 3: 'Legs A', 4: 'Push B', 5: 'Pull B', 6: 'Legs B'};
const NUTRITION_TARGETS = {calories: 1900, protein: 171, carbs: 166, fat: 50};

const FOOD_DB = [
  {name: 'Whole Egg', unit: '1 egg', cal: 72, pro: 6, carb: 0.4, fat: 5, fiber: 0},
  {name: 'Egg White', unit: '1 white', cal: 17, pro: 3.6, carb: 0.2, fat: 0, fiber: 0},
  {name: 'Whey Protein', unit: '1 scoop (30g)', cal: 120, pro: 24, carb: 3, fat: 2, fiber: 0},
  {name: 'Chicken Breast (boiled)', unit: '100g', cal: 110, pro: 23, carb: 0, fat: 2.5, fiber: 0},
  {name: 'Brown Rice (cooked)', unit: '100g', cal: 130, pro: 2.7, carb: 27, fat: 1, fiber: 1.8},
  {name: 'Guava', unit: '100g', cal: 68, pro: 2.6, carb: 14, fat: 1, fiber: 5.4}
];

// ============================================================
// MAIN APP CLASS
// ============================================================

class TojiApp {
  constructor() {
    this.currentView = 'today';
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.workoutData = {};
    this.nutritionData = {};
    this.prData = {};
    this.currentWeek = 1;
    
    this.initAuthListener();
    this.setupDataSyncListener();
    this.registerSW();
  }

  initAuthListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.userEmail = user.email;
        this.showApp();
        this.loadFromLocalStorage();
        this.setupRealtimeSync();
      } else {
        this.showAuthScreen();
      }
    });
  }

  showApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hide');
    this.renderView();
  }

  showAuthScreen() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
  }

  loadFromLocalStorage() {
    this.workoutData = JSON.parse(localStorage.getItem('tojiWorkoutData') || '{}');
    this.nutritionData = JSON.parse(localStorage.getItem('tojiNutrition') || '{}');
    this.prData = JSON.parse(localStorage.getItem('tojiPRData') || '{}');
    this.currentWeek = parseInt(localStorage.getItem('tojiCurrentWeek') || '1');
  }

  setupRealtimeSync() {
    window.addEventListener('tojiDataSynced', () => {
      this.loadFromLocalStorage();
      this.renderView();
    });
  }

  setupDataSyncListener() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'SYNC_WORKOUTS') {
          this.loadFromLocalStorage();
          this.renderView();
        }
      });
    }
  }

  registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker failed:', err));
    }
  }

  setView(view) {
    this.currentView = view;
    this.renderView();
  }

  selectDate(dateStr) {
    this.selectedDate = dateStr;
    this.renderView();
  }

  renderView() {
    this.renderHeader();
    const content = document.getElementById('main-content');
    
    switch (this.currentView) {
      case 'today':
        this.renderTodayView(content);
        break;
      case 'week':
        this.renderWeekView(content);
        break;
      case 'progress':
        this.renderProgressView(content);
        break;
      case 'nutrition':
        this.renderNutritionView(content);
        break;
      case 'settings':
        this.renderSettingsView(content);
        break;
    }
  }

  renderHeader() {
    const today = new Date();
    const dayNum = today.getDay();
    const workoutName = WORKOUT_SCHEDULE[dayNum];
    const isRestDay = workoutName === 'Rest';

    document.getElementById('header').innerHTML = `
      <div class="header-top">
        <div>
          <div class="logo-title">TOJI <span>BODY</span></div>
          <div class="logo-sub">PROGRESSIVE OVERLOAD SYSTEM</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button id="theme-toggle" onclick="window.tojiApp.toggleTheme()"
            style="width:36px;height:36px;border-radius:50%;border:1px solid var(--border2);background:var(--bg3);font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;">☀️</button>
          <div class="status-badge" style="border-color:${isRestDay ? 'var(--green)' : 'var(--red)'}">
            ${isRestDay ? 'REST DAY' : 'TRAINING'}
          </div>
        </div>
      </div>
    `;
  }

  renderTodayView(el) {
    const date = new Date(this.selectedDate + 'T12:00:00');
    const dayNum = date.getDay();
    const workoutName = WORKOUT_SCHEDULE[dayNum];

    if (workoutName === 'Rest') {
      el.innerHTML = `<div class="section"><div class="card glow-green"><div style="text-align:center;padding:20px"><div style="font-family:var(--font-display);font-size:32px;color:var(--green)">REST DAY</div></div></div></div>`;
      return;
    }

    const workout = TOJI_WORKOUT_PLAN[workoutName];
    const dayData = this.workoutData[this.selectedDate] || {};

    let html = `<div class="section"><div class="card"><div style="font-family:var(--font-display);font-size:24px;color:var(--red);margin-bottom:14px">${workoutName}</div>`;

    workout.exercises.forEach((ex, idx) => {
      const exData = dayData[idx] || {sets: []};
      const completed = exData.sets.filter(s => s.done).length;

      html += `
        <div style="background:var(--bg2);border-radius:8px;padding:12px;margin-bottom:10px">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">${idx + 1}. ${ex.name}</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-bottom:10px">${ex.sets} × ${ex.minReps}-${ex.maxReps} @ ${ex.startWeight}kg</div>
          
          ${Array.from({length: ex.sets}).map((_, setIdx) => {
            const setData = exData.sets[setIdx] || {};
            return `
              <div style="display:grid;grid-template-columns:30px 1fr 1fr 40px;gap:6px;margin-bottom:6px">
                <div style="text-align:center;font-family:var(--font-mono);font-weight:700">${setIdx + 1}</div>
                <input type="number" placeholder="${ex.startWeight}" value="${setData.weight || ''}"
                       onchange="window.tojiApp.updateSet(${idx},${setIdx},'weight',this.value)"
                       style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:6px;font-family:var(--font-mono)">
                <input type="number" placeholder="${ex.minReps}" value="${setData.reps || ''}"
                       onchange="window.tojiApp.updateSet(${idx},${setIdx},'reps',this.value)"
                       style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:6px;font-family:var(--font-mono)">
                <button onclick="window.tojiApp.toggleSetDone(${idx},${setIdx})"
                        style="background:${setData.done ? 'var(--red)' : 'var(--bg3)'};border:1px solid var(--border);border-radius:6px;cursor:pointer">
                  ${setData.done ? '✓' : ''}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    });

    html += `</div></div>`;
    el.innerHTML = html;
  }

  renderWeekView(el) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    let weekSessions = 0, weekSets = 0;
    let html = '<div class="section"><div class="card">';

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayNum = date.getDay();
      const stats = this.getDayCompletionStats(dateStr);

      const isToday = dateStr === today.toISOString().split('T')[0];
      const bg = isToday ? 'var(--red)' : 'var(--bg2)';

      html += `
        <div style="background:${bg};border-radius:8px;padding:12px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between">
            <div><strong>${date.getDate()}</strong> ${WEEK_DAYS[dayNum]}</div>
            <div>${stats.percentage}% · ${stats.completed}/${stats.total}</div>
          </div>
        </div>
      `;
    }

    html += '</div></div>';
    el.innerHTML = html;
  }

  renderProgressView(el) {
    const today = new Date();
    let totalSessions = 0, totalSets = 0;

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    for (let c = new Date(startOfMonth); c <= today; c.setDate(c.getDate() + 1)) {
      const ds = c.toISOString().split('T')[0];
      const sets = Object.values(this.workoutData[ds] || {}).reduce((s, ex) => s + (ex.sets || []).filter(x => x.done).length, 0);
      if (sets > 0) { totalSessions++; totalSets += sets; }
    }

    el.innerHTML = `
      <div class="section">
        <div class="card glow-red">
          <div style="font-family:var(--font-display);font-size:28px;color:var(--red);margin-bottom:14px">STATS THIS MONTH</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div style="background:var(--bg);border-radius:8px;padding:14px;text-align:center">
              <div style="font-family:var(--font-display);font-size:32px;color:var(--red)">${totalSessions}</div>
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-top:4px">SESSIONS</div>
            </div>
            <div style="background:var(--bg);border-radius:8px;padding:14px;text-align:center">
              <div style="font-family:var(--font-display);font-size:32px;color:#44aaff">${totalSets}</div>
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-top:4px">SETS</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderNutritionView(el) {
    const d = this.getNutritionToday();

    el.innerHTML = `
      <div class="section">
        <div class="card">
          <div style="font-family:var(--font-display);font-size:20px;color:var(--text);margin-bottom:12px">TODAY'S NUTRITION</div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
            <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center">
              <div style="font-family:var(--font-display);font-size:24px;color:var(--red)">${d.calories}</div>
              <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">kcal</div>
            </div>
            <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center">
              <div style="font-family:var(--font-display);font-size:24px;color:#44aaff">${d.protein}g</div>
              <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">protein</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderSettingsView(el) {
    el.innerHTML = `
      <div class="section">
        <div class="card">
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-bottom:10px">ACCOUNT</div>
          <div style="font-family:var(--font-mono);font-size:12px;color:var(--text3);margin-bottom:12px">Email: ${this.userEmail || 'Anonymous'}</div>
          <button onclick="window.tojiApp.logout()" 
            style="width:100%;padding:10px;background:#ff224422;border:1px solid #ff224466;border-radius:8px;color:var(--red);cursor:pointer;font-family:var(--font-mono)">
            Sign Out
          </button>
        </div>
      </div>
    `;
  }

  getNutritionToday() {
    return this.nutritionData[this.selectedDate] || {calories: 0, protein: 0, carbs: 0, fat: 0};
  }

  getDayCompletionStats(dateStr) {
    const day = new Date(dateStr + 'T12:00:00').getDay();
    const workoutName = WORKOUT_SCHEDULE[day];
    const dayData = this.workoutData[dateStr] || {};

    if (workoutName === 'Rest') {
      return {workout: workoutName, total: 0, completed: 0, percentage: 0};
    }

    const total = this.getTotalSetsForWorkout(workoutName);
    const completed = Object.values(dayData).reduce((sum, ex) => sum + (ex.sets || []).filter(s => s.done).length, 0);
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {workout: workoutName, total, completed, percentage};
  }

  getTotalSetsForWorkout(workoutName) {
    const workout = TOJI_WORKOUT_PLAN[workoutName];
    return workout ? workout.exercises.reduce((sum, ex) => sum + ex.sets, 0) : 0;
  }

  updateSet(exIdx, setIdx, field, value) {
    if (!this.workoutData[this.selectedDate])
      this.workoutData[this.selectedDate] = {};
    if (!this.workoutData[this.selectedDate][exIdx])
      this.workoutData[this.selectedDate][exIdx] = {sets: []};
    if (!this.workoutData[this.selectedDate][exIdx].sets[setIdx])
      this.workoutData[this.selectedDate][exIdx].sets[setIdx] = {};

    this.workoutData[this.selectedDate][exIdx].sets[setIdx][field] = parseFloat(value) || 0;
    this.saveWorkoutData();
  }

  toggleSetDone(exIdx, setIdx) {
    if (!this.workoutData[this.selectedDate])
      this.workoutData[this.selectedDate] = {};
    if (!this.workoutData[this.selectedDate][exIdx])
      this.workoutData[this.selectedDate][exIdx] = {sets: []};
    if (!this.workoutData[this.selectedDate][exIdx].sets[setIdx])
      this.workoutData[this.selectedDate][exIdx].sets[setIdx] = {};

    const set = this.workoutData[this.selectedDate][exIdx].sets[setIdx];
    set.done = !set.done;
    this.saveWorkoutData();
    this.renderView();
  }

  saveWorkoutData() {
    localStorage.setItem('tojiWorkoutData', JSON.stringify(this.workoutData));
    if (typeof tojiFirebase !== 'undefined' && this.userId) {
      tojiFirebase.saveWorkoutSession(this.selectedDate, this.workoutData[this.selectedDate]);
    }
  }

  logout() {
    firebase.auth().signOut().then(() => {
      localStorage.clear();
      this.showAuthScreen();
    }).catch(err => alert('Logout failed: ' + err.message));
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tojiTheme', next);
  }
}

// Auth functions
function toggleAuthMode() {
  document.getElementById('login-form').classList.toggle('hidden');
  document.getElementById('signup-form').classList.toggle('hidden');
}

function showAuthError(message) {
  const errorEl = document.getElementById('auth-error');
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
  setTimeout(() => errorEl.classList.add('hidden'), 5000);
}

async function handleLogin() {
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  if (!email || !password) { showAuthError('Please enter email and password'); return; }
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    showAuthError(error.message);
  }
}

async function handleSignup() {
  const email = document.getElementById('signup-email-input').value;
  const password = document.getElementById('signup-password-input').value;
  const confirm = document.getElementById('signup-password-confirm').value;
  if (!email || !password || !confirm) { showAuthError('Please fill all fields'); return; }
  if (password !== confirm) { showAuthError('Passwords do not match'); return; }
  if (password.length < 6) { showAuthError('Password must be at least 6 characters'); return; }
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    showAuthError(error.message);
  }
}

async function handleAnonymousAuth() {
  try {
    await firebase.auth().signInAnonymously();
  } catch (error) {
    showAuthError(error.message);
  }
}

// Init
function initialize() {
  if (typeof firebase === 'undefined') { setTimeout(initialize, 100); return; }
  window.tojiApp = new TojiApp();
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.classList.add('hide');
  }, 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

window.setView = (view) => window.tojiApp?.setView(view);
window.selectDate = (date) => window.tojiApp?.selectDate(date);
window.toggleAuthMode = toggleAuthMode;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleAnonymousAuth = handleAnonymousAuth;
