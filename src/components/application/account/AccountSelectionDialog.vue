<template>
  <!-- Basic Dialog -->
  <app-dialog
    v-model="visibility"
    :title="$t('dialog.accountSelection.title')"
    :message="$t('dialog.accountSelection.message')"
    :submit="submit"
    @before-show="initialize"
  >
    <!-- Email Address Input -->
    <app-input
      v-model="email"
      :label="$t('authentication.label.email')"
      :error="emailError"
      mandatory
      auto-focus
    />
  </app-dialog>
</template>

<script setup lang="ts">
import AppDialog from 'components/common/AppDialog.vue';
import { computed, ref } from 'vue';
import AppInput from 'components/common/AppInput.vue';
import { Account, getAccount } from 'src/scripts/application/Account';
import { useCommonComposables } from 'src/scripts/utilities/common';

// Get common composables
const cmp = useCommonComposables();

/** Defines the properties of this component */
const props = defineProps<{
  /** The model value */
  modelValue: boolean;
  /** Custom validator function */
  validator?: (account: Account) => string | null;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  // Update model value event
  (event: 'update:modelValue', value: boolean): void;
  // Account selection event
  (event: 'accountSelected', value: Account): void;
}>();

/** The visibility of the dialog */
const visibility = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

// Email Address
const email = ref('');
// Email Address error
const emailError = ref<string | null>(null);

/**
 * Initializes the email address field by resetting its value.
 */
function initialize(): void {
  // Reset email address value and error
  email.value = '';
  emailError.value = null;
}

/**
 * This method is called when the user submits the form of this dialog.
 */
async function submit(): Promise<boolean> {
  // Get the account document from Firebase
  const account = await getAccount(email.value);
  if (account !== null) {
    // If a validator is specified, call the validator
    if (props.validator) {
      const result = props.validator(account);
      if (result != null) {
        // Email address is not valid, set error message
        emailError.value = result;
        // Dialog remains open
        return false;
      }
    }
    // Emit event
    emit('accountSelected', account);
    // We found an account, dialog can be closed
    return true;
  } else {
    // No account with the specified email address
    emailError.value = cmp.i18n.t('dialog.accountSelection.unknownEmail');
    // Dialog remains open
    return false;
  }
}
</script>
