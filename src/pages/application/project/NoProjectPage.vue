<template>
  <!-- Page -->
  <q-page class="flex flex-center">
    <!-- Main Div -->
    <div style="width: 500px" class="q-col-gutter-y-md">
      <!-- Message Row -->
      <div class="row">
        <!-- Message Column -->
        <div class="col text-center">
          {{ $t('project.message.firstProject') }}
        </div>
      </div>
      <!-- Button Row -->
      <div class="row">
        <!-- Button Column -->
        <div class="col text-center">
          <!-- New Project Button -->
          <app-button
            :label="$t('project.button.create')"
            @click="openNewProjectEditor"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AppButton from 'components/common/AppButton.vue';
import { EEditorMode, useOpenEditor } from 'src/scripts/utilities/common';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';

// Get open editor composable
const openEditor = useOpenEditor();

/**
 * Opens the new project editor page.
 */
function openNewProjectEditor(): void {
  openEditor(EFSDocumentType.project, EEditorMode.create, 'new');
}
</script>
