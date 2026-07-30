import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TEMPLEFIT FIREBASE CONFIGURATION
// Sustituye estos valores con los de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAeqrlTefumC1rFffj0A5qYN_rgFDSX72U",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "templefit-74297.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "templefit-74297",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "templefit-74297.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "44815761938",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:44815761938:web:e3ade6f87ea1e3b85a0ecb"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
