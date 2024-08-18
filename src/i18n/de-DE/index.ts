export default {
  // Application Messages
  application: {
    // Application Title
    title: 'Cloud Dwh Architect',
    // Copyright Notice
    copyright: '&copy; Copyright 2024 Dirk Michael',
    // Version
    version: 'Version {major}.{minor}.{patch} (Build: {build})',
  },

  // Common Buttons
  button: {
    // Back
    back: 'Zurück',
    // Close
    close: 'Schließen',
  },

  // Language Labels
  language: {
    // English (US)
    enUS: 'Englisch (US)',
    // German (DE)
    deDE: 'Deutsch (DE)',
  },

  // Social Media Links
  socialMedia: {
    // Send Email
    email: 'Email senden',
    // Discord
    discord: 'Discord',
    // Twitter / X
    twitter: 'Twitter / X',
    // Instagram
    instagram: 'Instagram',
    // Linked In
    linkedIn: 'Linked In',
    // Twitch
    twitch: 'Twitch',
  },

  // Common Dialog Messages
  dialog: {
    // Unexpected Error Dialog
    unexpectedError: {
      // Title
      title: 'Unerwarteter Fehler',
      // Message
      message:
        'Es ist ein unerwarteter Fehler aufgetreten. Dies hätte nicht passieren dürfen. Bitte kontaktieren Sie ' +
        'Ihren Administrator und übergeben Ihn die detailierte Fehlermeldung.',
    },
  },

  // Common Error Messages
  error: {
    // Input field must not be empty
    inputEmpty: 'Das Eingabefeld darf nicht leer sein.',
  },

  // Authentication Messages
  authentication: {
    // Authentication Labels
    label: {
      // Email Address
      email: 'Email-Adresse',
      // First Name
      firstName: 'Vorname',
      // Last Name
      lastName: 'Nachname',
      // Password
      password: 'Kennwort',
      // Password Repeat
      passwordRepeat: 'Kennwort wiederholen',
    },
    // Authentication Error Messages
    error: {
      // Password and repeated password doesn't match
      passwordRepeatInvalid: 'Beide Kennwörter müssen exakt gleich sein.',
      // Invalid email address
      invalidEmail: 'Die Email-Adresse ist ungültig.',
      // Password too weak
      weakPassword: 'Das Kennwort muss mindestens 6 Zeichen lang sein.',
      // Email is already in use
      emailAlreadyInUse: 'Es existiert bereits ein Konto mit dieser Email-Adresse.'
    },
    // Login Page Messages
    login: {
      // Login Message
      message:
        'Bitte geben Sie in die untenstehen Eingabefelder Ihre Anmeldeinformationen ein. Achten Sie bei der ' +
        'Eingabe des Kennworts auch auf die Groß- und Kleinschreibung. Sollten Sie noch kein Konto besitzen, können ' +
        'Sie sich über den Link "Konto registrieren" ein neues erstellen. Dieses muss jedoch erst von einem ' +
        'Administrator freigeschaltet werden, bevor Sie sich anmelden können.',
      // Login Button
      button: 'Anmelden',
    },
    // Register Account Messages
    register: {
      // Register Account Message
      message:
        'Hier können Sie ein neues Konto registrieren, indem Sie die untenstehen Felder komplett ausfüllen. ' +
        'Dabei darf die Email-Adresse noch nicht für ein anderes Konto verwendet worden sein. Nach der erfolgreichen ' +
        'Erstellung des Kontos muss dieses noch von einem Administrator freigeschaltet werden, bevor Sie es ' +
        'verwenden können.',
      // Register Account Button
      button: 'Konto erstellen',
      // Success Dialog Messages
      dialog: {
        // Title
        title: 'Konto erfolgreich erstellt',
        // Message
        message: 'Ihr Konto wurde erfolgreich erstellt. Bitte kontaktieren Sie einen Administrator, damit dieser Ihr ' +
          'neues Konto freischalten kann. Erst danach ist eine Anmeldung an der Applikation möglich.'
      }
    },
    // Reset Password Messages
    reset: {
      // Reset Password Button
      button: 'Kennwort zurücksetzen',
    },
  },
};
