import { Module } from 'vuex';
import { rootState } from '../index';
import ACCOUNT from '@/sample/account';

export interface accountState {
  accountInfo: { address: string };
}

export const accountStore: Module<accountState, rootState> = {
  namespaced: true,
  state: {
    accountInfo: {
      address: ""
    }
  },
  mutations: {
    setAccount(state: accountState, data) {
      state.accountInfo = data;
    },
  },
  actions: {
    fetchAccountInfo({ commit }) {
      //assume fetching data from the server
      return Promise.resolve(ACCOUNT).then((result) => {
        return commit('setAccount', result);
      }).catch(e => console.error("error fetching account: ", e));
    },
  },
  getters: {
    accountInfo: (state: accountState) => state.accountInfo,
  },
};