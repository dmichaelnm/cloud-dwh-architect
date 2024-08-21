<template>
  <!-- Editor Page -->
  <editor-page
    ref="editorPage"
    :scope="EFSDocumentType.project"
    :components="[
      { key: 'members', label: $t('project.editor.tab.members') },
      { key: 'attributes', label: $t('label.attributes') },
    ]"
    :submit="submit"
  >
    <!-- Template: Project Members -->
    <template #tab-members>
      <project-member :mode="editorPage?.mode" />
    </template>
  </editor-page>
</template>

<script setup lang="ts">
import EditorPage from 'components/application/main/EditorPage.vue';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import { EEditorMode } from 'src/scripts/utilities/common';
import ProjectMember from 'pages/application/project/ProjectMember.vue';
import { ref } from 'vue';

// Reference to editor page
const editorPage = ref<typeof EditorPage | null>(null);

async function submit(
  mode: EEditorMode,
  name: string,
  description: string | null
): Promise<void> {
  console.log(mode, name, description);
}
</script>
