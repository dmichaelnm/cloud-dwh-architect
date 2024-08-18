import firebase from 'firebase/compat';
import FirebaseError = firebase.FirebaseError;
import { Ref } from 'vue';

/**
 * Processes a Firebase error and sets corresponding error messages for email and password.
 *
 * @param {function} t - A function that translates a key into a localized string.
 * @param {unknown} error - The Firebase error object.
 * @param {Ref<string|null>} emailError - A reactive reference to the error message for email.
 * @param {Ref<string|null>} passwordError - A reactive reference to the error message for password.
 *
 * @return {boolean} - Returns `true` if the Firebase error is processed and error messages are set,
 *                    otherwise returns `false`.
 */
export function processFireabseError(
  t: (key: string) => string,
  error: unknown,
  emailError: Ref<string | null>,
  passwordError: Ref<string | null> | null
): boolean {
  // Get the firebase error code
  const errorCode = (error as FirebaseError).code;
  if (errorCode === 'auth/invalid-email') {
    // Invalid email address
    emailError.value = t('authentication.error.invalidEmail');
    return true;
  }
  if (errorCode === 'auth/email-already-in-use') {
    // Email address is already in use
    emailError.value = t('authentication.error.emailAlreadyInUse');
    return true;
  }
  if (passwordError != null) {
    // A password error reference is provided
    if (errorCode === 'auth/weak-password') {
      // Password is too weak
      passwordError.value = t('authentication.error.weakPassword');
      return true;
    }
  }
  // Error was not processed
  return false;
}
