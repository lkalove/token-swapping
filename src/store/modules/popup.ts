import { Module } from 'vuex';
import { rootState } from '../index';

export interface popupState {
  visible: boolean;
  type: string;
}

export const popupStore: Module<popupState, rootState> = {
  namespaced: true,
  state: {
    visible: false,
    type: '',
  },
  mutations: {
    setPopup(state: popupState, popupStatus: any) {
      state.visible = popupStatus.visibility;
      state.type = popupStatus.type;
    },
  },
  actions: {
    openPopup({ commit }, type: string) {
      commit('setPopup', { visibility: true, type });
    },
    closePopup({ commit }) {
      commit('setPopup', { visibility: false, type: '' });
    },
  },
  getters: {
    isVisible: (state: popupState) => state.visible,
    type: (state: popupState) => state.type,
  },
};