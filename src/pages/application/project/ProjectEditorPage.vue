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
      <project-member />
    </template>

    <!-- Template: Customs Attribute -->
    <template #tab-attributes>
      <customs-attribute-table />
    </template>
  </editor-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import * as cm from 'src/scripts/utilities/common';
import EditorPage from 'components/application/main/EditorPage.vue';
import CustomsAttributeTable from 'components/application/main/CustomsAttributeTable.vue';
import ProjectMember from 'pages/application/project/ProjectMember.vue';

// Reference to editor page
const editorPage = ref<typeof EditorPage | null>(null);

async function submit(
  mode: cm.EEditorMode,
  name: string,
  description: string | null
): Promise<void> {
  console.log(mode, name, description);
}
</script>
