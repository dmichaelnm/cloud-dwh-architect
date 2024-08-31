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
      <div class="col-7">{{ $t('project.member.ownerMessage') }}</div>
    </div>
    <!-- Project Owner & Manager Row -->
    <div class="row q-col-gutter-x-md">
      <!-- Project Owner Column -->
      <div class="col-3">
        <!-- Project Owner Selection -->
        <account-selection-field
          v-model="internal.owner"
          :label="$t('enum.memberRole.owner')"
          :error="ownerError"
          read-only
        />
      </div>
      <!-- Project Manager Column -->
      <div class="col-3">
        <!-- Project Manager Selection -->
        <account-selection-field
          v-model="internal.manager"
          :label="$t('enum.memberRole.manager')"
          :error="managerError"
          :validator="validateManager"
          :read-only="isManagerReadOnly"
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
              field: (row) => row.name
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
              field: (row) => $t(`enum.memberRole.${row.role}`)
            },
          ]"
          :rows="internal.members"
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
import * as pj from 'src/scripts/application/Project';
import { computed, ref } from 'vue';
import { Account } from 'src/scripts/application/Account';
import { memberRoles } from 'src/scripts/options/memberRoles';
import AccountSelectionField from 'components/application/account/AccountSelectionField.vue';
import AccountSelectionDialog from 'components/application/account/AccountSelectionDialog.vue';
import AppEditableTable from 'components/common/AppEditableTable.vue';
import { TProjectMember } from 'src/scripts/application/Project';
import { getCurrentAccountId } from 'src/scripts/utilities/firebase';

// Get common composables
const cmp = cm.useCommonComposables();
// Member table reference
const memberTable = ref<typeof AppEditableTable | null>(null);

// Project owner error message
const ownerError = ref<string | null>(null);
// Project manager error message
const managerError = ref<string | null>(null);
// Account Selection Dialog visibility
const visibility = ref(false);

/** The type of the model value */
type TModelValue = {
  owner: Account | null;
  manager: Account | null;
  members: TProjectMember[];
};

/** Defines the properties of this component */
const props = defineProps<{
  /** Model value */
  modelValue: TModelValue;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** Update model value event */
  (event: 'update:modelValue', value: TModelValue): void;
}>();

/** Internal model value */
const internal = computed({
  get: () => props.modelValue,
  set: (value: TModelValue) => emit('update:modelValue', value),
});

/** Flag for read only mode of the manager selection */
const isManagerReadOnly = computed(() => {
  return internal.value.owner?.id !== getCurrentAccountId();
});

/**
 * Validates a manager account.
 *
 * @param {Account} account - The account to validate
 * @return {string | null} - The error message if the account is already a member, or null if the account is valid
 */
function validateManager(account: Account): string | null {
  // Check if the account is not already in member array
  if (internal.value.members.some((mbr) => mbr.id === account.id)) {
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
  if (internal.value.owner?.id === account.id) {
    return cmp.i18n.t('project.member.error.notOwner');
  }
  // Check if account is not the project manager
  if (internal.value.manager?.id === account.id) {
    return cmp.i18n.t('project.member.error.notManager');
  }
  // Check if account is not already a member
  if (internal.value.members.some((mbr) => mbr.id === account.id)) {
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
  internal.value.members.push({
    id: account.id,
    name: account.data.common.name,
    role: pj.EProjectRole.visitor,
  });
  // Set new row index
  memberTable.value?.setRowIndex(internal.value.members.length - 1);
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
  if (internal.value.owner === null) {
    // Set error message
    ownerError.value = cmp.i18n.t('error.accountNotSelected');
    result = false;
  }
  // Check manager
  if (internal.value.manager === null) {
    // Set error message
    managerError.value = cmp.i18n.t('error.accountNotSelected');
    result = false;
  }
  // Return the result
  return result;
}

/** Exposed methods */
defineExpose({
  validate,
});
</script>
