import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';
import { Project } from 'src/scripts/application/Project';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /** The current authorized account */
    account: null as Account | null,
    /** The list of projects of the current user */
    projects: [] as Project[],
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
     * Sets the project list.
     *
     * @param {Project[]} projects - An array of Project objects representing the new project list.
     */
    setProjectList(projects: Project[]) {
      this.projects = projects;
    },
  },
});
