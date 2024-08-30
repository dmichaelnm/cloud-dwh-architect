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
    // Altered By At
    alteredByAt: 'Geändert von / am',
    // Custom Attributes
    attributes: 'Benutzerdefinierte Attribute',
    // Created By At
    createdByAt: 'Erstellt von / am',
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
      visitor: 'Besucher',
    },
    // Custom Attribute Type
    attributeType: {
      // String
      string: 'Zeichenkette',
      // Number
      number: 'Zahl',
      // Boolean
      boolean: 'Wahrheitswert',
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
    // Discard Changes Dialog
    discardChanges: {
      // Title
      title: 'Änderungen verwerfen?',
      // Message
      message:
        'Wollen Sie die bisher in diesem Editor vorgenommenen Änderungen wirklich verwerfen?',
    },
  },

  // Common Error Messages
  error: {
    // Input field must not be empty
    inputEmpty: 'Das Eingabefeld darf nicht leer sein.',
    // No account selected
    accountNotSelected: 'Es muss ein Konto ausgewählt sein.',
  },

  // Custom Attribute Messages
  customAttribute: {
    // Table Message
    tableMessage:
      'Hier können Sie eigene Attribute festlegen, die später in Vorlagen für die Skriptgenerierung ' +
      'verwendet werden können.',
    // Empty Message
    emptyMessage: 'Bisher wurden noch keine eigenen Attribute erstellt.',
    // Header Labels
    header: {
      // Key
      key: 'Schlüssel',
      // Type
      type: 'Datentyp',
      // Value
      value: 'Wert',
    },
    // Tooltip Messages
    tooltip: {
      // Add Button
      add: 'Neues Attribut hinzufügen',
      // Remove Button
      remove: 'Attribut entfernen',
    },
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
    // Button Labels
    button: {
      // Create New Project
      create: 'Neues Projekt',
      // Overview
      overview: 'Projektübersicht',
    },
    // General Project Messages
    message: {
      // First Project Message
      firstProject:
        'Wie es scheint, haben Sie aktuell noch kein Projekt erstellt und wurden keinem Projekt als ' +
        'Team-Mitglied zugeordnet. Um mit der Applikation arbeiten zu können benötigen Sie jedoch mindestens ein ' +
        'Projekt. Beginnen Sie jetzt, indem Sie ein neues Projekt erstellen.',
    },
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
      // Edit Messages
      edit: {
        // Edit Editor Title
        title: 'Projekt bearbeiten',
        // Edit Editor Message
        message:
          'Hier können Sie die Eigenschaften des Projekts anpassen sowie die Miglieder Ihres Projektteams ' +
          'verwalten. Wenn Sie der Eigentümer des Projekts sind, können Sie auch einen anderen Projektleiter einsetzen.',
      },
      // Tab Labels
      tab: {
        // Project Members
        members: 'Projektmitglieder',
      },
    },
    // Project Overview Messages
    overview: {
      // Title
      title: 'Projektübersicht',
      // Message
      message:
        'Die folgende Übersicht zeigt eine Liste aller Projekte, die Sie selbst erstellt haben oder in denen ' +
        'Sie als Projekt-Mitglied tätig sind.',
      // Overview Header Messages
      header: {
        // Name
        name: 'Name des Projekts',
        // Owner
        owner: 'Eigentümer',
        // User Role
        userRole: 'Eigene Rolle',
        // Member Count
        memberCount: 'Anzahl Mitglieder',
      },
      // Tooltip Messages
      tooltip: {
        // Edit Button
        edit: 'Projekt bearbeiten',
        // Delete Button
        delete: 'Projekt löschen',
        // View Button
        view: 'Projekt betrachten',
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
      // Tooltip Messages
      tooltip: {
        // Add Button
        add: 'Neues Mitglied hinzufügen',
        // Delete Button
        remove: 'Mitglied entfernen',
      },
      // Error Messages
      error: {
        // Manager cannot be a team member
        alreadyMember: 'Das gewählte Konto ist bereits ein Team-Mitglied.',
        // Team member cannot be the owner
        notOwner: 'Der Eigentümer kann nicht gleichzeitig Team-Mitglied sein.',
        // Team member cannot be the manager
        notManager:
          'Der Projektleiter kann nicht gleichzeitig Team-Mitglied sein.',
      },
    },
  },
};
