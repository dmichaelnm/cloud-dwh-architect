import { where } from 'firebase/firestore';
import * as fs from 'src/scripts/application/FSDocument';
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
 * Creates a new project with the given details and returns the created project.
 *
 * @param {string} name - The name of the project.
 * @param {string|null} description - The description of the project. Can be null.
 * @param {TProjectMember} owner - The owner of the project.
 * @param {TProjectMember} manager - The manager of the project.
 * @param {TProjectMember[]} members - An array of project members.
 * @param {fs.TCustomAttribute[]} attributes - An array of custom attributes for the project.
 *
 * @returns {Promise<Project>} The created project.
 */
export async function createProject(
  name: string,
  description: string | null,
  owner: TProjectMember,
  manager: TProjectMember,
  members: TProjectMember[],
  attributes: fs.TCustomAttribute[]
): Promise<Project> {
  // Create members array
  const projectMembers = [owner, manager, ...members];
  // Create project data object
  const data: IProjectData = {
    access: getAccessList(projectMembers),
    common: { name: name, description: description },
    members: projectMembers,
    attributes: attributes ? attributes : [],
  };
  // Create project document in firebase and return it
  return await fs.createDocument<IProjectData, Project>('project', data);
}

/**
 * Loads all projects for the current user.
 *
 * @returns {Promise<Project[]>} - A Promise that resolves to an array of Project objects representing the loaded projects.
 */
export async function loadProjects(): Promise<Project[]> {
  // Get UID of the current user
  const uid = getCurrentAccountId();
  // Load all projects for the current user
  return await fs.loadDocuments<IProjectData>(
    'project',
    where('access', 'array-contains', uid)
  );
}

/**
 * Retrieves a list of access IDs from a given array of project members.
 *
 * @param {TProjectMember[]} projectMembers - An array of project members to extract access IDs from.
 * @return {string[]} - An array of unique access IDs extracted from the project members array.
 */
function getAccessList(projectMembers: TProjectMember[]): string[] {
  return [...new Set<string>(projectMembers.map((mbr) => mbr.id))];
}
