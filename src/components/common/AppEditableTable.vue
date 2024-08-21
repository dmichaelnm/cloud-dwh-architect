<!--suppress VueUnrecognizedSlot -->
<template>
  <!-- Main DIV -->
  <div class="q-col-gutter-y-md">
    <!-- Message Row -->
    <div class="row" v-if="message">
      <!-- Message Column -->
      <div class="col-9">{{ message }}</div>
    </div>
    <!-- Empty Table Message Row -->
    <div class="row" v-if="rows.length === 0 && messageEmpty">
      <!-- Empty Table Message Column -->
      <div class="col-6 empty-message">{{ messageEmpty }}</div>
    </div>
    <!-- Table Row -->
    <div class="row" v-if="rows.length > 0">
      <!-- Table Column -->
      <div class="col">
        <!-- Table -->
        <q-table
          :rows="rows"
          :columns="tableColumns"
          :rows-per-page-label="$t('label.rowsPerPage')"
          :pagination-label="(f, e, t) => f + ' - ' + e + ' / ' + t"
          :pagination="{
            rowsPerPage: rowsPerPage ? rowsPerPage : 10,
            sortBy: sortBy,
            descending: sortDescending,
          }"
          :hide-pagination="!paginate"
          flat
          dense
          wrap-cells
        >
          <!-- Template: Header Column -->
          <template #header-cell="props">
            <!-- Table Header Cell -->
            <q-th :props="props">
              <!-- Header Label -->
              <span class="table-header">{{ props.col.label }}</span>
            </q-th>
          </template>

          <!-- Template: Selection Column -->
          <template #body-cell-selection="props">
            <!-- Selection Table Cell -->
            <q-td :props="props">
              <!-- Selection Radio Button -->
              <q-radio v-model="rowIndex" :val="props.rowIndex" size="xs" />
            </q-td>
          </template>

          <!-- Template: Custom Columns -->
          <template
            v-for="col in columns"
            :key="col.name"
            v-slot:[getSlotName(col)]="props"
          >
            <!-- Custom Column Slot -->
            <slot :name="getSlotName(col) as any" :props="props">
              <!-- Custom Column Cell -->
              <q-td :props="props">
                <!-- Custom Column Value -->
                <div
                  v-if="getInputType(col, props.row) !== EInputType.checkbox"
                >
                  {{ props.value }}
                </div>
                <!-- Custom Column Checkbox -->
                <div
                  v-if="getInputType(col, props.row) === EInputType.checkbox"
                >
                  <!-- Editable Checkbox -->
                  <q-checkbox
                    v-model="props.row[col.name]"
                    dense
                    v-if="!readOnly"
                  />
                  <!-- Readonly Checkbox -->
                  <q-icon name="check" v-if="readOnly && props.row[col.name]" />
                </div>
              </q-td>
            </slot>
          </template>
        </q-table>
      </div>
    </div>
    <!-- Table Control Button Row -->
    <div class="row" v-if="!readOnly">
      <!-- Table Control Button Column -->
      <div class="col q-gutter-x-md">
        <!-- Add Row Button -->
        <app-button
          v-if="handlerAdd"
          appearance="icon"
          icon="add"
          @click="handlerAdd"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/css/quasar.variables';

// Empty Message
.empty-message {
  font-size: 9pt;
  color: $light-text-hint;
}

// Empty Message (Dark Mode)
.body--dark .empty-message {
  color: $dark-text-hint;
}

// Table Header
.table-header {
  color: $light-text-header;
}

// Table Header (Dark Mode)
.table-header {
  color: $dark-text-header;
}
</style>

<script setup lang="ts">
import { EInputType, TTableColumn } from 'src/scripts/utilities/common';
import { computed, ref } from 'vue';
import AppButton from 'components/common/AppButton.vue';

/** Defines the properties of this component */
const props = defineProps<{
  /** The rows to be shown in the table */
  rows: any[];
  /** Array of table column definitions */
  columns: TTableColumn[];
  /** Optional message above the table */
  message?: string;
  /** Optional message shown if the table has no rows */
  messageEmpty?: string;
  /** Default rows per page */
  rowsPerPage?: number;
  /** Sorted column name */
  sortBy?: string;
  /** Flag for sorting in descending order */
  sortDescending?: boolean;
  /** Flag for using pagination */
  paginate?: boolean;
  /** Flag for deleting rows */
  deletable?: boolean;
  /** Flag for moving rows */
  moveable?: boolean;
  /** Flag for readonly mode */
  readOnly?: boolean;
  /** Handler function for adding a row */
  handlerAdd?: () => void;
}>();

// Row Index
const rowIndex = ref(-1);

/** The computed table columns */
const tableColumns = computed(() => {
  // Array of table column definitions
  const tableColumns: TTableColumn[] = [];
  // If rows are deletable or moveable, add selection column
  if ((props.deletable || props.moveable) && !props.readOnly) {
    tableColumns.push({
      name: 'selection',
      label: '',
      headerStyle: 'width: 50px',
      field: '',
    });
  }
  // Add custom columns
  tableColumns.push(...props.columns);
  // Add empty column, if the last column has a headerStyle attribute
  if (
    props.columns.length > 0 &&
    props.columns[props.columns.length - 1].headerStyle
  ) {
    tableColumns.push({
      name: 'empty',
      label: '',
      field: '',
    });
  }
  // Return table columns array
  return tableColumns;
});

/**
 * Returns the input type for a given column and row.
 *
 * @param {TTableColumn} column - The column configuration.
 * @param {any} row - The row data.
 *
 * @return {EInputType} - The input type.
 */
function getInputType(column: TTableColumn, row: any): EInputType {
  if (typeof column.input === 'function') {
    // Input type is a function that evaluates the input type
    return column.input(row);
  }
  if (column.input) {
    // Return the static input type
    return column.input;
  }
  // Return 'none' as default input type
  return EInputType.none;
}

/**
 * Returns the name of the slot for a given table column.
 *
 * @param column - The table column for which to get the slot name.
 * @returns The slot name for the column, in the format "body-cell-{name}".
 */
function getSlotName(column: TTableColumn): `body-cell-${string}` {
  return `body-cell-${column.name}` as unknown as `body-cell-${string}`;
}
</script>
