<template>
  <!-- Authentication Frame -->
  <authentication-frame
    :message="$t('authentication.reset.message')"
    @language-changed="resetErrorMessages"
  >
    <!-- Form -->
    <q-form @submit="submit" greedy>
      <!-- Main DIV -->
      <div class="q-col-gutter-y-md">
        <!-- Email Row -->
        <div class="row q-col-gutter-x-md">
          <!-- Email Column -->
          <div class="col">
            <!-- Email Input -->
            <app-input
              ref="inputEmail"
              v-model="email"
              :label="$t('authentication.label.email')"
              :auto-focus="email === '' || email === null"
              :error="emailError"
              mandatory
            />
          </div>
        </div>
        <!-- Reset Button Row -->
        <div class="row">
          <!-- Reset Button Column -->
          <div class="col text-center">
            <!-- Reset Button -->
            <app-button
              :label="$t('authentication.reset.button')"
              type="submit"
            />
          </div>
        </div>
        <!-- Link Row -->
        <div class="row">
          <!-- Link Column -->
          <div class="col text-center">
            <!-- Back Button -->
            <app-button
              appearance="link"
              :label="$t('button.back')"
              to="/authentication/login"
            />
          </div>
        </div>
      </div>
    </q-form>
  </authentication-frame>
</template>

<script setup lang="ts">
import AuthenticationFrame from 'components/application/authentication/AuthenticationFrame.vue';
import AppInput from 'components/common/AppInput.vue';
import { onBeforeMount, ref } from 'vue';
import AppButton from 'components/common/AppButton.vue';
import { useCommonComposables } from 'src/scripts/utilities/common';
import { useRunTask } from 'src/scripts/utilities/runTask';
import { sendResetPasswordEmail } from 'src/scripts/utilities/firebase';
import { processFireabseError } from 'src/scripts/utilities/authentication';
import { useMessageDialog } from 'src/scripts/utilities/messageDialog';

// Get common composables
const cmp = useCommonComposables();
// Get run task composable
const runTask = useRunTask();
// Get message dialog composables
const { showSuccessDialog } = useMessageDialog();

// Email Input Reference
const inputEmail = ref<typeof AppInput | null>(null);

// Email Address
const email = ref<string | null>(null);
// Email Address Error
const emailError = ref<string | null>(null);

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  // Set email from cookie
  email.value = cmp.quasar.cookies.get('email');
});

/**
 * Resets the error messages for all input fields of this page.
 */
function resetErrorMessages(): void {
  // Reset email error messages
  inputEmail.value?.resetValidation();
  emailError.value = null;
}

/**
 * This method is called when the user submits the form for resetting the password.
 */
function submit(): void {
  // Reset error messages
  resetErrorMessages();

  // Run the task to reset the password.
  runTask(
    // Task handler
    async () => {
      // Send password reset mail
      await sendResetPasswordEmail(email.value as string);
      // Show success dialog
      showSuccessDialog(
        cmp.i18n.t('authentication.reset.dialog.title'),
        cmp.i18n.t('authentication.reset.dialog.message'),
        null,
        () => {
          // Return to login page
          cmp.router.push({ path: '/authentication/login' });
        }
      );
    },
    // Error handler
    (error) => {
      // Process Firebase error
      return processFireabseError(cmp.i18n.t, error, emailError, null);
    }
  );
}
</script>
