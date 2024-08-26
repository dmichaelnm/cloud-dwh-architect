<template>
  <!-- Editor Page -->
  <editor-page
    ref="editorPage"
    :scope="fs.EFSDocumentType.project"
    :components="[
      { key: 'members', label: $t('project.editor.tab.members') },
      { key: 'attributes', label: $t('label.attributes') },
    ]"
    :submit="submit"
  >
    <!-- Template: Project Members -->
    <template #tab-members>
      <project-member ref="memberComponent" />
    </template>

    <!-- Template: Customs Attribute -->
    <template #tab-attributes>
      <customs-attribute-table ref="attributesTable" />
    </template>
  </editor-page>
</template>

<script setup lang="ts">
import * as fs from 'src/scripts/application/FSDocument';
import * as cm from 'src/scripts/utilities/common';
import { ref } from 'vue';
import { createProject, TProjectMember } from 'src/scripts/application/Project';
import EditorPage from 'components/application/main/EditorPage.vue';
import CustomsAttributeTable from 'components/application/main/CustomsAttributeTable.vue';
import ProjectMember from 'pages/application/project/ProjectMember.vue';

// Get common composables
const cmp = cm.useCommonComposables();

// Reference to editor page
const editorPage = ref<typeof EditorPage | null>(null);
// Reference to member component
const memberComponent = ref<typeof ProjectMember | null>(null);
// Reference to the custom attributes table
const attributesTable = ref<typeof CustomsAttributeTable | null>(null);

async function submit(
  mode: cm.EEditorMode,
  name: string,
  description: string | null
): Promise<void | string> {
  // Check editor mode
  if (mode === cm.EEditorMode.create) {
    // Create the project document
    const project = await createProject(
      name,
      description,
      memberComponent.value?.getOwner() as TProjectMember,
      memberComponent.value?.getManager() as TProjectMember,
      memberComponent.value?.getProjectMembers() as TProjectMember[],
      attributesTable.value?.getAttributes() as fs.TCustomAttribute[]
    );
    // Add project to session
    cmp.session.addProject(project);
    // Update new project of current account
    cmp.session.currentAccount.data.state.activeProjectId = project.id;
    await cmp.session.currentAccount.update();
    // Return router target
    return '/';
  }
}
</script>
