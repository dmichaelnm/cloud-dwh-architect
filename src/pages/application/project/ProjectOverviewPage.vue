<template>
  <!-- Overview Page -->
  <overview-page
    :scope="fs.EFSDocumentType.project"
    :columns="[
      {
        name: 'owner',
        label: cmp.i18n.t('project.overview.header.owner'),
        align: 'left',
        headerStyle: 'width: 150px',
        field: (row) => getOwnerName(row),
      },
      {
        name: 'manager',
        label: cmp.i18n.t('project.overview.header.manager'),
        align: 'left',
        headerStyle: 'width: 150px',
        field: (row) => getManagerName(row),
      },
      {
        name: 'userRole',
        label: cmp.i18n.t('project.overview.header.userRole'),
        align: 'left',
        headerStyle: 'width: 150px',
        field: (row) => $t(`enum.memberRole.${getUserRole(row)}`),
      },
      {
        name: 'memberCount',
        label: cmp.i18n.t('project.overview.header.memberCount'),
        align: 'center',
        headerStyle: 'width: 150px',
        field: (row) => getMemberCount(row),
      },
    ]"
    :permission="getPermission"
    :delete="deleteProject"
  >
  </overview-page>
</template>

<script setup lang="ts">
import OverviewPage from 'components/application/main/OverviewPage.vue';
import * as fs from 'src/scripts/application/FSDocument';
import * as cm from 'src/scripts/utilities/common';
import * as pj from 'src/scripts/application/Project';

// Get common composables
const cmp = cm.useCommonComposables();
// Get route to composable
const routeTo = cm.useRouteTo();

/**
 * Retrieves the name of the owner of the given project row.
 *
 * @param {any} row - The data row containing project information.
 * @return {string} The name of the owner.
 */
function getOwnerName(row: any): string {
  // Get project
  const project = pj.Project.create(row as fs.FSDocument<pj.IProjectData>);
  // Return the name of the owner
  return project.getOwner().name;
}

/**
 * Retrieves the name of the manager for a given row.
 *
 * @param {any} row - The input data representing a document.
 * @return {string} The name of the manager.
 */
function getManagerName(row: any): string {
  // Get project
  const project = pj.Project.create(row as fs.FSDocument<pj.IProjectData>);
  // Return the name of the owner
  return project.getManager().name;
}

/**
 * Returns the role of the user for a project.
 *
 * @param {any} row - The data row containing project information.
 * @returns {pj.EProjectRole} - The role of the user for the project.
 */
function getUserRole(row: any): pj.EProjectRole {
  // Get project
  const project = pj.Project.create(row as fs.FSDocument<pj.IProjectData>);
  // Return the name of the owner
  return project.getUserRole();
}

/**
 * Returns the count of distinct members in a given project.
 *
 * @param {any} row - The data row containing project information.
 * @return {number} - The count of distinct members.
 */
function getMemberCount(row: any): number {
  // Get project
  const project = pj.Project.create(row as fs.FSDocument<pj.IProjectData>);
  // Get distinct member count
  return new Set(project.data.members.map((member) => member.id)).size;
}

/**
 * Retrieves the permission for a given mode and project row.
 *
 * @param {EEditorMode} mode - The mode for which to check permission. Possible values: "edit", "delete", "view".
 * @param {any} row - The project row containing the necessary information to check permission.
 *
 * @return {boolean} - Returns `true` if the user has permission for the specified mode and project row, `false` otherwise.
 */
function getPermission(mode: cm.EEditorMode, row: any): boolean {
  // Get project
  const project = pj.Project.create(row as fs.FSDocument<pj.IProjectData>);
  // Check for permission to edit a project
  if (mode === cm.EEditorMode.edit) {
    // To edit a project, the user must be the owner or the manager
    return project.hasRole(pj.EProjectRole.owner, pj.EProjectRole.manager);
  }
  // Check for permission to delete a project
  if (mode === cm.EEditorMode.delete) {
    // Only the owner can delete a project
    return project.hasRole(pj.EProjectRole.owner);
  }
  // Check for permission to view a project
  if (mode === cm.EEditorMode.view) {
    // All roles except owner and manager can view a project
    return !project.hasRole(pj.EProjectRole.owner, pj.EProjectRole.manager);
  }
  // No permission
  return false;
}

/**
 * Deletes the specified project and all its dependent documents
 * from Firestore, and removes the project from the current session's project list.
 *
 * @param {fs.FSDocument<pj.IProjectData>} project - The project document to be deleted.
 * @return {Promise<void>} A promise that resolves when the project has been deleted.
 */
async function deleteProject(
  project: fs.FSDocument<pj.IProjectData>
): Promise<void> {
  // Delete project and all dependent documents from Firestore
  await pj.deleteProject(project);
  // Remove project from project list in session
  cmp.session.removeProject(project.id);
  // If no projects left, route to first project page
  if (cmp.session.projects.length === 0) {
    await routeTo('/project/first');
  }
}
</script>
