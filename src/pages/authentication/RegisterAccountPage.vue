<template>
  <!-- Authentication Frame -->
  <authentication-frame
    :message="$t('authentication.register.message')"
    @language-changed="resetErrorMessages"
  >
    <!-- Form -->
    <q-form greedy @submit="submit">
      <!-- Main Div -->
      <div class="q-col-gutter-y-md">
        <!-- First And Last Name Row -->
        <div class="row q-col-gutter-x-md">
          <!-- First Name Column -->
          <div class="col">
            <!-- First Name Input -->
            <app-input
              ref="inputFirstName"
              v-model="firstName"
              :label="$t('authentication.label.firstName')"
              mandatory
              auto-focus
            />
          </div>
          <!-- Last Name Column -->
          <div class="col">
            <!-- Last Name Input -->
            <app-input
              ref="inputLastName"
              v-model="lastName"
              :label="$t('authentication.label.lastName')"
              mandatory
            />
          </div>
        </div>
        <!-- Email Address Row -->
        <div class="row">
          <!-- Email Address Column -->
          <div class="col">
            <!-- Email Address Input -->
            <app-input
              ref="inputEmail"
              v-model="email"
              :label="$t('authentication.label.email')"
              :error="emailError"
              mandatory
            />
          </div>
        </div>
        <!-- Password And Password Repeat Row -->
        <div class="row q-col-gutter-x-md">
          <!-- Password Column -->
          <div class="col">
            <!-- Password Input -->
            <app-input
              ref="inputPassword"
              v-model="password"
              :label="$t('authentication.label.password')"
              :error="passwordError"
              type="password"
              mandatory
            />
          </div>
          <!-- Password Repeat Column -->
          <div class="col">
            <!-- Password Repeat Input -->
            <app-input
              ref="inputPasswordRepeat"
              v-model="passwordRepeat"
              :label="$t('authentication.label.passwordRepeat')"
              :error="passwordRepeatError"
              type="password"
              mandatory
            />
          </div>
        </div>
        <!-- Register Button Row -->
        <div class="row">
          <!-- Register Button Column -->
          <div class="col text-center">
            <!-- Register Button -->
            <app-button
              :label="$t('authentication.register.button')"
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
import { ref } from 'vue';
import AppInput from 'components/common/AppInput.vue';
import AppButton from 'components/common/AppButton.vue';
import { useCommonComposables } from 'src/scripts/utilities/common';
import { useRunTask } from 'src/scripts/utilities/runTask';
import { createAccount } from 'src/scripts/application/Account';
import { ELanguage } from 'src/scripts/options/language';
import { processFireabseError } from 'src/scripts/utilities/authentication';
import { useMessageDialog } from 'src/scripts/utilities/messageDialog';

// Get common composables
const cmp = useCommonComposables();
// Get run task composable
const runTask = useRunTask();
// Get message dialog composables
const { showSuccessDialog } = useMessageDialog();

// First Name Input Reference
const inputFirstName = ref<typeof AppInput | null>(null);
// Last Name Input Reference
const inputLastName = ref<typeof AppInput | null>(null);
// Email Input Reference
const inputEmail = ref<typeof AppInput | null>(null);
// Password Input Reference
const inputPassword = ref<typeof AppInput | null>(null);
// Password Repeat Input Reference
const inputPasswordRepeat = ref<typeof AppInput | null>(null);

// First Name
const firstName = ref<string | null>(null);
// Last Name
const lastName = ref<string | null>(null);
// Email Address
const email = ref<string | null>(null);
// Email Address Error
const emailError = ref<string | null>(null);
// Password
const password = ref<string | null>(null);
// Password Error
const passwordError = ref<string | null>(null);
// Password Repeat
const passwordRepeat = ref<string | null>(null);
// Password Repeat Error
const passwordRepeatError = ref<string | null>(null);

/**
 * Resets the error messages for all input fields of this page.
 */
function resetErrorMessages(): void {
  // Reset error messages of first name input
  inputFirstName.value?.resetValidation();
  // Reset error messages of last name input
  inputLastName.value?.resetValidation();
  // Reset error messages of email input
  inputEmail.value?.resetValidation();
  emailError.value = null;
  // Reset error messages of password input
  inputPassword.value?.resetValidation();
  passwordError.value = null;
  // Reset error messages of password repeat input
  inputPasswordRepeat.value?.resetValidation();
  passwordRepeatError.value = null;
}

/**
 * This method is called when the user submits the form for creating a new account.
 */
function submit(): void {
  // Reset error messages
  resetErrorMessages();

  // Check the password and the repeated password
  if (password.value !== passwordRepeat.value) {
    // Set error message and return
    passwordRepeatError.value = cmp.i18n.t(
      'authentication.error.passwordRepeatInvalid'
    );
    return;
  }

  // Run the task for creating a new account
  runTask(
    // Task handler
    async () => {
      // Create the new account
      await createAccount(
        firstName.value as string,
        lastName.value as string,
        email.value as string,
        password.value as string,
        cmp.quasar.dark.isActive,
        cmp.i18n.locale.value as ELanguage
      );
      // Show success dialog
      showSuccessDialog(
        cmp.i18n.t('authentication.register.dialog.title'),
        cmp.i18n.t('authentication.register.dialog.message'),
        null,
        () => {
          // Set the email cookie
          cmp.quasar.cookies.set('email', email.value as string, { expires: 365 });
          // Route to the login page
          cmp.router.push({ path: '/authentication/login' });
        }
      );
    },
    // Error handler
    (error) => {
      // Process any error from Firebase
      return processFireabseError(cmp.i18n.t, error, emailError, passwordError);
    }
  );
}
</script>
