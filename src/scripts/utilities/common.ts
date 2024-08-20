import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useSessionStore } from 'stores/session-store';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';

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
    id?: string,
    cancelable: boolean = true
  ): Promise<void> => {
    // Set routing information on session
    cmp.session.editor = { mode: mode, id: id, cancelable };
    // Route to the editor page
    await cmp.router.push({
      path: `/${scope}/editor`,
    });
  };
}
