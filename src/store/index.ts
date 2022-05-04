import { createStore } from 'vuex'
import { popupStore, popupState } from '@/store/modules/popup';
import { tokenStore, tokenState } from '@/store/modules/token';
import { accountStore, accountState } from '@/store/modules/account';

export interface rootState {
  popupStore: popupState;
  tokenStore: tokenState;
  accountStore: accountState;
}

export default createStore({
  modules: {popupStore, tokenStore, accountStore}
});