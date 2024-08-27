import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';
import { Project } from 'src/scripts/application/Project';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /** The current authorized account */
    account: null as Account | null,
    /** The list of projects of the current user */
    projects: [] as Project[],
    /** Result handler function for routing results */
    resultHandler: null as ((result: any) => void) | null,
    /** Flag for the editor lock */
    editorLock: false as boolean
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
     * Invokes the result handler function with the given result.
     *
     * @param result - The result to be passed to the result handler.
     */
    invokeResultHandler(result: any): void {
      // Check if result handler is specified
      if (this.resultHandler !== null) {
        // Invoke the result handler
        this.resultHandler(result);
        // Reset result handler
        this.resultHandler = null;
      }
    }
  },
});
