<template>
  <!-- Authentication Frame -->
  <authentication-frame
    :message="$t('authentication.login.message')"
    @language-changed="resetErrorMessages"
  >
    <!-- Form -->
    <q-form @submit="submit" greedy>
      <!-- Main DIV -->
      <div class="q-col-gutter-y-md">
        <!-- Email / Password Row -->
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
          <!-- Password Column -->
          <div class="col">
            <!-- Password Input -->
            <app-input
              ref="inputPassword"
              v-model="password"
              :label="$t('authentication.label.password')"
              type="password"
              :auto-focus="email !== '' && email !== null"
              :error="passwordError"
              mandatory
            />
          </div>
        </div>
        <!-- Login Button Row -->
        <div class="row">
          <!-- Login Button Column -->
          <div class="col text-center">
            <!-- Login Button -->
            <app-button
              :label="$t('authentication.login.button')"
              type="submit"
            />
          </div>
        </div>
        <!-- Link Row -->
        <div class="row">
          <!-- Register Account Column -->
          <div class="col text-left">
            <!-- Register Account Button -->
            <app-button
              appearance="link"
              :label="$t('authentication.register.button')"
              to="/authentication/register"
            />
          </div>
          <!-- Reset Password Column -->
          <div class="col text-right">
            <!-- Reset Password Button -->
            <app-button
              appearance="link"
              :label="$t('authentication.reset.button')"
              to="/authentication/reset"
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
import { processFireabseError } from 'src/scripts/utilities/authentication';
import { login } from 'src/scripts/application/Account';

// Get common composables
const cmp = useCommonComposables();
// Get run task composable
const runTask = useRunTask();

// Email Input Reference
const inputEmail = ref<typeof AppInput | null>(null);
// Password Input Reference
const inputPassword = ref<typeof AppInput | null>(null);

// Email Address
const email = ref<string | null>(null);
// Email Address Error
const emailError = ref<string | null>(null);
// Password
const password = ref<string | null>('');
// Password Error
const passwordError = ref<string | null>('');

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  // Get email address from cookie
  email.value = cmp.quasar.cookies.get('email');
});

/**
 * Resets the error messages for the email and password inputs.
 */
function resetErrorMessages(): void {
  // Reset email input error message
  inputEmail.value?.resetValidation();
  emailError.value = null;
  // Reset password input error message
  inputPassword.value?.resetValidation();
  passwordError.value = null;
}

/**
 * This method is called when the user submits the form for login to the application.
 */
function submit(): void {
  // Reset error messages
  resetErrorMessages();

  // Start the task to log in the user
  runTask(
    // Task handler
    async () => {
      // Login the user
      await login(email.value as string, password.value as string);
      // Set email cookie
      cmp.quasar.cookies.set('email', email.value as string, { expires: 365 });
      // Route to the main layout
      await cmp.router.push({ path: '/' });
    },
    // Error handler
    (error) => {
      // Process Firebase error
      return processFireabseError(cmp.i18n.t, error, emailError, passwordError);
    }
  );
}
</script>
