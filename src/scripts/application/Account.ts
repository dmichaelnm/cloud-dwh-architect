import * as fa from 'firebase/auth';
import * as fs from 'src/scripts/application/FSDocument';
import { firebaseAuth } from 'src/scripts/utilities/firebase';
import { ELanguage } from 'src/scripts/options/language';
import { createDocument } from 'src/scripts/application/FSDocument';

/**
 * The structure of a data object of an Account document.
 */
export interface IAccountData extends fs.IFSDocumentData {
  /** The profile properties of the account */
  profile: {
    /** The first name */
    firstName: string;
    /** The last name */
    lastName: string;
    /** The email address */
    email: string;
  };
  /** The preferences of the account */
  preferences: {
    /** The preferred langauge */
    language: string;
    /** The dark mode flag */
    dark: boolean;
  };
  /** The state properties of the account */
  state: {
    /** The lock flag of the account */
    locked: boolean;
  };
}

/**
 * This class represents an Account document in the Firestore database.
 */
export class Account extends fs.FSDocument<IAccountData> {}

/**
 * Loads an Account object from the database.
 *
 * @param {string} id - The ID of the account to load.
 * @return {Promise<Account | undefined>} - A promise that resolves to an Account object if found, or undefined if not found.
 */
export async function load(id: string): Promise<Account | undefined> {
  return (await fs.load('account', id)) as Account;
}

/**
 * Registers an event listener for changes on the authentication state of the current Firebase user.
 * Calls the provided handler with the account if it exists and is authorized,
 * or null if the user is not authenticated or the account is locked.
 *
 * @param {Function} handler - The callback function to handle the account state change.
 *                            It accepts a single parameter of type Account or null.
 * @return {void} This method returns nothing.
 */
export function onAccountStateChange(
  handler: (account: Account | null) => void
): void {
  // Register the event listener for changes on the authentication state of the current Firebase user
  fa.onAuthStateChanged(firebaseAuth, async (user) => {
    if (user === null) {
      // If the user is null then we don't have an authenticated Firebase user and
      // call the handler with null as account
      handler(null);
    } else {
      // Load the account document from the Firestore database
      const account = await load(user.uid);
      if (account) {
        // Account document was loaded
        if (account.data.state.locked) {
          // Account is locked, call the handler with null as account
          handler(null);
        } else {
          // Account is authorized
          handler(account);
        }
      } else {
        // No Firestore document found, this is unexpected
        console.warn(
          `No Firestore document found for Firebase user '${user.uid}'`
        );
        // Call the handler with null as account
        handler(null);
      }
    }
  });
}

/**
 * Creates a new account.
 *
 * @param {string} firstName - The first name of the account holder.
 * @param {string} lastName - The last name of the account holder.
 * @param {string} email - The email address for the account.
 * @param {string} password - The password for the account.
 * @param {boolean} dark - Indicates if the account prefers a dark theme.
 * @param {ELanguage} language - The preferred language for the account.
 * @return {Promise<Account>} - A Promise that resolves to the newly created Account object.
 */
export async function createAccount(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dark: boolean,
  language: ELanguage
): Promise<Account> {
  // Create the new account in Firebase
  const credential = await fa.createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  // Update the display name
  await fa.updateProfile(credential.user, {
    displayName: `${firstName} ${lastName}`,
  });
  // Create the data object for the new account
  const data: IAccountData = {
    common: { name: `${firstName} ${lastName}`, description: null },
    profile: { firstName: firstName, lastName: lastName, email: email },
    preferences: { dark: dark, language: language },
    state: { locked: true },
  };
  // Create the account document
  return await createDocument<IAccountData, Account>(
    'account',
    data,
    credential.user.uid
  );
}
