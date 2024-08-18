import { useCommonComposables } from 'src/scripts/utilities/common';
import { useMessageDialog } from 'src/scripts/utilities/messageDialog';

/**
 * A hook that returns a composable function for running a task asynchronously.
 *
 * The function takes a task function and an optional error handler function as parameters.
 * The task function should return a promise. If the task is successful, the promise will be resolved with the result.
 * If the task encounters an error, the promise will be rejected with the error.
 *
 * If an error handler function is specified, it will be called with the error as a parameter.
 * The error handler function should return a boolean value indicating whether the error has been handled or not.
 * If the error handler returns true, the promise will be resolved with undefined.
 * If the error handler returns false, the promise will be rejected and an unexpected error dialog will be shown.
 *
 * The returned composable function should be called with the task function and the error handler function to execute the task.
 * It returns a promise that will be resolved with the result of the task if it is successful, or undefined if it encounters an error.
 *
 * @return {Function} The composable function for running a task asynchronously.
 */
export function useRunTask(): <R>(
  task: () => Promise<any>,
  errorHandler?: (error: unknown) => boolean
) => Promise<R | undefined> {
  // Get common composables
  const cmp = useCommonComposables();
  // Get message dialog composables
  const { showErrorDialog } = useMessageDialog();

  // Return the composable
  return (
    task: () => Promise<any>,
    errorHandler?: (error: unknown) => boolean
  ) =>
    new Promise((resolve) => {
      // Lock the screen
      cmp.quasar.loading.show();
      // Run the task function
      task()
        // Handle success
        .then((result) => {
          resolve(result);
        })
        // Handle error
        .catch((error) => {
          // Log the error
          console.error(error);
          // If error handler is specified call the error handler
          let errorProcessed = false;
          if (errorHandler) {
            errorProcessed = errorHandler(error);
          }
          // If error was not processed, show unexpected error dialog
          if (!errorProcessed) {
            // Get error message
            const errorMessage = error.message
              ? error.message
              : error.toString();
            // Show the error dialog
            showErrorDialog(
              cmp.i18n.t('dialog.unexpectedError.title'),
              cmp.i18n.t('dialog.unexpectedError.message'),
              errorMessage,
              null
            );
          }
          // Task was not successful
          resolve(undefined);
        })
        // Finish the task
        .finally(() => {
          // Unlock the screen
          cmp.quasar.loading.hide();
        });
    });
}
