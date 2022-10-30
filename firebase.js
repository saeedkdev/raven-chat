import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFcQmz9uq9xaUq919tSc9oL6Nd0nHWBnw",
  authDomain: "raven-c004b.firebaseapp.com",
  projectId: "raven-c004b",
  storageBucket: "raven-c004b.appspot.com",
  messagingSenderId: "703863350490",
  appId: "1:703863350490:web:19ce27fb68f54ab97231e3"
};

// Initialize the app
// if app is not initialized, initialize it

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
