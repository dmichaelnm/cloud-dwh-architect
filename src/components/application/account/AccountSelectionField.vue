<template>
  <!-- Account Selection Dialog -->
  <account-selection-dialog
    v-model="visibility"
    :validator="validator"
    @account-selected="(value) => (account = value)"
  />

  <!-- Field -->
  <q-field
    :model-value="account"
    :label="label"
    :outlined="!readOnly"
    :borderless="readOnly"
    :error="error !== undefined && error !== null && error.length > 0"
    :error-message="error !== null ? error : undefined"
    dense
    readonly
    stack-label
  >
    <!-- Template: Account Name -->
    <template #control>
      <!-- Account Name -->
      {{ account ? account.data.common.name : '' }}
    </template>
    <!-- Template: Select Button -->
    <template #prepend v-if="!readOnly">
      <!-- Select Button -->
      <app-button
        appearance="icon"
        size="sm"
        icon="person_search"
        @click="visibility = true"
      />
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { Account } from 'src/scripts/application/Account';
import { computed, ref } from 'vue';
import AppButton from 'components/common/AppButton.vue';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';

/** Defines the properties of this component */
const props = defineProps<{
  /** Model value */
  modelValue: Account | null;
  /** Label */
  label?: string;
  /** Flag for readonly mode */
  readOnly?: boolean;
  /** Custom validator function */
  validator?: (account: Account) => string | null;
  /** Optional error message */
  error?: string | null;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** Update model value event */
  (event: 'update:modelValue', value: Account | null): void;
}>();

/** Internal model value */
const account = computed({
  get: () => props.modelValue,
  set: (value: Account | null): void => emit('update:modelValue', value),
});

// Account Selection Dialog Visibility
const visibility = ref(false);
</script>
