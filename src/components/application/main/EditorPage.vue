<template>
  <!-- Page -->
  <q-page class="editor-page">
    <!-- Form -->
    <q-form greedy @submit="submitForm">
      <!-- Editor Frame -->
      <div class="editor-frame q-col-gutter-y-md">
        <!-- Title & Button Row -->
        <div class="row items-center">
          <!-- Title Column -->
          <div class="col editor-title">
            {{ $t(`${scope}.editor.${mode}.title`) }}
          </div>
          <!-- Button Column -->
          <div class="col text-right q-gutter-x-md">
            <!-- Save Button -->
            <app-button
              :label="$t('button.save')"
              type="submit"
              v-if="!readOnly"
            />
            <!-- Cancel Button -->
            <app-button
              :label="readOnly ? $t('button.close') : $t('button.cancel')"
              color="sbutton"
              @click="closeEditor"
            />
          </div>
        </div>
        <!-- Message Row -->
        <div class="row">
          <!-- Message Column -->
          <div class="col-7">
            {{ $t(`${scope}.editor.${mode}.message`) }}
          </div>
        </div>
        <!-- Name & Description Row -->
        <div class="row q-col-gutter-x-md">
          <!-- Name Column -->
          <div class="col-3">
            <!-- Name Input -->
            <app-input
              v-model="name"
              :label="$t('label.name')"
              :read-only="readOnly"
              mandatory
              auto-focus
            />
          </div>
        </div>
        <!-- Description Row -->
        <div class="row">
          <!-- Description Column -->
          <div class="col-7">
            <!-- Name Input -->
            <app-input
              v-model="description"
              :label="$t('label.description')"
              :type="'textarea'"
              :read-only="readOnly"
            />
          </div>
        </div>
        <!-- Editor Content Row -->
        <div class="row">
          <!-- Editor Content Column -->
          <div class="col">
            <!-- Tabs -->
            <q-tabs
              v-model="tab"
              align="left"
              no-caps
              dense
              active-color="primary"
            >
              <!-- Tab -->
              <q-tab
                v-for="cmp in components"
                :key="cmp.key"
                :name="cmp.key"
                :label="cmp.label"
              />
            </q-tabs>
            <!-- Tab Panels -->
            <q-tab-panels v-model="tab" keep-alive>
              <!-- Tab Panel -->
              <q-tab-panel
                v-for="cmp in components"
                :key="cmp.key"
                :name="cmp.key"
              >
                <!-- Slot -->
                <slot :name="`tab-${cmp.key}`" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Editor Page
.editor-page {
  padding: 48px;
}

// Editor Frame
.editor-frame {
  padding: 24px;
  background-color: $light-background-frame;
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0 $shadow;
}

// Editor Frame (Dark Mode)
.body--dark .editor-frame {
  background-color: $dark-background-frame;
}

// Editor Title
.editor-title {
  font-size: 14pt;
  font-variant: small-caps;
}
</style>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import { onMounted, ref } from 'vue';
import { useRunTask } from 'src/scripts/utilities/runTask';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import AppButton from 'components/common/AppButton.vue';
import AppInput from 'components/common/AppInput.vue';

// Get common composables
const cmp = cm.useCommonComposables();
// Get run task composable
const runTask = useRunTask();

// Get the editor mode
const mode = cmp.route.params.mode as cm.EEditorMode;
// Get the ID of the item to edited
const itemId = cmp.route.params.id as string;

/** Defines the properties of this component */
const props = defineProps<{
  /** The scope of the editor */
  scope: EFSDocumentType;
  /** Component keys */
  components: cm.TTabDefinition[];
  /** Initialization handler function */
  initialize?: (mode: cm.EEditorMode, id: string) => Promise<void>;
  /** Validate handler function */
  validate?: () => boolean;
  /** Submit handler function */
  submit: (
    mode: cm.EEditorMode,
    name: string,
    description: string | null
  ) => Promise<void | string>;
  /** Read only flag */
  readOnly: boolean;
}>();

// Current tab name
const tab = ref(props.components[0].key);

// Name
const name = ref('');
// Description
const description = ref<string | null>(null);

/** Lifecycle method that is called before this component is mounted */
onMounted(async () => {
  await runTask(async () => {
    // Check if initialization handler is specified
    if (props.initialize) {
      // Call the handler
      await props.initialize(mode, itemId);
    }
  });
});

/**
 * Closes the editor.
 */
function closeEditor(target: string | void): void {
  // Reset editor lock
  cmp.session.editorLock = false;
  if (typeof target === 'string') {
    // Route to specific target
    cmp.router.push({ path: target });
  } else {
    // Go back
    cmp.router.back();
  }
}

/**
 * Submits the form.
 *
 * This method is used to submit the form of the editor page.
 * It calls the validation function if specified and then starts the submit process.
 * If the validation passes, it runs the submit handler function and closes the editor.
 */
function submitForm(): void {
  // Call validation if specified
  const validated = props.validate ? props.validate() : true;
  if (validated) {
    // Start the submit process
    runTask(async () => {
      // Run the submit handler function
      const target = await props.submit(mode, name.value, description.value);
      // Close the editor
      closeEditor(target);
    });
  }
}

/**
 * Sets the name and description properties.
 *
 * @param {string} aName - The name to set.
 * @param {string|null} aDescription - The description to set. Can be a string or null.
 */
function setNameAndDescription(
  aName: string,
  aDescription: string | null
): void {
  name.value = aName;
  description.value = aDescription;
}

/** Exposed methods */
defineExpose({ setNameAndDescription });
</script>
