import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';
import { Project } from 'src/scripts/application/Project';
import { EEditorMode } from 'src/scripts/utilities/common';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /** The current authorized account */
    account: null as Account | null,
    /** The list of projects of the current user */
    projects: [] as Project[],
    /** Routing information to an editor page */
    editor: null as {
      mode: EEditorMode;
      id: string | undefined;
      cancelable: boolean;
    } | null,
  }),
  getters: {
    /**
     * Returns the account object assuming there is an authorized account.
     *
     * @returns {Account} The authorized account.
     */
    currentAccount(): Account {
      return this.account as Account;
    },
    /**
     * Returns the name of the current account.
     *
     * @return {string} The name of the current account, or an empty string if the account is null.
     */
    currentAccountName(): string {
      return this.account != null ? this.account.data.common.name : '';
    },
  },
  actions: {},
});
