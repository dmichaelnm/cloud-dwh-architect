<template>
  <!-- Input Component -->
  <q-input
    ref="inputField"
    :model-value="internalValue"
    :label="label"
    :type="type"
    :autofocus="autoFocus"
    :error="error !== undefined && error !== null && error.length > 0"
    :error-message="error !== null ? error : undefined"
    :rules="[
      (value) =>
        !mandatory || (value && value.length > 0) || $t('error.inputEmpty'),
    ]"
    :hide-bottom-space="hideBottomSpace"
    lazy-rules="ondemand"
    dense
    outlined
    stack-label
    @update:modelValue="(value) => (internalValue = value)"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QInput } from 'quasar';

// Input field reference
const inputField = ref<QInput | null>(null);

/** Defines the properties of this component */
const props = defineProps<{
  /** The model value */
  modelValue: any;
  /** The label of the input field */
  label?: string;
  /** Type of the input field */
  type?: 'text' | 'password' | 'textarea';
  /** Flag for setting the focus on this input component automatically */
  autoFocus?: boolean;
  /** Error message */
  error?: string | null;
  /** Flag for showing an error message if the input field is empty */
  mandatory?: boolean;
  /** Flag for hiding the bottom space */
  hideBottomSpace?: boolean;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** Update model value event */
  (event: 'update:modelValue', value: any): void;
}>();

/** Internal value of the select component */
const internalValue = computed({
  /** The getter method */
  get: () => props.modelValue,
  /** The setter method */
  set: (value: any) => emit('update:modelValue', value),
});

/**
 * Resets the validation state of the input field.
 */
function resetValidation(): void {
  inputField.value?.resetValidation();
}

/**
 * Select the content of the input field.
 */
function select(): void {
  inputField.value?.select();
}

/** Exposed methods of this component */
defineExpose({ resetValidation, select });
</script>
