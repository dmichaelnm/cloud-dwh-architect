<template>
  <!-- Editable Table -->
  <app-editable-table
    ref="table"
    :columns="[
      // Key
      {
        name: 'key',
        label: $t('customAttribute.header.key'),
        align: 'left',
        headerStyle: 'width: 300px',
        input: EInputType.text,
        field: (row) => row.key,
      },
      // Data Type
      {
        name: 'type',
        label: $t('customAttribute.header.type'),
        align: 'left',
        headerStyle: 'width: 300px',
        input: EInputType.select,
        options: attributeTypes,
        translate: true,
        field: (row) => $t(`enum.attributeType.${row.type}`),
      },
      // Value
      {
        name: 'value',
        label: $t('customAttribute.header.value'),
        align: 'left',
        input: (row) =>
          row.type === fs.ECustomAttributeType.boolean
            ? EInputType.checkbox
            : EInputType.text,
        field: (row) => row.value,
      },
    ]"
    :rows="attributes"
    :message="$t('customAttribute.tableMessage')"
    :message-empty="$t('customAttribute.emptyMessage')"
    :handler-add="addAttribute"
    :tooltip-add="$t('customAttribute.tooltip.add')"
    :tooltip-remove="$t('customAttribute.tooltip.remove')"
    :validator="validateAttribute"
    :read-only="readOnly"
    deletable
  />
</template>

<script setup lang="ts">
import * as fs from 'src/scripts/application/FSDocument';
import { computed, ref } from 'vue';
import { EInputType, toBoolean, toNumber } from 'src/scripts/utilities/common';
import { attributeTypes } from 'src/scripts/options/attributeTypes';
import AppEditableTable from 'components/common/AppEditableTable.vue';

// Table reference
const table = ref<typeof AppEditableTable | null>(null);

/** Defines the properties of this component */
const props = defineProps<{
  /** Model value */
  modelValue: fs.TCustomAttribute[];
  /** Read only flag */
  readOnly?: boolean;
}>();

/** Defines the events that can be emitted by this component */
const emit = defineEmits<{
  /** Update model value event */
  (event: 'update:modelValue', value: fs.TCustomAttribute[]): void;
}>();

/** Internal attributes */
const attributes = computed({
  get: () => props.modelValue,
  set: (value: fs.TCustomAttribute[]) => emit('update:modelValue', value),
});

/**
 * Find the next free attribute name and add a new attribute to the existing attributes.
 */
function addAttribute(): void {
  // Find next free attribute name
  let index = 0;
  while (attributes.value.some((att) => att.key === `attribute${index}`)) {
    index++;
  }
  // Add new attribute
  attributes.value.push({
    key: `attribute${index}`,
    type: fs.ECustomAttributeType.string,
    value: '?',
  });
  // Set new row index
  table.value?.setRowIndex(attributes.value.length - 1);
}

/**
 * Validates and modifies the attribute value based on the given row index, column name, old value, and new value.
 * If the column name is "key", it removes special characters from the new value, converts the first character to lowercase,
 * and checks if the new key is already used. If it is used, the new value is replaced with the old value.
 * If the column name is "type", it checks the type of the new value and converts it to the corresponding type.
 * If the column name is "value" and the attribute type is "number", it converts the new value to a number or keeps the
 * old value if the new value is not a valid number.
 *
 * @param rowIndex - The index of the row in the attribute collection.
 * @param columnName - The name of the column.
 * @param oldValue - The previous value of the attribute.
 * @param newValue - The new value of the attribute.
 *
 * @return The modified value of the attribute.
 */
function validateAttribute(
  rowIndex: number,
  columnName: string,
  oldValue: any,
  newValue: any
): any {
  // Check the key column
  if (columnName === 'key') {
    // Remove all special character from the name
    newValue = (newValue as string).replace(/[^a-zA-Z0-9_]/g, '');
    // Make the first character as lower case
    newValue =
      (newValue as string).substring(0, 1).toLowerCase() +
      (newValue as string).substring(1);
    // Check if the new key isn't already used, if so, replace with old value
    if (
      attributes.value.some(
        (att, index) => rowIndex !== index && newValue === att.key
      )
    ) {
      newValue = oldValue;
    }
  }
  // Check the type column
  else if (columnName === 'type') {
    // Get the type
    const type = newValue as fs.ECustomAttributeType;
    // Check string type
    if (type === fs.ECustomAttributeType.string) {
      attributes.value[rowIndex].value =
        attributes.value[rowIndex].value.toString();
    }
    // Check number type
    else if (type === fs.ECustomAttributeType.number) {
      const value = toNumber(attributes.value[rowIndex].value);
      if (value === null) {
        attributes.value[rowIndex].value = 0;
      } else {
        attributes.value[rowIndex].value = value;
      }
    }
    // Check boolean type
    else if (type === fs.ECustomAttributeType.boolean) {
      attributes.value[rowIndex].value = toBoolean(
        attributes.value[rowIndex].value
      );
    }
  }
  // Check the value column
  else if (columnName === 'value') {
    // Get the type
    const type = attributes.value[rowIndex].type;
    // Check number type
    if (type === fs.ECustomAttributeType.number) {
      const value = toNumber(newValue);
      newValue = value !== null ? value : oldValue;
    }
  }
  // Return the new value
  return newValue;
}

</script>
