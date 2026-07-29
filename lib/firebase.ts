import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemoKeyForLogisticsPortfolio2026",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "safthar-logistics.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "safthar-logistics",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "safthar-logistics.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "998877665544",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:998877665544:web:abc123def456"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export interface ContactMessagePayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

// Helper function to send contact messages (Firestore + Local fallback)
export async function saveContactMessage(payload: ContactMessagePayload) {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      const docRef = await addDoc(collection(db, 'messages'), {
        ...payload,
        createdAt: serverTimestamp(),
        read: false,
        status: 'new'
      });
      return { success: true, id: docRef.id };
    }
  } catch (err) {
    console.warn('Firebase submission notice, using fallback storage:', err);
  }

  // Fallback storage in browser localStorage
  if (typeof window !== 'undefined') {
    const existing = JSON.parse(localStorage.getItem('safthar_messages') || '[]');
    const newMessage = {
      id: 'msg-' + Date.now(),
      ...payload,
      date: new Date().toISOString().split('T')[0],
      read: false,
      status: 'new'
    };
    localStorage.setItem('safthar_messages', JSON.stringify([newMessage, ...existing]));
  }
  return { success: true, id: 'local-' + Date.now() };
}

export async function trackDownload(type: string = 'Resume') {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      await addDoc(collection(db, 'downloads'), {
        type,
        timestamp: serverTimestamp(),
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown'
      });
    }
  } catch {
    // Ignore error in fallback mode
  }
  if (typeof window !== 'undefined') {
    const current = parseInt(localStorage.getItem('safthar_download_count') || '142', 10);
    localStorage.setItem('safthar_download_count', (current + 1).toString());
  }
}
