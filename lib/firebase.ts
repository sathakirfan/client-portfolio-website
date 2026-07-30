import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBex3s1bN_3rIpM4iomd1oXUB1NqjLJAG8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "safthar-portfolio.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "safthar-portfolio",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "safthar-portfolio.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "562351587944",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:562351587944:web:3c5da1f5f3e8ac8a8831dd"
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

// Save message to Firestore and fallback to localStorage
export async function saveContactMessage(payload: ContactMessagePayload) {
  const currentDate = new Date().toISOString().split('T')[0];
  let firestoreId = null;

  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...payload,
      date: currentDate,
      createdAt: serverTimestamp(),
      read: false,
      status: 'new'
    });
    firestoreId = docRef.id;
  } catch (err) {
    console.warn('Firestore submission notice, using fallback storage:', err);
  }

  // Backup to localStorage for local admin access
  if (typeof window !== 'undefined') {
    const existing = JSON.parse(localStorage.getItem('safthar_messages') || '[]');
    const newMessage = {
      id: firestoreId || ('msg-' + Date.now()),
      ...payload,
      date: currentDate,
      read: false,
      status: 'new'
    };
    localStorage.setItem('safthar_messages', JSON.stringify([newMessage, ...existing]));
  }

  return { success: true, id: firestoreId || ('msg-' + Date.now()) };
}

// Fetch messages from Firestore & localStorage for Admin Dashboard
export async function fetchContactMessages() {
  const messages: any[] = [];
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      messages.push({
        id: docSnap.id,
        name: data.name || 'Recruiter Lead',
        email: data.email || 'N/A',
        company: data.company || 'Direct Recruiter',
        phone: data.phone || 'N/A',
        subject: data.subject || 'Warehouse Lead Inquiry',
        message: data.message || '',
        date: data.date || new Date().toISOString().split('T')[0],
        read: data.read || false,
        status: data.status || 'new'
      });
    });
  } catch (err) {
    console.warn('Unable to query Firestore messages, loading local backup:', err);
  }

  // Load local backup messages
  if (typeof window !== 'undefined') {
    const localMsgs = JSON.parse(localStorage.getItem('safthar_messages') || '[]');
    localMsgs.forEach((lm: any) => {
      if (!messages.some(m => m.id === lm.id)) {
        messages.push(lm);
      }
    });
  }

  return messages;
}

// Update status of a message
export async function updateMessageStatus(id: string, status: 'new' | 'reviewed' | 'contacted') {
  try {
    const docRef = doc(db, 'messages', id);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.warn('Firestore update notice:', err);
  }

  if (typeof window !== 'undefined') {
    const localMsgs = JSON.parse(localStorage.getItem('safthar_messages') || '[]');
    const updated = localMsgs.map((m: any) => m.id === id ? { ...m, status } : m);
    localStorage.setItem('safthar_messages', JSON.stringify(updated));
  }
}

// Delete message from Firestore & localStorage
export async function deleteContactMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch (err) {
    console.warn('Firestore delete notice:', err);
  }

  if (typeof window !== 'undefined') {
    const localMsgs = JSON.parse(localStorage.getItem('safthar_messages') || '[]');
    const updated = localMsgs.filter((m: any) => m.id !== id);
    localStorage.setItem('safthar_messages', JSON.stringify(updated));
  }
}

export async function trackDownload(type: string = 'Resume') {
  try {
    await addDoc(collection(db, 'downloads'), {
      type,
      timestamp: serverTimestamp(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown'
    });
  } catch {
    // Ignore error in fallback mode
  }
  if (typeof window !== 'undefined') {
    const current = parseInt(localStorage.getItem('safthar_download_count') || '142', 10);
    localStorage.setItem('safthar_download_count', (current + 1).toString());
  }
}
