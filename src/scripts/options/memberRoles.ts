import { TSelectOption } from 'src/scripts/utilities/common';

/**
 * An array of `TSelectOption` objects representing the roles that a member can have.
 */
export const memberRoles: TSelectOption[] = [
  // Maintainer
  { value: 'maintainer', label: 'enum.memberRole.maintainer' },
  // Deployer
  { value: 'deployer', label: 'enum.memberRole.deployer' },
  // Developer
  { value: 'developer', label: 'enum.memberRole.developer' },
  // Visitor
  { value: 'visitor', label: 'enum.memberRole.visitor' },
];
