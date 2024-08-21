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
    back: 'Zurück',
    // Cancel
    cancel: 'Abbrechen',
    // Close
    close: 'Schließen',
    // Dark Mode
    darkMode: 'Dunkler Modus',
    // Language
    language: 'Sprache',
    // Light Mode
    lightMode: 'Heller Modus',
    // Logout
    logout: 'Abmelden',
    // Okay
    okay: 'Okay',
    // Save
    save: 'Speichern',
  },

  // Common Labels
  label: {
    // Custom Attributes
    attributes: 'Benutzerdefinierte Attribute',
    // Name
    name: 'Name',
    // Description
    description: 'Beschreibung (optional)',
    // Rows per page
    rowsPerPage: 'Zeilen pro Seite',
  },

  // Enumeration Messages
  enum: {
    // Project Member Roles
    memberRole: {
      // Owner
      owner: 'Eigentümer',
      // Project Manager
      manager: 'Projektleiter',
      // Maintainer
      maintainer: 'Betreuer',
      // Deployer
      deployer: 'Bereitsteller',
      // Developer
      developer: 'Entwickler',
      // Visitor
      vistor: 'Besucher',
    },
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
    // Account Selection Dialog
    accountSelection: {
      // Title
      title: 'Konto auswählen',
      // Message
      message:
        'Um ein Konto auszuwählen, geben Sie in das untenstehende Eingabefeld die Email-Adresse, mit der das Konto registriert wurde an.',
      // Unknown email address
      unknownEmail: 'Die Email-Adresse ist unbekannt.',
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
      emailAlreadyInUse:
        'Es existiert bereits ein Konto mit dieser Email-Adresse.',
      // Invalid credential
      invalidCredential: 'Die Anmeldeinformationen sind nicht korrekt.',
      // Too many failed attempts
      tooManyFailedAttempts: 'Zu viele fehlgeschlagene Anmeldeversuche.',
      // Account is locked
      accountLocked: 'Das Konto ist gesperrt.',
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
        message:
          'Ihr Konto wurde erfolgreich erstellt. Bitte kontaktieren Sie einen Administrator, damit dieser Ihr ' +
          'neues Konto freischalten kann. Erst danach ist eine Anmeldung an der Applikation möglich.',
      },
    },
    // Reset Password Messages
    reset: {
      // Reset Password Message
      message:
        'Falls Sie Ihr Kennwort vergessen haben oder aus anderen Gründen zurücksetzen möchten, können Sie ' +
        'dies hier tun, indem Sie die Email-Adresse Ihres Kontos in das untenstehende Eingabefeld eintragen. Sie ' +
        'erhalten eine Email an die angegebene Adresse. Diese enthält einen Link für das Ändern Ihres Kennworts.',
      // Reset Password Button
      button: 'Kennwort zurücksetzen',
      // Success Dialog Messages
      dialog: {
        // Title
        title: 'Email erfolgreich versendet',
        // Message
        message:
          'Die Email mit dem Link zum Zurücksetzen des Kennworts wurde erfolgreich versendet. Überprüfen Sie ' +
          'gegebenenfalls auch Ihren Spam-Ordner.',
      },
    },
  },

  // Project Messages
  project: {
    // Project Editor Messages
    editor: {
      // Create Messages
      create: {
        // Create Editor Title
        title: 'Neues Projekt erstellen',
        // Create Editor Message
        message:
          'Beginnen Sie ein neues Projekt, indem Sie hier die grundlegenden Eigenschaften wie Name und ' +
          'Beschreibung angeben. Außerdem können Sie weitere Mitglieder Ihrem Projekt hinzufügen und Ihnen ' +
          'verschiedene Rollen zuweisen. Beachten Sie dabei jedoch, dass diese ein registriertes Konto für diese ' +
          'Anwendung besitzen müssen.',
      },
      // Tab Labels
      tab: {
        // Project Members
        members: 'Projektmitglieder',
      },
    },
    // Project Member Table Messages
    member: {
      // Owner & Manager Message
      ownerMessage:
        'Wenn Sie der Projekteigentümer sind, können Sie hier einen Projektleiter festlegen. Dieser hat ' +
        'alle Berechtigungen, die auch der Eigentümer hat, mit der Ausnahme, dass er keinen anderen Projektleiter ' +
        'festlegen kann. Wenn Sie keinen expliziten Projektleiter festlegen wollen, können Sie auch sich selbst zum ' +
        'Projektleiter ernennen.',
      // Table Message
      tableMessage:
        'Hier können Sie die Mitglieder Ihres Projektteams verwalten. Wenn Sie ein neues Mitglied hinzufügen ' +
        'möchten, muss dieses ein bereits registriertes Konto besitzen. Über die Rolle eines Mitglieds können Sie ' +
        'festlegen welche Berechtigungen dieses hat. Projekteigentümer und Projektleiter können nicht als Mitglieder ' +
        'ausgewählt werden.',
      // Table Header Labels
      header: {
        // Name of the project member
        name: 'Name des Projektmitglieds',
        // Role
        role: 'Rolle',
      },
      // Error Messages
      error: {
        // Manager cannot be a team member
        alreadyMember:
          'Das gewählte Konto ist bereits ein Team-Mitglied.',
      },
    },
  },
};
