<template>
  <!-- Dialog Component -->
  <q-dialog
    ref="dialog"
    :model-value="internalValue"
    persistent
    @update:modelValue="(value) => (internalValue = value)"
  >
    <!-- Dialog Frame -->
    <div class="message-dialog-frame">
      <!-- Title & Marker Row -->
      <div class="row message-dialog-row">
        <!-- Title & Marker Column -->
        <div class="col message-dialog-title">
          <!-- Title Row -->
          <div class="row">
            <!-- Title Column -->
            <div class="col message-dialog-title">{{ options.title }}</div>
          </div>
          <!-- Marker Row -->
          <div class="row">
            <!-- Marker Column -->
            <div class="col">
              <!-- Marker Bar -->
              <q-linear-progress :color="options.color" :value="1" size="3px" />
            </div>
          </div>
        </div>
      </div>
      <!-- Message Row -->
      <div class="row message-dialog-row">
        <!-- Message Column -->
        <div class="col">{{ options.message }}</div>
      </div>
      <!-- Details Row -->
      <div class="row message-dialog-row" v-if="options.details !== null">
        <!-- Details Column -->
        <div class="col message-dialog-details">
          <q-scroll-area :style="{ height: '50px' }">
            {{ options.details }}
          </q-scroll-area>
        </div>
      </div>
      <!-- Buttons Row -->
      <div class="row message-dialog-row">
        <!-- Buttons Column -->
        <div class="col text-right">
          <!-- Buttons -->
          <app-button
            v-for="btn in options.buttons"
            :key="btn.value"
            size="sm"
            :appearance="btn.appearance"
            :label="$t(btn.label)"
            :color="btn.color"
            :icon="btn.icon"
            style="margin-left: 8px"
            @click="closeDialog(btn.value)"
          />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Message Dialog Frame
.message-dialog-frame {
  width: 600px;
  max-width: 600px;
  padding: 16px;
  border-radius: 8px;
  background-color: $light-background-frame;
  box-shadow: 4px 4px 8px 0 $shadow;
}

// Message Dialog Frame (Dark Mode)
.body--dark .message-dialog-frame {
  background-color: $dark-background-frame;
}

// Message Dialog Row
.message-dialog-row {
  padding: 16px;
}

// Message Dialog Title
.message-dialog-title {
  font-size: 12pt;
  font-weight: bold;
  color: $light-text-highlight;
}

// Message Dialog Title (Dark Mode)
.body--dark .message-dialog-title {
  color: $dark-text-highlight;
}

// Message Dialog Details
.message-dialog-details {
  font-size: 9pt;
  color: $light-text-hint;
}

// Message Dialog Details (Dark Mode)
.body--dark .message-dialog-details {
  color: $dark-text-hint;
}

</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TMessageDialogOptions } from 'src/scripts/utilities/messageDialog';
import AppButton from 'components/common/AppButton.vue';
import { QDialog } from 'quasar';

// Dialog reference
const dialog = ref<QDialog | null>(null);

/** Defines the properties of this component */
const props = defineProps<{
  /** The model value */
  modelValue: boolean;
  /** The message dialog options */
  options: TMessageDialogOptions;
}>();

/** Defines the event that can be emitted by this component */
const emit = defineEmits<{
  /** Update model value */
  (event: 'update:modelValue', value: boolean): void;
  /** Dialog close event */
  (event: 'dialogClosed', value: string): void;
}>();

/** Internal model value */
const internalValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

/**
 * Closes the dialog and emits the 'dialogClosed' event.
 *
 * @param {string} value - The value to be emitted with the 'dialogClosed' event.
 */
function closeDialog(value: string): void {
  // Close the dialog
  dialog.value?.hide();
  // Call the handler function if specified
  if (props.options.handler !== null) {
    props.options.handler(value);
  }
  // Emit the close event
  emit('dialogClosed', value);
}
</script>
