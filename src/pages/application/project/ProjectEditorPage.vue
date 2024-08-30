<template>
  <!-- Editor Page -->
  <editor-page
    ref="editorPage"
    :scope="fs.EFSDocumentType.project"
    :components="[
      { key: 'members', label: $t('project.editor.tab.members') },
      { key: 'attributes', label: $t('label.attributes') },
    ]"
    :initialize="initialize"
    :validate="validate"
    :submit="submit"
  >
    <!-- Template: Project Members -->
    <template #tab-members>
      <project-member ref="memberComponent" v-model="member" />
    </template>

    <!-- Template: Customs Attribute -->
    <template #tab-attributes>
      <customs-attribute-table ref="attributesTable" v-model="attributes" />
    </template>
  </editor-page>
</template>

<script setup lang="ts">
import * as fs from 'src/scripts/application/FSDocument';
import * as cm from 'src/scripts/utilities/common';
import * as pj from 'src/scripts/application/Project';
import { ref } from 'vue';
import EditorPage from 'components/application/main/EditorPage.vue';
import CustomsAttributeTable from 'components/application/main/CustomsAttributeTable.vue';
import ProjectMember from 'pages/application/project/ProjectMember.vue';
import { Account, loadAccount } from 'src/scripts/application/Account';

// Get common composables
const cmp = cm.useCommonComposables();

// Reference to editor page
const editorPage = ref<typeof EditorPage | null>(null);
// Reference to member component
const memberComponent = ref<typeof ProjectMember | null>(null);

// Project owner
const member = ref<{
  owner: Account | null;
  manager: Account | null;
  members: pj.TProjectMember[];
}>({
  owner: null,
  manager: null,
  members: [],
});

// Custom attributes
const attributes = ref<fs.TCustomAttribute[]>([]);

async function initialize(mode: cm.EEditorMode, id: string): Promise<void> {
  // Process create mode
  if (mode === cm.EEditorMode.create) {
    member.value.owner = cmp.session.account;
    member.value.manager = cmp.session.account;
  }
  // Process edit mode
  if (mode === cm.EEditorMode.edit) {
    // Get project
    const document = cmp.session.getProject(
      id
    ) as fs.FSDocument<pj.IProjectData>;
    const project = pj.Project.create(document);
    // Apply common values to the form fields
    editorPage.value?.setNameAndDescription(
      project.data.common.name,
      project.data.common.description
    );
    // Initialize project members
    member.value.owner = (await loadAccount(project.getOwner().id)) as Account;
    member.value.manager = (await loadAccount(
      project.getManager().id
    )) as Account;
    member.value.members = [
      ...project.data.members.filter(
        (member) =>
          member.role !== pj.EProjectRole.owner &&
          member.role !== pj.EProjectRole.manager
      ),
    ];
    // Set custom attributes
    attributes.value = [...project.data.attributes];
  }
}

/**
 * Validates the project member component.
 *
 * @return {boolean} Returns `true` if the validation is successful, otherwise `false`.
 */
function validate(): boolean {
  // Validate project member component
  return memberComponent.value?.validate();
}

// TODO add documentation
async function submit(
  mode: cm.EEditorMode,
  name: string,
  description: string | null
): Promise<void | string> {
  // Check editor mode
  if (mode === cm.EEditorMode.create) {
    // Create the project document
    const project = await pj.createProject(
      name,
      description,
      {
        id: member.value.owner?.id,
        name: member.value.owner?.data.common.name,
        role: pj.EProjectRole.owner,
      } as pj.TProjectMember,
      {
        id: member.value.manager?.id,
        name: member.value.manager?.data.common.name,
        role: pj.EProjectRole.manager,
      } as pj.TProjectMember,
      member.value.members,
      attributes.value
    );
    // Add project to session
    cmp.session.addProject(project);
    // Update new project of current account
    cmp.session.currentAccount.data.state.activeProjectId = project.id;
    await cmp.session.currentAccount.update();
    // Call result handler
    cmp.session.invokeResultHandler(project);
    // Return router target
    return '/';
  }
}
</script>
