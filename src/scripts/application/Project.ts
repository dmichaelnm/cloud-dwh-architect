import { where } from 'firebase/firestore';
import * as fs from 'src/scripts/application/FSDocument';
import { loadDocuments } from 'src/scripts/application/FSDocument';
import { getCurrentAccountId } from 'src/scripts/utilities/firebase';

/**
 * Represents the various roles that a user can have in a project.
 */
export enum EProjectRole {
  /** Owner */
  owner = 'owner',
  /** Project Manager */
  manager = 'manager',
  /** Maintainer */
  maintainer = 'maintainer',
  /** Deployer */
  deployer = 'deployer',
  /** Developer */
  developer = 'developer',
  /** Visitor */
  visitor = 'visitor',
}

/**
 * Represents a member of a project.
 */
export type TProjectMember = {
  /** The UID of the project member */
  id: string;
  /** The name of the of project member */
  name: string;
  /** The role of the member in the project */
  role: EProjectRole;
};

/**
 * The structure of a data object of a Project document.
 */
export interface IProjectData extends fs.IFSDocumentData {
  /** List containing the UIDs of all accounts that have access to this project */
  access: string[];
  /** List of all project members */
  members: TProjectMember[];
  /** List of custom attributes */
  attributes: fs.TCustomAttribute[];
}

/**
 * This class represents a Project document in the Firestore database.
 */
export class Project extends fs.FSDocument<IProjectData> {}

/**
 * Loads all projects for the current user.
 *
 * @returns {Promise<Project[]>} - A Promise that resolves to an array of Project objects representing the loaded projects.
 */
export async function loadProjects(): Promise<Project[]> {
  // Get UID of the current user
  const uid = getCurrentAccountId();
  // Load all projects for the current user
  return await loadDocuments<IProjectData>(
    'project',
    where('access', 'array-contains', uid)
  );
}
