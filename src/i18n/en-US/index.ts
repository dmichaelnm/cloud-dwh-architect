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

  // Common Buttons and Menu Items
  button: {
    // Back
    back: 'Back',
    // Cancel
    cancel: 'Cancel',
    // Close
    close: 'Close',
    // Dark Mode
    darkMode: 'Dark Mode',
    // Language
    language: 'Language',
    // Light Mode
    lightMode: 'Light Mode',
    // Logout
    logout: 'Log Out',
    // Okay
    okay: 'Okay',
    // Save
    save: 'Save',
  },

  // Common Labels
  label: {
    // Custom Attributes
    attributes: 'Custom Attributes',
    // Name
    name: 'Name',
    // Description
    description: 'Description (optional)',
    // Rows per page
    rowsPerPage: 'Rows per page',
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

  // Enumeration Messages
  enum: {
    // Project Member Roles
    memberRole: {
      // Owner
      owner: 'Owner',
      // Project Manager
      manager: 'Project Manager',
      // Maintainer
      maintainer: 'Maintainer',
      // Deployer
      deployer: 'Deployer',
      // Developer
      developer: 'Developer',
      // Visitor
      visitor: 'Visitor',
    },
    // Custom Attribute Type
    attributeType: {
      // String
      string: 'String',
      // Number
      number: 'Number',
      // Boolean
      boolean: 'Boolean'
    }
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
    // Account Selection Dialog
    accountSelection: {
      // Title
      title: 'Choose Account',
      // Message
      message:
        'To select an account, enter the email address used to register the account in the input field below.',
      // Unknown email address
      unknownEmail: 'The email address is unknown.',
    },
  },

  // Common Error Messages
  error: {
    // Input field must not be empty
    inputEmpty: 'The input field must not be empty.',
    // No account selected
    accountNotSelected: 'An account must be selected.'
  },

  // Custom Attribute Messages
  customAttribute: {
    // Table Message
    tableMessage: 'Here you can define your own attributes that can later be used in templates for script generation.',
    // Empty Message
    emptyMessage: 'No custom attributes have been created yet.',
    // Header Labels
    header: {
      // Key
      key: 'Key',
      // Type
      type: 'Datatype',
      // Value
      value: 'Value'
    },
    // Tooltip Messages
    tooltip: {
      // Add Button
      add: 'Add Attribute',
      // Remove Button
      remove: 'Remove Attribute',
    }
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
      accountLocked: 'The account is locked.',
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
        message:
          'Your account has been created successfully. Please contact an administrator so that they can ' +
          'activate your new account. Only then will you be able to log in to the application.',
      },
    },
    // Reset Password Messages
    reset: {
      // Reset Password Message
      message:
        'If you have forgotten your password or would like to reset it for any other reason, you can do so ' +
        'here by entering your account email address in the field below. You will receive an email at the address ' +
        'provided. This will contain a link to change your password.',
      // Reset Password Button
      button: 'Reset Password',
      // Success Dialog Messages
      dialog: {
        // Title
        title: 'Email successfully sent',
        // Message
        message:
          'The email with the link to reset your password has been sent successfully. Please also check your ' +
          'spam folder.',
      },
    },
  },

  // Project Messages
  project: {
    // Button Labels
    button: {
      // Create New Project
      create: 'New Project',
      // Overview
      overview: 'Project Overview'
    },
    // General Project Messages
    message: {
      // First Project Message
      firstProject: 'It appears that you have not yet created a project and are not assigned as a team member to ' +
        'any project. However, to work with the application you need at least one project. Start now by creating a ' +
        'new project.'
    },
    // Project Editor Messages
    editor: {
      // Create Messages
      create: {
        // Editor Title
        title: 'Create New Project',
        // Create Editor Message
        message:
          'Start a new project by specifying the basic properties such as name and description here. You can ' +
          'also add more members to your project and assign them different roles. However, please note that they ' +
          'must have a registered account for this application.',
      },
      // Tab Labels
      tab: {
        // Project Members
        members: 'Project Members',
      },
    },
    // Project Member Table Messages
    member: {
      // Owner & Manager Message
      ownerMessage:
        'If you are the project owner, you can specify a project manager here. This manager has all ' +
        'the permissions that the owner has, except that he cannot specify another project manager. If you do not ' +
        'want to specify an explicit project manager, you can also appoint yourself as the project manager.',
      // Table Message
      tableMessage:
        'Here you can manage the members of your project team. If you want to add a new member, they must ' +
        'already have a registered account. You can use the role of a member to determine which permissions they ' +
        'have. Project owners and project managers cannot be selected as members.',
      // Table Header Messages
      header: {
        // Name of the project member
        name: 'Name of Project Member',
        // Role
        role: 'Role',
      },
      // Tooltip Messages
      tooltip: {
        // Add Button
        add: 'Add New Member',
        // Delete Button
        remove: 'Remove Member',
      },
      // Error Messages
      error: {
        // Manager cannot be a team member
        alreadyMember: 'The selected account is already a team member.',
        // Team member cannot be the owner
        notOwner: 'The owner cannot be a team member at the same time.',
        // Team member cannot be the manager
        notManager:
          'The project manager cannot be a team member at the same time.',
      },
    },
  },
};
