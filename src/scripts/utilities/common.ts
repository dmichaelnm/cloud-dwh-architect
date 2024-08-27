import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { QTableColumn, useQuasar } from 'quasar';
import { useSessionStore } from 'stores/session-store';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import { useMessageDialog } from 'src/scripts/utilities/messageDialog';

/**
 * Represents the available modes for an editor.
 */
export enum EEditorMode {
  /** Create Mode */
  create = 'create',
  /** Edit Mode */
  edit = 'edit',
  /** View Mode */
  view = 'view',
}

/**
 * Represents a select option with a value, label, and optional icon.
 */
export type TSelectOption = {
  /** The value of the option */
  value: any;
  /** The label of the option */
  label: string;
  /** An optional icon of the option */
  icon?: string;
};

/**
 * Represents a dialog button.
 */
export type TDialogButton = {
  /** The value of the button */
  value: string;
  /** The localized key of the label of the button */
  label: string;
  /** An optional appearance of the button */
  appearance?: 'button' | 'link' | 'icon';
  /** An optional color of the button */
  color?: string;
  /** An optional icon for the button */
  icon?: string;
};

/**
 * Represents a tab definition object.
 */
export type TTabDefinition = {
  /** The key of the tab */
  key: string;
  /** The label of the tab */
  label: string;
};

/**
 * Enumeration for different types of input for a table column.
 */
export enum EInputType {
  /** No input */
  none = 'none',
  /** Text Input Field */
  text = 'text',
  /** Select Combobox Field */
  select = 'select',
  /** Checkbox */
  checkbox = 'checkbox',
}

/**
 * Represents a type for defining a table column.
 */
export type TTableColumn = QTableColumn & {
  /** Type of input for the table column */
  input?: EInputType | ((row: any) => EInputType);
  /** Options of a select input */
  options?: TSelectOption[];
  /** Flag for translating the label */
  translate?: boolean;
  /** Flag for showing option icon */
  showOptionIcon?: boolean;
};

/**
 * Returns an object containing commonly used composable functions.
 */
export function useCommonComposables() {
  return {
    quasar: useQuasar(),
    i18n: useI18n(),
    route: useRoute(),
    router: useRouter(),
    session: useSessionStore(),
  };
}

/**
 * Returns the composable function to open an editor page.
 */
export function useOpenEditor() {
  // Get common composables
  const cmp = useCommonComposables();
  // Return the composable
  return async (
    scope: EFSDocumentType,
    mode: EEditorMode,
    id: string,
    resultHandler?: (result: any) => void
  ): Promise<void> => {
    // Set result handler
    cmp.session.resultHandler = resultHandler ? resultHandler : null;
    // Lock editor
    cmp.session.editorLock = true;
    // Route to the editor page
    await cmp.router.push({
      name: `${scope}Editor`,
      params: { mode: mode, id: id },
    });
  };
}

/**
 * Returns a composable function that can be used to navigate to a specified route path.
 */
export function useRouteTo() {
  // Get common composables
  const cmp = useCommonComposables();
  // Get confirmation dialog composable
  const { showConfirmationDialog } = useMessageDialog();
  // Return the composable
  return async (
    path: string,
    checkEditorLock: boolean = true
  ): Promise<void> => {
    // Check the editor if necessary
    if (checkEditorLock && cmp.session.editorLock) {
      console.debug('Editor is locked');
      // Editor is locked, show confirmation dialog
      showConfirmationDialog(
        cmp.i18n.t('dialog.discardChanges.title'),
        cmp.i18n.t('dialog.discardChanges.message'),
        null,
        (confirmed) => {
          if (confirmed) {
            // Reset editor lock
            cmp.session.editorLock = false;
            // Route to target path
            cmp.router.push({ path: path });
          }
        }
      );
    } else {
      // Route to target path
      await cmp.router.push({ path: path });
    }
  };
}

/**
 * Converts the given value to a number.
 *
 * @param {any} value - The value to be converted to a number.
 *
 * @returns {number | null} - The converted number or null if the conversion fails.
 */
export function toNumber(value: any): number | null {
  const nmbr = parseFloat(value);
  if (!isNaN(nmbr) && isFinite(nmbr)) {
    return nmbr;
  }
  return null;
}

/**
 * Converts a value to a boolean.
 *
 * @param {any} value - The value to convert.
 *
 * @returns {boolean} The converted boolean value.
 */
export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value as boolean;
  } else if (typeof value === 'string') {
    const str = (value as string).trim().toLowerCase();
    return str === 'true' || str === '1';
  } else if (typeof value === 'number') {
    const nmbr = value as number;
    return nmbr > 0;
  } else {
    return false;
  }
}
