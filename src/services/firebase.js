import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration and service
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization failed. Using fallback mode.', error.message);
}

export const submitContactForm = async (formData) => {
  try {
    if (!db) {
      if (typeof window !== 'undefined' && window.localStorage) {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        console.log('Form submitted to localStorage (Firebase not configured)');
      }
      return { success: true, message: 'Form submitted successfully (stored locally)' };
    }

    const docRef = await addDoc(collection(db, 'contacts'), {
      ...formData,
      timestamp: new Date().toISOString()
    });
    console.log('Document written with ID: ', docRef.id);
    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    console.error('Error submitting form: ', error);
    return { success: false, message: 'Error submitting form. Please try again.' };
  }
};

export { db };
