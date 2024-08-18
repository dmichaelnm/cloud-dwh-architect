import { TDialogButton } from 'src/scripts/utilities/common';
import { Ref, ref } from 'vue';

/**
 * Represents the options for configuring a message dialog.
 */
export type TMessageDialogOptions = {
  /** Title of the message dialog */
  title: string;
  /** Message to be displayed */
  message: string;
  /** An optional more detailed message */
  details: string | null;
  /** A color used to decorate the message dialog */
  color: string;
  /** An array of buttons that can close the dialog */
  buttons: TDialogButton[];
  /** A handler function that is called when the dialog was closed */
  handler:
    | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
    | null;
  /** Visibility */
  visibility: boolean;
};

/**
 * The message dialog options struct.
 */
const messageDialogOptions = ref<TMessageDialogOptions>({
  title: '',
  message: '',
  details: null,
  color: '',
  buttons: [],
  handler: null,
  visibility: false,
});

/**
 * Returns composable functions for calling a message dialog.
 * - messageDialogOption - Should be used in layouts to define the message dialog component.
 * - showMessageDialog - A function to show a message dialog.
 * - showErrorDialog - A convenience function to show a error dialog.
 * - showSuccessDialog - A convenience function to show a success dialog.
 */
export function useMessageDialog(): {
  /** Message Dialog Options */
  messageDialogOptions: Ref<TMessageDialogOptions>;
  /**
   * Displays a dialog box with a message and optional details, and allows the user to choose from a set of buttons.
   *
   * @param {string} title - The title of the dialog box.
   * @param {string} message - The main message to display in the dialog box.
   * @param {string | null} [details=null] - Additional details to display in the dialog box.
   * @param {string} [color='primary'] - The color theme of the dialog box.
   * @param {TDialogButton[]} [buttons=[{ value: 'close', label: 'button.close' }]] - An array of buttons to display in the dialog box. Each button should have a value and a label.
   * @param {((value: string) => boolean | void | Promise<boolean> | Promise<void>) | null} [handler=null] - A callback function that will be triggered when a button is clicked. It should accept a string parameter representing the value of the clicked button and return either a boolean, void, or a Promise resolving to a boolean or void.
   */
  showMessageDialog: (
    title: string,
    message: string,
    details: string | null,
    color: string,
    buttons: TDialogButton[],
    handler:
      | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
      | null
  ) => void;
  /**
   * Displays an error dialog with the given title and message.
   *
   * @param {string} title - The title of the error dialog.
   * @param {string} message - The error message to display.
   * @param {string|null} [details=null] - Additional details about the error.
   * @param {((value: string) => boolean | void | Promise<boolean> | Promise<void>) | null} [handler=null] - A callback function that will be triggered when a button is clicked. It should accept a string parameter representing the value of the clicked button and return either a boolean, void, or a Promise resolving to a boolean or void.
   */
  showErrorDialog: (
    title: string,
    message: string,
    details: string | null,
    handler:
      | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
      | null
  ) => void;
  /**
   * Displays a success dialog with the given title and message.
   *
   * @param {string} title - The title of the success dialog.
   * @param {string} message - The success message to display.
   * @param {string|null} [details=null] - Additional details about the success.
   * @param {((value: string) => boolean | void | Promise<boolean> | Promise<void>) | null} [handler=null] - A callback function that will be triggered when a button is clicked. It should accept a string parameter representing the value of the clicked button and return either a boolean, void, or a Promise resolving to a boolean or void.
   */
  showSuccessDialog: (
    title: string,
    message: string,
    details: string | null,
    handler:
      | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
      | null
  ) => void;
} {
  return {
    // Return the message dialog options
    messageDialogOptions: messageDialogOptions,
    // Returns the "showMessageDialog" function
    showMessageDialog: (
      title: string,
      message: string,
      details: string | null,
      color: string,
      buttons: TDialogButton[],
      handler:
        | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
        | null
    ) => {
      messageDialogOptions.value.title = title;
      messageDialogOptions.value.message = message;
      messageDialogOptions.value.details = details;
      messageDialogOptions.value.color = color;
      messageDialogOptions.value.buttons = buttons;
      messageDialogOptions.value.handler = handler;
      messageDialogOptions.value.visibility = true;
    },
    // Returns the "showErrorDialog" function
    showErrorDialog: (
      title: string,
      message: string,
      details: string | null,
      handler:
        | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
        | null
    ) => {
      messageDialogOptions.value.title = title;
      messageDialogOptions.value.message = message;
      messageDialogOptions.value.details = details;
      messageDialogOptions.value.color = 'negative';
      messageDialogOptions.value.buttons = [
        { value: 'close', label: 'button.close' },
      ];
      messageDialogOptions.value.handler = handler;
      messageDialogOptions.value.visibility = true;
    },
    // Returns the "showSuccessDialog" function
    showSuccessDialog: (
      title: string,
      message: string,
      details: string | null,
      handler:
        | ((value: string) => boolean | void | Promise<boolean> | Promise<void>)
        | null
    ) => {
      messageDialogOptions.value.title = title;
      messageDialogOptions.value.message = message;
      messageDialogOptions.value.details = details;
      messageDialogOptions.value.color = 'positive';
      messageDialogOptions.value.buttons = [
        { value: 'close', label: 'button.close' },
      ];
      messageDialogOptions.value.handler = handler;
      messageDialogOptions.value.visibility = true;
    },
  };
}
