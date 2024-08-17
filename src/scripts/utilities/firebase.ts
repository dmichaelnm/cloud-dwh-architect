import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'src/scripts/config/firebase';

// Initialize the Firebase application
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication Service
export const firebaseAuth = getAuth(firebaseApp);

// Initialize Firestore Database
export const firebaseStore = getFirestore(firebaseApp);
