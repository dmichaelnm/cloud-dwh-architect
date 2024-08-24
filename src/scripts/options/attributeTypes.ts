import { TSelectOption } from 'src/scripts/utilities/common';
import { ECustomAttributeType } from 'src/scripts/application/FSDocument';

/**
 * Returns an array of select options for the datatypes of a custom attribute.
 */
export const attributeTypes: TSelectOption[] = [
  // String
  {
    value: ECustomAttributeType.string,
    label: 'enum.attributeType.string',
  },
  // Number
  {
    value: ECustomAttributeType.number,
    label: 'enum.attributeType.number',
  },
  // Boolean
  {
    value: ECustomAttributeType.boolean,
    label: 'enum.attributeType.boolean',
  },
];
