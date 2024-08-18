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
    back: 'Back',
    // Close
    close: 'Close',
  },

  // Social Media Links
  socialMedia: {
    // Send Email
    email: 'Send Email',
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

  // Language Labels
  language: {
    // English (US)
    enUS: 'English (US)',
    // German (DE)
    deDE: 'German (DE)',
  },

  // Common Dialog Messages
  dialog: {
    // Unexpected Error Dialog
    unexpectedError: {
      // Title
      title: 'Unexpected Error',
      // Message
      message:
        'An unexpected error occurred. This should not have happened. Please contact your administrator and ' +
        'provide him with the detailed error message.',
    },
  },

  // Common Error Messages
  error: {
    // Input field must not be empty
    inputEmpty: 'The input field must not be empty.',
  },

  // Authentication Messages
  authentication: {
    // Authentication Labels
    label: {
      // Email Address
      email: 'Email Address',
      // First Name
      firstName: 'First Name',
      // Last Name
      lastName: 'Last Name',
      // Password
      password: 'Password',
      // Password Repeat
      passwordRepeat: 'Repeat Password',
    },
    // Authentication Error Messages
    error: {
      // Password and repeated password doesn't match
      passwordRepeatInvalid: 'Both passwords must be exactly the same.',
      // Invalid email address
      invalidEmail: 'Die Email-Adresse ist ungültig.',
      // Password too weak
      weakPassword: 'The password must have at least 6 characters.',
      // Email is already in use
      emailAlreadyInUse: 'An account with this email address already exists.',
      // Invalid credential
      invalidCredential: 'The login credentials are incorrect.',
      // Too many failed attempts
      tooManyFailedAttempts: 'Too many failed login attempts.',
      // Account is locked
      accountLocked: 'The account is locked.'
    },
    // Login Page Messages
    login: {
      // Login Message
      message:
        'Please enter your login details in the input fields below. The password is case sensitive. If you do ' +
        'not yet have an account, you can create a new one using the "Register account" link. However, this must ' +
        'first be activated by an administrator before you can log in.',
      // Login Button
      button: 'Log In',
    },
    // Register Account Messages
    register: {
      // Register Account Message
      message:
        'You can register a new account here by completely filling out the fields below. The email address ' +
        'must not have been used for another account. After the account has been successfully created, it must be ' +
        'activated by an administrator before you can use it.',
      // Register Account Button
      button: 'Register Account',
      // Success Dialog Messages
      dialog: {
        // Title
        title: 'Account Successfully Registered',
        // Message
        message: 'Your account has been created successfully. Please contact an administrator so that they can ' +
          'activate your new account. Only then will you be able to log in to the application.'
      }
    },
    // Reset Password Messages
    reset: {
      // Reset Password Message
      message: 'If you have forgotten your password or would like to reset it for any other reason, you can do so ' +
        'here by entering your account email address in the field below. You will receive an email at the address ' +
        'provided. This will contain a link to change your password.',
      // Reset Password Button
      button: 'Reset Password',
      // Success Dialog Messages
      dialog: {
        // Title
        title: 'Email successfully sent',
        // Message
        message: 'The email with the link to reset your password has been sent successfully. Please also check your ' +
          'spam folder.'
      }
    },
  },
};
