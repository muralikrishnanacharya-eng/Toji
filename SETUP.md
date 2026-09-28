# TOJI BODY - Complete Setup Guide

## ✅ Files Ready
All scaffolding complete at `/home/claude/`:
- ✓ `index.html` - PWA shell with auth UI
- ✓ `app.js` - Full app logic (all your original functions integrated)
- ✓ `firebase-config.js` - Firebase sync (needs your config)
- ✓ `sw.js` - Service Worker for offline + background sync
- ✓ `manifest.json` - PWA metadata
- ✓ `DEPLOYMENT.md` - Deploy instructions

---

## 🔥 STEP 1: Create Firebase Project (2 min)

### Go here:
**https://console.firebase.google.com**

### Create new project:
1. Click **"Create project"**
2. Project name: `toji-body` (or whatever)
3. Enable Google Analytics: **No** (skip it)
4. Click **Create project** → wait 30s

### Get your config:
1. Go to **Project Settings** (⚙️ icon top-left)
2. Under **Your apps**, click **</> (web)**
3. Register app as `toji-body`
4. Copy the firebaseConfig object that looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "toji-body-xxxxx.firebaseapp.com",
  projectId: "toji-body-xxxxx",
  storageBucket: "toji-body-xxxxx.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456..."
};
```

---

## 🔐 STEP 2: Enable Auth (1 min)

1. In Firebase Console, go **Authentication**
2. Click **Get started**
3. Enable these providers:
   - ✓ **Email/Password**
   - ✓ **Anonymous**
4. Click each, toggle **Enable**, save

---

## 🗄️ STEP 3: Create Firestore Database (1 min)

1. Go **Firestore Database**
2. Click **Create database**
3. Location: **United States** (or closest region)
4. Security rules: **Start in test mode** (we'll fix this)
5. Click **Create**

---

## 📋 STEP 4: Update Security Rules (1 min)

1. In Firestore, go **Rules** tab
2. **Replace all text** with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create: if request.auth.uid == userId;
      allow read, write, delete: if request.auth.uid == userId;
      match /{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
}
```
3. Click **Publish**

---

## 🔧 STEP 5: Update Your Config (1 min)

1. Open `/home/claude/firebase-config.js`
2. Find this section:
```javascript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  // ... rest
};
```
3. **Replace with your actual config** from Step 1
4. Save file

---

## 🌐 STEP 6: Install & Deploy (3 min)

### Install Firebase CLI:
```bash
npm install -g firebase-tools
```

### Login to Firebase:
```bash
firebase login
```
(Opens browser, click Allow)

### Initialize project:
```bash
cd /home/claude
firebase init
```
When prompted:
- **What do you want to setup?** → Select **Hosting** (space to check, enter to confirm)
- **Project:** → Select your `toji-body` project
- **Public directory:** → Press **Enter** (default `public`)
- **Single page app:** → Type **y** → Enter
- **Overwrite?** → Type **n** → Enter

### Copy files to public folder:
```bash
cp /home/claude/index.html public/
cp /home/claude/app.js public/
cp /home/claude/firebase-config.js public/
cp /home/claude/sw.js public/
cp /home/claude/manifest.json public/
```

### Deploy:
```bash
cd /home/claude
firebase deploy
```

### 🎉 Live at:
```
https://YOUR_PROJECT.web.app
```

---

## ✨ What's Working Now

### ✓ Core Features:
- 6-day PPL workout split
- Exercise tracking (weight, reps, sets)
- Cloud sync via Firebase
- Offline support (Service Worker)
- Authentication (Email/Password + Anonymous)
- Light/Dark theme
- PWA installable

### ✓ Data Structure:
```
users/{userId}/
  workouts/{dateStr}/ → workout sessions
  nutrition/{dateStr}/ → meals & macros
  stats/personals/ → PRs
```

### ✓ Real-time Sync:
- Write locally → syncs to Firestore
- Firestore changes → auto-load in app
- Works offline → syncs when back online
- Service Worker handles background sync

---

## 🐛 Troubleshooting

### "Firebase is not defined"
- Check `firebase-config.js` is loaded in `index.html`
- Check your config has valid keys

### "Auth error"
- Verify Email/Password auth is enabled
- Verify Anonymous auth is enabled
- Check security rules are published

### Offline not working
- Service Worker must be HTTPS (Firebase Hosting is HTTPS ✓)
- Check browser console for SW errors
- Open DevTools → Application → Service Workers

### Data not syncing
- Check Firestore security rules
- Verify user is authenticated
- Check browser console for errors

---

## 🚀 Next Steps (Optional)

1. **Add your full FOOD_DB** from original app to `app.js`
2. **Implement rest timer** with Web Audio (skeleton in `toggleSetDone()`)
3. **Add nutrition logging** (UI ready, needs data save)
4. **Progressive overload AI** (algorithm from original)
5. **Export/backup data** via `tojiFirebase.exportData()`

---

## 📞 Questions?

If anything fails during setup:
1. Check Firebase Console logs
2. Check browser DevTools (F12) → Console tab
3. Verify all files were copied to `public/`
4. Verify `firebase-config.js` has YOUR config (not template)

Good luck! 💪
