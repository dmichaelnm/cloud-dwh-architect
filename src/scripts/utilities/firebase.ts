import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'src/scripts/config/firebase';

// Initialize the Firebase application
const firebaseApp = initializeApp(firebaseConfig);

/** Firebase Authentication Service */
export const firebaseAuth = getAuth(firebaseApp);

/** Firestore Database */
export const firebaseStore = getFirestore(firebaseApp);

/**
 * Retrieves the current account name.
 *
 * This method gets the current authorized user from Firebase and returns their name.
 *
 * @return {string} The name of the current user.
 */
export function getCurrentAccountName(): string {
  // Get the current authorized user from Firebase
  const user = firebaseAuth.currentUser;
  // Return the name of the user
  return user?.displayName as string;
}

/**
 * Sends a reset password email to the specified email address.
 *
 * @param {string} email - The email address to send the reset password email to.
 * @return {Promise<void>} - A promise that resolves when the reset password email is successfully sent.
 */
export async function sendResetPasswordEmail(email: string): Promise<void> {
  await sendPasswordResetEmail(firebaseAuth, email);
}
