<template>
  <!-- Select Component -->
  <q-select
    ref="select"
    :model-value="internalValue"
    :options="options"
    dense
    options-dense
    map-options
    emit-value
    stack-label
    :label="label"
    :autocomplete="autoComplete"
    :borderless="borderless"
    :outlined="!borderless"
    :hide-bottom-space="hideBottomSpace"
    @update:modelValue="(value) => (internalValue = value)"
  >
    <!-- Template for the icon of the select component -->
    <template #prepend v-if="icon || showOptionIcon">
      <!-- Icon -->
      <q-icon :name="showOptionIcon ? selectedOption?.icon : icon" />
    </template>
    <!-- Template for selected value -->
    <template #selected>
      {{
        selectedOption
          ? translate
            ? $t(selectedOption.label)
            : selectedOption.label
          : ''
      }}
    </template>
    <!-- Template for select option -->
    <template #option="props">
      <!-- Slot -->
      <slot name="option" v-bind="props">
        <!-- Option Item -->
        <q-item dense clickable v-close-popup v-bind="props.itemProps">
          <!-- Option Item Icon Section -->
          <q-item-section avatar v-if="showEmptyIcon || props.opt.icon">
            <!-- Option Item Icon -->
            <q-icon :name="props.opt.icon" v-if="props.opt.icon" size="sm" />
          </q-item-section>
          <!-- Option Item Label Section -->
          <q-item-section>
            <!-- Option Item Label -->
            <q-item-label
              >{{ translate ? $t(props.opt.label) : props.opt.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </slot>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TSelectOption } from 'src/scripts/utilities/common';
import { QSelect } from 'quasar';

// Select component reference
const select = ref<QSelect | null>(null);

/** Defines the properties of this component */
const props = defineProps<{
  /** The model value */
  modelValue: any;
  /** The options of the select component */
  options: TSelectOption[];
  /** An optional icon */
  icon?: string;
  /** Flag for hiding the border of the select component */
  borderless?: boolean;
  /** Flag for considering the label as localization key and tranlating the label */
  translate?: boolean;
  /** Flag for showing the icon of the selected option */
  showOptionIcon?: boolean;
  /** Flag for showinf the icon space in an option even if there is no icon */
  showEmptyIcon?: boolean;
  /** Flag for hiding the bottom space */
  hideBottomSpace?: boolean;
  /** Auto Complete attribute */
  autoComplete?: string;
  /** Label of the selection component */
  label?: string;
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

/** The currently selected option */
const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === internalValue.value);
});

/**
 * Shows the options list of this selection component.
 */
function showPopup(): void {
  select.value?.showPopup();
}

/** Exposes methods of this component */
defineExpose({ showPopup });
</script>
