# TOJI BODY - Web App Deployment Guide

Your progressive overload tracker is now ready for production deployment. Here's how to get it running.

## Quick Start (5 minutes)

### Option 1: Firebase Hosting (Recommended)

**Step 1: Set up Firebase Project**

```bash
# Create new Firebase project at firebase.google.com
# 1. Go to Firebase Console
# 2. Create new project "toji-body"
# 3. Enable Google Analytics (optional)
# 4. Wait for project to initialize
```

**Step 2: Get Firebase Config**

In Firebase Console → Project Settings → scroll to "Your apps" → create Web app:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

Paste this into `firebase-config.js`

**Step 3: Setup Authentication**

In Firebase Console → Authentication → Sign-in method:
- ✅ Enable "Email/Password"
- ✅ Enable "Anonymous" (optional, for demo access)

**Step 4: Setup Firestore Database**

In Firebase Console → Firestore Database:
- ✅ Create database in production mode
- ✅ Use default location (us-central1)

**Step 5: Set Security Rules**

Firestore Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow create: if request.auth.uid == userId;
      allow read, write, delete: if request.auth.uid == userId;
      
      match /{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    // Allow anonymous access to read (if using anonymous auth)
    match /public/{document=**} {
      allow read: if true;
    }
  }
}
```

**Step 6: Deploy to Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project in your directory
firebase init hosting

# When prompted:
# - Select your Firebase project
# - Set public directory to current directory
# - Set index.html as your index file
# - Don't rewrite all URLs to index.html

# Deploy
firebase deploy
```

Your app is now live at: `https://YOUR_PROJECT.web.app`

### Option 2: Deploy to Vercel (Recommended for Custom Domain)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
vercel
```

**Step 3: Configure Environment Variables**

In Vercel Dashboard → Settings → Environment Variables, add:
```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
# ... etc
```

### Option 3: Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

## Development Setup

```bash
# Start local development server
npx http-server -c-1 -o

# Or with Python
python -m http.server 8000

# Visit http://localhost:8000
```

## File Structure

```
toji-body/
├── index.html           # Main HTML (all UI)
├── app.js              # App logic (keep this local only)
├── firebase-config.js  # Firebase config (⚠️ Don't commit to GitHub)
├── sw.js               # Service Worker (offline support)
├── manifest.json       # PWA manifest
├── DEPLOYMENT.md       # This file
└── .gitignore          # Ignore firebase-config.js
```

## Environment Setup

Create `.gitignore`:
```
firebase-config.js
node_modules/
.DS_Store
*.log
```

**Never commit `firebase-config.js` to GitHub!** Use environment variables in production:

For Vercel/Netlify, set env vars in dashboard, then update `firebase-config.js`:
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Security Checklist

- ✅ Firebase rules restrict data to authenticated users
- ✅ API keys are in environment variables (not in code)
- ✅ Service Worker caches only essential files
- ✅ HTTPS enforced (automatic with Firebase/Vercel/Netlify)
- ✅ No sensitive data stored in localStorage

## Offline Support

The service worker (sw.js) automatically:
- ✅ Caches critical assets on first load
- ✅ Works offline with cached data
- ✅ Syncs automatically when back online
- ✅ Shows sync status to user

## Backup & Export

Users can export their data from Settings → Data Management:
- Exports all workouts, nutrition, PRs as JSON
- Can be re-imported if switching devices

## Performance Tips

1. **Lazy Load Firebase**
   - Only load when user logs in
   - Remove defer from Firebase scripts if needed

2. **Image Optimization**
   - Use WebP for icons
   - Optimize screenshots in manifest

3. **Database Indexing**
   - Firestore auto-creates indexes for queries
   - Monitor in Firebase Console → Indexes

## Monitoring

Set up Firebase Alerts:
- Firebase Console → Monitoring
- Get alerts for high CPU, storage, etc.

Set up Analytics:
- Firebase Console → Analytics
- Track user sessions, workouts logged, etc.

## Common Issues

**"Firebase is not defined"**
- Make sure Firebase script tags are loaded before firebase-config.js

**Offline sync not working**
- Check Service Worker in DevTools → Application → Service Workers
- Make sure sw.js is registered

**Firestore queries timing out**
- Check Firestore security rules
- Ensure indexes are created for complex queries

## Support

- Firebase Docs: https://firebase.google.com/docs
- Firestore Guide: https://firebase.google.com/docs/firestore
- Firebase Hosting: https://firebase.google.com/docs/hosting

## Next Steps

1. ✅ Deploy to Firebase Hosting / Vercel
2. ✅ Share link with friends: `https://yourapp.com`
3. ✅ Log your first workout
4. ✅ Check sync in DevTools → Network (should see Firestore requests)
5. ✅ Test offline by going airplane mode
6. ✅ Enable PWA install (iOS: Share → Add to Home Screen, Android: Install app prompt)
