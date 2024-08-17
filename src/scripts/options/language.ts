import * as flags from 'quasar-extras-svg-icons/country-flag-icons';
import { TSelectOption } from 'src/scripts/utilities/common';

/**
 * Represents the supported languages.
 */
export enum ELanguage {
  /** English (US) */
  enUS = 'en-US',
  /** German (DE) */
  deDE = 'de-DE',
}

/**
 * An array of select options for all supported languages of the application.
 */
export const languageOptions: TSelectOption[] = [
  /** English (US) */
  {
    value: ELanguage.enUS,
    label: 'language.enUS',
    icon: flags.flagUS,
  },
  /** German (DE) */
  {
    value: ELanguage.deDE,
    label: 'language.deDE',
    icon: flags.flagDE,
  },
];
