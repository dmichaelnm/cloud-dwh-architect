import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useSessionStore } from 'stores/session-store';

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
