<template>
  <!-- Editor Page -->
  <editor-page
    :scope="EFSDocumentType.project"
    :components="[
      { key: 'members', label: $t('project.editor.tab.members') },
      { key: 'attributes', label: $t('label.attributes') },
    ]"
    :submit="submit"
  >
  </editor-page>
</template>

<script setup lang="ts">
import EditorPage from 'components/application/main/EditorPage.vue';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import { EEditorMode } from 'src/scripts/utilities/common';

async function submit(
  mode: EEditorMode,
  name: string,
  description: string | null
): Promise<void> {
  console.log(mode, name, description);
}
</script>
