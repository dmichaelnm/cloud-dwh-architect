import { defineStore } from 'pinia';
import { Account } from 'src/scripts/application/Account';

export const useSessionStore = defineStore('session', {
  state: () => ({
    /** The current authorized account */
    account: null as Account | null,
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
  },
  actions: {},
});
