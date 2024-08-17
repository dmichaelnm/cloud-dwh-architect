import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

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
 * Returns an object that contains common composable functions.
 *
 * @returns {Object} An object containing the following composable functions:
 * - quasar: A function that provides access to Quasar composable functions.
 * - i18n: A function that provides access to I18n composable functions.
 * - route: A function that provides access to route composable functions.
 * - router: A function that provides access to router composable functions.
 */
export function useCommonComposables() {
  return {
    quasar: useQuasar(),
    i18n: useI18n(),
    route: useRoute(),
    router: useRouter(),
  };
}
