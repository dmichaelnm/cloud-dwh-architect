<template>
  <!-- Account Selection Dialog -->
  <account-selection-dialog
    v-model="visibility"
    :validator="validateMember"
    @account-selected="addMember"
  />

  <!-- Main DIV -->
  <div class="q-col-gutter-y-md">
    <!-- Owner & Manager Message Row -->
    <div clasS="row">
      <!-- Owner & Manager Message Column -->
      <div class="col">{{ $t('project.member.ownerMessage') }}</div>
    </div>
    <!-- Project Owner & Manager Row -->
    <div class="row q-col-gutter-x-md">
      <!-- Project Owner Column -->
      <div class="col-3">
        <!-- Project Manager Selection -->
        <account-selection-field
          v-model="owner"
          :label="$t('enum.memberRole.owner')"
          :error="ownerError"
          read-only
        />
      </div>
      <!-- Project Manager Column -->
      <div class="col-3">
        <!-- Project Manager Selection -->
        <account-selection-field
          v-model="manager"
          :label="$t('enum.memberRole.manager')"
          :error="managerError"
          :validator="validateManager"
          :read-only="!canChangeManager"
        />
      </div>
    </div>
    <!-- Member Table Row -->
    <div class="row">
      <!-- Member Table Column -->
      <div class="col">
        <!-- Editable Table -->
        <app-editable-table
          ref="memberTable"
          :columns="[
            // Name
            {
              name: 'name',
              align: 'left',
              label: $t('project.member.header.name'),
              headerStyle: 'width: 300px',
              input: cm.EInputType.none,
              sortable: true,
              field: (row) => row.name,
            },
            // Role
            {
              name: 'role',
              align: 'left',
              label: $t('project.member.header.role'),
              headerStyle: 'width: 300px',
              input: cm.EInputType.select,
              options: memberRoles,
              translate: true,
              field: (row) => $t(`enum.memberRole.${row.role}`),
            },
          ]"
          :rows="members"
          :message="$t('project.member.tableMessage')"
          :handler-add="() => (visibility = true)"
          :tooltip-add="$t('project.member.tooltip.add')"
          :tooltip-remove="$t('project.member.tooltip.remove')"
          deletable
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as cm from 'src/scripts/utilities/common';
import { onBeforeMount, ref } from 'vue';
import { Account } from 'src/scripts/application/Account';
import { EProjectRole, TProjectMember } from 'src/scripts/application/Project';
import { memberRoles } from 'src/scripts/options/memberRoles';
import AccountSelectionField from 'components/application/account/AccountSelectionField.vue';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';
import AppEditableTable from 'components/common/AppEditableTable.vue';

// Get common composables
const cmp = cm.useCommonComposables();
// Member table reference
const memberTable = ref<typeof AppEditableTable | null>(null);

// Project owner account & error message
const owner = ref<Account | null>(null);
const ownerError = ref<string | null>(null);
// Project manager account & error message
const manager = ref<Account | null>(null);
const managerError = ref<string | null>(null);
// Array of project members
const members = ref<TProjectMember[]>([]);
// Flag for changing the manager
const canChangeManager = ref(false);
// Account Selection Dialog visibility
const visibility = ref(false);
// Get the current mode
const mode = cmp.route.params.mode as cm.EEditorMode;

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  if (mode === cm.EEditorMode.create) {
    // It's a new project, apply the current user as owner and manager
    owner.value = cmp.session.account;
    manager.value = cmp.session.account;
    canChangeManager.value = true;
  }
});

/**
 * Validates a manager account.
 *
 * @param {Account} account - The account to validate
 * @return {string | null} - The error message if the account is already a member, or null if the account is valid
 */
function validateManager(account: Account): string | null {
  // Check if the account is not already in member array
  if (members.value.some((mbr) => mbr.id === account.id)) {
    // Found account in member array
    return cmp.i18n.t('project.member.error.alreadyMember');
  }
  // Account is okay
  return null;
}

/**
 * Validates a member account for a project.
 *
 * @param {Account} account - The account to validate.
 * @returns {string | null} - An error message if the account is invalid, or null if the account is valid.
 */
function validateMember(account: Account): string | null {
  // Check if account is not the project owner
  if (owner.value?.id === account.id) {
    return cmp.i18n.t('project.member.error.notOwner');
  }
  // Check if account is not the project manager
  if (manager.value?.id === account.id) {
    return cmp.i18n.t('project.member.error.notManager');
  }
  // Check if account is not already a member
  if (members.value.some((mbr) => mbr.id === account.id)) {
    return cmp.i18n.t('project.member.error.alreadyMember');
  }
  // Account is okay
  return null;
}

/**
 * Adds a member to the array of members.
 *
 * @param {Account} account - The account of the member to be added.
 */
function addMember(account: Account): void {
  // Add new member to array
  members.value.push({
    id: account.id,
    name: account.data.common.name,
    role: EProjectRole.visitor,
  });
  // Set new row index
  memberTable.value?.setRowIndex(members.value.length - 1);
}

/**
 * Retrieves the owner of the project.
 *
 * @return {TProjectMember} The project owner.
 */
function getOwner(): TProjectMember {
  return {
    id: owner.value?.id as string,
    name: owner.value?.data.common.name as string,
    role: EProjectRole.owner,
  };
}

/**
 * Returns the manager for the project.
 *
 * @return {TProjectMember} The project manager.
 */
function getManager(): TProjectMember {
  return {
    id: manager.value?.id as string,
    name: manager.value?.data.common.name as string,
    role: EProjectRole.manager,
  };
}

/**
 * Retrieves the members of a project.
 *
 * @return {TProjectMember[]} An array of project members.
 */
function getProjectMembers(): TProjectMember[] {
  return members.value as TProjectMember[];
}

/**
 * Validates the values of the owner and manager properties.
 *
 * @return {boolean} - Returns true if both owner and manager values are not null, false otherwise.
 */
function validate(): boolean {
  // Validation result
  let result = true;
  // Check owner
  if (owner.value === null) {
    // Set error message
    ownerError.value = cmp.i18n.t('error.accountNotSelected');
    result = false;
  }
  // Check manager
  if (manager.value === null) {
    // Set error message
    managerError.value = cmp.i18n.t('error.accountNotSelected');
    result = false;
  }
  // Return the result
  return result;
}

/** Exposed methods */
defineExpose({ getOwner, getManager, getProjectMembers, validate });
</script>
