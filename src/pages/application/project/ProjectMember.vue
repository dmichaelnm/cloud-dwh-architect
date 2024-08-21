<template>
  <!-- Account Selection Dialog -->
  <account-selection-dialog
    v-model="visibility"
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
          read-only
        />
      </div>
      <!-- Project Manager Column -->
      <div class="col-3">
        <!-- Project Manager Selection -->
        <account-selection-field
          v-model="manager"
          :label="$t('enum.memberRole.manager')"
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
              field: (row) => row.role,
            },
          ]"
          :rows="members"
          :message="$t('project.member.tableMessage')"
          :handler-add="() => (visibility = true)"
          deletable
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppEditableTable from 'components/common/AppEditableTable.vue';
import { EProjectRole, TProjectMember } from 'src/scripts/application/Project';
import { onBeforeMount, ref } from 'vue';
import * as cm from 'src/scripts/utilities/common';
import AccountSelectionField from 'components/application/account/AccountSelectionField.vue';
import { Account } from 'src/scripts/application/Account';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';

// Get common composables
const cmp = cm.useCommonComposables();

// Project owner account
const owner = ref<Account | null>(null);
// Project manager account
const manager = ref<Account | null>(null);
// Array of project members
const members = ref<TProjectMember[]>([]);
// Flag for changing the manager
const canChangeManager = ref(false);
// Account Selection Dialog visibility
const visibility = ref(false);

/** Lifecycle method that is called before this component is mounted */
onBeforeMount(() => {
  // Get the current mode
  const mode = cmp.session.editor?.mode;
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
    return cmp.i18n.t('project.editor.member.error.alreadyMember');
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
}
</script>
