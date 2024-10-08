import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';
import { Project } from 'src/scripts/application/Project';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /** The current authorized account */
    account: null as Account | null,
    /** The list of projects of the current user */
    projects: [] as Project[],
    /** Flag for the editor lock */
    editorLock: false as boolean,
  }),
  getters: {
    /**
     * Retrieves the current account.
     *
     * @return {Account} The current account.
     */
    currentAccount(): Account {
      return this.account as Account;
    },
    /**
     * Retrieves the name of the current account.
     *
     * @returns {string} The name of the current account, or an empty string if no account is available.
     */
    currentAccountName(): string {
      return this.account ? this.account.data.common.name : '';
    },
  },
  actions: {
    /**
     * Sets the account for this session.
     *
     * @param {Account} account - The account to be set.
     */
    setAccount(account: Account) {
      this.account = account;
    },
    /**
     * Adds a project to the project list.
     *
     * @param {Project} project - The project to be added.
     */
    addProject(project: Project) {
      // Add project
      this.projects.push(project);
      // Sort project list
      this.sortProjects();
    },
    /**
     * Sets the project list.
     *
     * @param {Project[]} projects - An array of Project objects representing the new project list.
     */
    setProjectList(projects: Project[]) {
      // Apply projects
      this.projects = projects;
      // Sort projects
      this.sortProjects();
    },
    /**
     * Sorts the projects in ascending order based on their common name.
     */
    sortProjects(): void {
      this.projects.sort((a: Project, b: Project) =>
        a.data.common.name.localeCompare(b.data.common.name)
      );
    },
    /**
     * Retrieves a project by its unique identifier.
     *
     * @param {string | null} projectId - The unique identifier of the project.
     *
     * @return {Project | null} - The project matching the provided identifier,
     *                            or null if no match is found.
     */
    getProject(projectId: string | null): Project | null {
      return this.projects.find((project) => project.id === projectId) || null;
    },
    /**
     * Removes a project from the list based on the provided project ID.
     *
     * @param {string} projectId - The ID of the project to be removed.
     */
    removeProject(projectId: string): void {
      // Get index of the project in list
      const index = this.projects.findIndex(
        (project) => project.id === projectId
      );
      // If found, remove it from list
      if (index > -1) {
        this.projects.splice(index, 1);
      }
    }
  },
});
