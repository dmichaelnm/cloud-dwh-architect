<template>
  <!-- Page -->
  <q-page class="overview-page">
    <!-- Overview Frame -->
    <div class="overview-frame q-col-gutter-y-md">
      <!-- Title & Button Row -->
      <div class="row items-center">
        <!-- Title Column -->
        <div class="col overview-title">
          {{ $t(`${scope}.overview.title`) }}
        </div>
        <!-- Button Column -->
        <div class="col text-right">
          <!-- Close Button -->
          <app-button
            :label="$t('button.close')"
            color="sbutton"
            @click="routeTo('/', false)"
          />
        </div>
      </div>
      <!-- Message Row -->
      <div class="row">
        <!-- Message Column -->
        <div class="col-7">{{ $t(`${scope}.overview.message`) }}</div>
      </div>
      <!-- Table Row -->
      <div class="row">
        <!-- Table Column -->
        <div class="col">
          <!-- Table -->
          <app-editable-table
            :columns="tableColumn"
            :rows="cmp.session.projects"
            paginate
          >
            <!-- Template: Actions -->
            <template #body-cell-actions="{ props }">
              <!-- Table Cell -->
              <q-td :props="props">
                <!-- Edit Button -->
                <app-button
                  v-if="permission(EEditorMode.edit, props.row)"
                  appearance="icon"
                  icon="edit"
                  size="xs"
                  :tooltip="$t(`${scope}.overview.tooltip.edit`)"
                  @click="openEditor(scope, EEditorMode.edit, props.row.id)"
                />
                <!-- Delete Button -->
                <app-button
                  v-if="permission(EEditorMode.delete, props.row)"
                  appearance="icon"
                  icon="delete"
                  size="xs"
                  :tooltip="$t(`${scope}.overview.tooltip.delete`)"
                />
                <!-- View Button -->
                <app-button
                  v-if="permission(EEditorMode.view, props.row)"
                  appearance="icon"
                  icon="visibility"
                  size="xs"
                  :tooltip="$t(`${scope}.overview.tooltip.view`)"
                  @click="openEditor(scope, EEditorMode.view, props.row.id)"
                />
              </q-td>
            </template>
            <!-- Template: Name Column -->
            <template #body-cell-name="{ props }">
              <!-- Table Cell -->
              <q-td :props="props">
                <!-- Name -->
                <div class="overview-column-name">
                  {{ props.row.data.common.name }}
                </div>
                <!-- Description -->
                <div class="overview-column-description">
                  {{ props.row.data.common.description }}
                </div>
              </q-td>
            </template>
            <!-- Template: Custom columns -->
            <template
              v-for="col in columns"
              :key="col.name"
              v-slot:[getSlotName(col)]="{ props }"
            >
              <!-- Custom Column Slot -->
              <slot :name="getSlotName(col) as any" :props="props">
                <!-- Custom Column Cell -->
                <q-td :props="props">
                  <!-- Cell Value -->
                  <div>{{ props.value }}</div>
                </q-td>
              </slot>
            </template>
            <!-- Template: Created By At -->
            <template #body-cell-created="{ props }">
              <!-- Table Cell -->
              <q-td :props="props">
                <!-- Created By -->
                <div>{{ props.row.data.meta.created.by }}</div>
                <!-- Created At -->
                <div>{{ formatTimestamp(props.row.data.meta.created.at) }}</div>
              </q-td>
            </template>
            <!-- Template: Altered By At -->
            <template #body-cell-altered="{ props }">
              <!-- Table Cell -->
              <q-td :props="props">
                <!-- Created By -->
                <div>{{ props.row.data.meta.altered.by }}</div>
                <!-- Created At -->
                <div>{{ formatTimestamp(props.row.data.meta.altered.at) }}</div>
              </q-td>
            </template>
          </app-editable-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Overview Page
.overview-page {
  padding: 48px;
}

// Overview Frame
.overview-frame {
  padding: 24px;
  background-color: $light-background-frame;
  border-radius: 8px;
  box-shadow: 4px 4px 8px 0 $shadow;
}

// Overview Frame (Dark Mode)
.body--dark .overview-frame {
  background-color: $dark-background-frame;
}

// Overview Title
.overview-title {
  font-size: 14pt;
  font-variant: small-caps;
}

// Overview Column Name
.overview-column-name {
  color: $light-text-highlight;
}

// Overview Column Name (Dark Mode)
.body--dark .overview-column-name {
  color: $dark-text-highlight;
}

// Overview Column Description
.overview-column-description {
  color: $light-text-hint;
  font-size: 9pt;
}

// Overview Column Description (Dark Mode)
.body--dark .overview-column-description {
  color: $dark-text-hint;
}
</style>

<script setup lang="ts">
import { EFSDocumentType } from 'src/scripts/application/FSDocument';
import AppButton from 'components/common/AppButton.vue';
import * as cm from 'src/scripts/utilities/common';
import { EEditorMode, TTableColumn } from 'src/scripts/utilities/common';
import AppEditableTable from 'components/common/AppEditableTable.vue';
import { computed } from 'vue';

// Get common composables
const cmp = cm.useCommonComposables();
// Get route to composable
const routeTo = cm.useRouteTo();
// Get format timestamp composable
const formatTimestamp = cm.useFormatTimestamp();
// Get open editor composable
const openEditor = cm.useOpenEditor();

/** Defines the properties of this component */
const props = defineProps<{
  /** Scope of the overview */
  scope: EFSDocumentType;
  /** Custom columns */
  columns: cm.TTableColumn[];
  /** Permissions handler function */
  permission: (mode: EEditorMode, row: any) => boolean;
}>();

/** Table column definitions of the overview table */
const tableColumn = computed<cm.TTableColumn[]>(() => {
  // Columns array
  const cols: cm.TTableColumn[] = [];
  // Add action column
  cols.push({
    name: 'actions',
    label: '',
    align: 'left',
    sortable: false,
    headerStyle: 'width: 100px',
    field: '',
  });
  // Add name and description column
  cols.push({
    name: 'name',
    label: cmp.i18n.t(`${props.scope}.overview.header.name`),
    align: 'left',
    sortable: true,
    headerStyle: 'width: 600px',
    field: (row) => row.data.common.name,
  });
  // Add custom columns
  cols.push(...props.columns);
  // Add created by/at column
  cols.push({
    name: 'created',
    label: cmp.i18n.t('label.createdByAt'),
    align: 'left',
    sortable: false,
    headerStyle: 'width: 200px',
    field: (row) => row.data.meta.created.by,
  });
  // Add altered by/at column
  cols.push({
    name: 'altered',
    label: cmp.i18n.t('label.alteredByAt'),
    align: 'left',
    sortable: false,
    headerStyle: 'width: 200px',
    field: (row) => row.data.meta.altered.by,
  });
  // Return columns array
  return cols;
});

/**
 * Returns the name of the slot for a given table column.
 *
 * @param column - The table column for which to get the slot name.
 * @returns The slot name for the column, in the format "body-cell-{name}".
 */
function getSlotName(column: TTableColumn): `body-cell-${string}` {
  return `body-cell-${column.name}` as const;
}
</script>
