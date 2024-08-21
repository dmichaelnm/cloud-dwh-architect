<template>
  <!-- Dialog -->
  <q-dialog
    :model-value="visibility"
    persistent
    @before-show="emit('beforeShow')"
  >
    <!-- Dialog Frame -->
    <div
      class="dialog-frame"
      :style="{ width: width ? `${width}px` : '600px' }"
    >
      <!-- Form -->
      <q-form greedy @submit="submitForm">
        <!-- Title Row -->
        <div class="row dialog-row dialog-title" v-if="title">
          <!-- Title Column -->
          <div class="col">{{ title }}</div>
        </div>

        <!-- Message Row -->
        <div class="row dialog-row" v-if="message">
          <!-- Message Column -->
          <div class="col">{{ message }}</div>
        </div>

        <!-- Content Row -->
        <div class="row dialog-row">
          <!-- Content Column -->
          <div class="col">
            <!-- Default Slot -->
            <slot />
          </div>
        </div>

        <!-- Button Row -->
        <div class="row dialog-row">
          <!-- Button Column -->
          <div class="col text-right">
            <!-- Okay Button -->
            <app-button
              :label="$t('button.okay')"
              type="submit"
              :style="{ marginRight: '16px' }"
            />
            <!-- Cancel Button -->
            <app-button
              :label="$t('button.cancel')"
              color="sbutton"
              @click="visibility = false"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Dialog Frame
.dialog-frame {
  background-color: $light-background-frame;
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0 $shadow;
  padding: 16px;
}

// Dialog Frame (Dark Mode)
.body--dark .dialog-frame {
  background-color: $dark-background-frame;
}

// Dialog Title
.dialog-title {
  font-size: 16pt;
  font-variant: small-caps;
}

// Dialog Message
.dialog-row {
  padding: 16px;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import AppButton from 'components/common/AppButton.vue';
import { useRunTask } from 'src/scripts/utilities/runTask';

// Get run task composable */
const runTask = useRunTask();

/** Defines the properties of this component */
const props = defineProps<{
  /** Model value */
  modelValue: boolean;
  /** Width of the dialog */
  width?: number;
  /** Optional Title Dialog */
  title?: string;
  /** Optional Title Message */
  message?: string;
  /** The submit handler function */
  submit: () => Promise<boolean>;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** Update model value event */
  (event: 'update:modelValue', value: boolean): void;
  /** Before dialog show event */
  (event: 'beforeShow'): void;
}>();

/** The visibility of the dialog */
const visibility = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

/**
 * This method is called when the user submits the dialogs form.
 */
function submitForm(): void {
  // Run the submit task
  runTask(async () => {
    // Call the handler
    visibility.value = !(await props.submit());
  });
}
</script>
