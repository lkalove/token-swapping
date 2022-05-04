import { Module } from 'vuex';
import empty from 'is-empty';
import { rootState } from '../index';
import POOLS from '@/sample/pools';
import BALANCES from '@/sample/balances';
import TOKENS from '@/sample/tokens';

export interface tokenState {
  swapInfo: {
    fromAmount: any;
    toAmount: any;
    price: number;
    balance: number;
    fromToken: string;
    toToken: string;
  };
  tokenPool: Array<any>;
  balances: Array<any>;
  tokens: Array<any>;
}

const calculate = (swapInfoState: any, swapInfo: any, tokenPoolState: Array<any>, balances: Array<any>) => {
  const newSwapInfo = { ...swapInfoState, ...swapInfo };
  const { toToken, fromToken, fromAmount } = newSwapInfo;
  const tokenPool = tokenPoolState.find(pool => (pool.tokenA === fromToken && pool.tokenB === toToken) ||
    (pool.tokenB === fromToken && pool.tokenA === toToken));
  let toAmount = 0;
  let price = 0;
  if (tokenPool && tokenPool.tokenA === fromToken && fromAmount >= 0) {
    toAmount = fromAmount * tokenPool.price;
    price = tokenPool.price;
  } else if (tokenPool && tokenPool.tokenB === fromToken && fromAmount >= 0) { //reverse
    toAmount = fromAmount / tokenPool.price;
    price = 1 / tokenPool.price;
  }
  const balance = empty(fromToken) ? 0 : parseFloat(balances.find(b => b.token === fromToken)?.balance || '0');
  return {
    ...newSwapInfo,
    toAmount,
    balance,
    price,
  };
};

const swap = (swapInfoState: any, balances: Array<any>) => {
  const { fromToken, fromAmount, toToken, toAmount } = swapInfoState;
  const balance = empty(fromToken) ? 0 : parseFloat(balances.find(b => b.token === fromToken)?.balance || '0');
  if (balance < fromAmount) return balances;
  let added = false;
  const newMap = balances.map(b => {
    if (b.token === fromToken) {
      b.balance = (parseFloat(b.balance) - fromAmount).toString();
    } else if (b.token === toToken) {
      b.balance = (parseFloat(b.balance) + toAmount).toString();
      added = true;
    }
    return b;
  });
  // if not added, append it to the balances
  if (!added) {
    newMap.push({ token: toToken, balance: toAmount.toString() });
  }
  return newMap;
};

const displayFloat = (value: number) => {
  if (!value) return value;
  return parseFloat(value.toFixed(8));
};

const displayFloatStr = (value: string) => {
  if (!value) return 0;
  return parseFloat(parseFloat(value).toFixed(8));
};

export const mutations = {
  setSwapInfo(state: tokenState, swapInfo: any) {
    state.swapInfo = calculate(state.swapInfo, swapInfo, state.tokenPool, state.balances);
  },
  switchSwapInfo(state: tokenState) {
    const { toToken, toAmount, fromToken, fromAmount } = state.swapInfo;
    state.swapInfo = calculate(state.swapInfo,
      {
        fromToken: toToken,
        fromAmount: toAmount,
        toToken: fromToken,
        toAmount: fromAmount,
      }, state.tokenPool, state.balances);
  },
  swap(state: tokenState) {
    state.balances = swap(state.swapInfo, state.balances);
    state.swapInfo = calculate(state.swapInfo, {}, state.tokenPool, state.balances);

  },
  setTokenPool(state: tokenState, data: Array<any>) {
    state.tokenPool = data;
  },
  setBalances(state: tokenState, data: Array<any>) {
    state.balances = data;
  },
  setTokens(state: tokenState, data: Array<string>) {
    state.tokens = data;
  },
};

export const tokenStore: Module<tokenState, rootState> = {
  namespaced: true,
  state: {
    swapInfo: {
      fromAmount: '',
      toAmount: '',
      price: 0,
      balance: 0,
      fromToken: '',
      toToken: '',
    },
    tokenPool: [],
    balances: [],
    tokens: [],
  },
  mutations,
  actions: {
    setAmount({ commit }, swapInfo) {
      commit('setSwapInfo', swapInfo);
    },
    switchFromTo({ commit }) {
      commit('switchSwapInfo');
    },
    selectToken({ commit }, { type, value }) {
      if (type === 'from')
        commit('setSwapInfo', { fromToken: value });
      else
        commit('setSwapInfo', { toToken: value });
    },
    swap({ commit }) {
      commit('swap');
    },
    //fetch functions
    //assume fetching data from the server
    fetchTokenPool({ commit }) {
      return Promise.resolve(POOLS).then((result: any) => {
        return commit('setTokenPool', result.pools || []);
      }).catch(e => console.error('error fetching pools: ', e));
    },
    fetchBalances({ commit }) {
      return Promise.resolve(BALANCES).then((result: any) => {
        return commit('setBalances', result.balances || []);
      }).catch(e => console.error('error fetching balances: ', e));
    },
    fetchTokens({ commit }) {
      return Promise.resolve(TOKENS).then((result: any) => {
        return commit('setTokens', result.tokens || []);
      }).catch(e => console.error('error fetching tokens: ', e));
    },
  },
  getters: {
    tokens: (state: tokenState) => state.tokens.map(token => {
      const balanceInfo = state.balances.find(balance => balance.token === token);
      return { name: token, balance: displayFloatStr(balanceInfo?.balance) };
    }),
    swapInfo: (state: tokenState) => ({
      ...state.swapInfo,
      fromAmount: displayFloat(state.swapInfo.fromAmount),
      toAmount: displayFloat(state.swapInfo.toAmount),
      balance: displayFloat(state.swapInfo.balance),
      price: displayFloat(state.swapInfo.price),
    }),
  },
};