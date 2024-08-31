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
export class Project extends fs.FSDocument<IProjectData> {
  /**
   * Creates a new Project object using the provided document.
   *
   * @param {FSDocument<IProjectData>} document - The document to create the project from.
   *
   * @return {Project} The newly created Project object.
   */
  static create(document: fs.FSDocument<IProjectData>): Project {
    return new Project({
      path: document.path,
      id: document.id,
      data: document.data,
    });
  }

  /**
   * Retrieves the owner of the project.
   *
   * @return {TProjectMember} The project owner.
   */
  getOwner(): TProjectMember {
    return this.data.members.find(
      (member) => member.role === EProjectRole.owner
    ) as TProjectMember;
  }

  /**
   * Retrieves the project member who has the role of manager.
   *
   * @return {TProjectMember} The project member with the manager role.
   */
  getManager(): TProjectMember {
    return this.data.members.find(
      (member) => member.role === EProjectRole.manager
    ) as TProjectMember;
  }

  /**
   * Retrieves the role of the current user in the project.
   *
   * @return {EProjectRole} The role of the current user in the project, represented as an EProjectRole enum value.
   */
  getUserRole(): EProjectRole {
    // Get ID of the current user
    const uid = getCurrentAccountId();
    // Find the member with the current user ID
    return this.data.members.find((member) => member.id === uid)
      ?.role as EProjectRole;
  }

  /**
   * Checks if the current user has one of the specified roles for the project.
   *
   * @param {...EProjectRole[]} roles - The roles to check against.
   * @return {boolean} - Returns true if the current user has one of the permitted roles, otherwise false.
   */
  hasRole(...roles: EProjectRole[]): boolean {
    // Get ID of the current user
    const uid = getCurrentAccountId();
    // Iterate over all members of the project
    for (const member of this.data.members) {
      // Check, if the current user is the member
      if (member.id === uid) {
        // Check if the member has one of the permitted roles
        if (roles.some((role) => member.role === role)) {
          // Permission granted
          return true;
        }
      }
    }
    // No permission granted
    return false;
  }
}

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
 * Updates the given project with the provided details.
 *
 * @param {Project} project - The project to be updated.
 * @param {string} name - The new name of the project.
 * @param {string | null} description - The new description of the project. Can be null.
 * @param {TProjectMember} owner - The owner of the project.
 * @param {TProjectMember} manager - The manager of the project.
 * @param {TProjectMember[]} members - A list of project members.
 * @param {fs.TCustomAttribute[]} attributes - A list of custom attributes to be added to the project.
 *
 * @return {Promise<void>} A promise that resolves when the project has been successfully updated.
 */
export async function updateProject(
  project: Project,
  name: string,
  description: string | null,
  owner: TProjectMember,
  manager: TProjectMember,
  members: TProjectMember[],
  attributes: fs.TCustomAttribute[]
): Promise<void> {
  // Create members array
  const projectMembers = [owner, manager, ...members];
  // Apply to project
  project.data.common.name = name;
  project.data.common.description = description;
  project.data.members = projectMembers;
  project.data.attributes = attributes;
  project.data.access = getAccessList(projectMembers);
  // Update the Firestore document
  await fs.updateDocument<IProjectData, Project>(project);
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
  const documents = await fs.loadDocuments<IProjectData>(
    'project',
    where('access', 'array-contains', uid)
  );
  // Return project array
  return documents.map((doc) => Project.create(doc));
}

/*
export async function loadProject(projectId: string): Promise<Project> {
  // Load the project document
  const project = (await fs.loadAccount<IProjectData>(
    'project',
    projectId
  )) as Project;
  // Return the project
  return project;
}
*/

/**
 * Retrieves a list of access IDs from a given array of project members.
 *
 * @param {TProjectMember[]} projectMembers - An array of project members to extract access IDs from.
 * @return {string[]} - An array of unique access IDs extracted from the project members array.
 */
function getAccessList(projectMembers: TProjectMember[]): string[] {
  return [...new Set<string>(projectMembers.map((mbr) => mbr.id))];
}
