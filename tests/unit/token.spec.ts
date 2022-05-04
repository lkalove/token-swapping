import POOLS from '@/sample/pools';
import BALANCES from '@/sample/balances';
import TOKENS from '@/sample/tokens';
import { mutations } from '@/store/modules/token';

describe('tokenState', () => {
  const { setSwapInfo, switchSwapInfo } = mutations;

  it('switchSwapInfo: ETH-BTC', () => {
    const state = {
      swapInfo: {
        fromAmount: 1,
        toAmount: 0.0674,
        price: 0.0674,
        balance: 0,
        fromToken: 'ETH',
        toToken: 'BTC',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    switchSwapInfo(state);
    expect(state).toEqual({
      swapInfo: {
        fromAmount: 0.0674,
        toAmount: 1,
        price: 1 / 0.0674,
        balance: 1.4,
        fromToken: 'BTC',
        toToken: 'ETH',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    });
  });
  it('switchSwapInfo: BTC-DAI', () => {
    const state = {
      swapInfo: {
        fromAmount: 1,
        toAmount: 1 * (1 / 59900),
        price: 1 / 59900,
        balance: 1.1,
        fromToken: 'DAI',
        toToken: 'BTC',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    switchSwapInfo(state);
    expect(state).toEqual({
      swapInfo: {
        fromAmount: 1 * (1 / 59900),
        toAmount: 1,
        price: 59900,
        balance: 1.4,
        fromToken: 'BTC',
        toToken: 'DAI',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    });
  });
  it('setSwapInfo: ETH-BTC-FROM-AMOUNT', () => {
    const state = {
      swapInfo: {
        fromAmount: 0,
        toAmount: 10,
        price: 0,
        balance: 0,
        fromToken: 'ETH',
        toToken: 'BTC',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    setSwapInfo(state, {
      fromAmount: 1,
    });
    expect(state.swapInfo).toEqual(
      {
        fromAmount: 1,
        toAmount: 0.0674,
        price: 0.0674,
        balance: 121,
        fromToken: 'ETH',
        toToken: 'BTC',
      });
  });
  it('setSwapInfo: ETH-BTC-TO-TOKEN', () => {
    const state = {
      swapInfo: {
        fromAmount: 1,
        toAmount: 0,
        price: 0,
        balance: 0,
        fromToken: 'ETH',
        toToken: '',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    setSwapInfo(state, {
      toToken: 'BTC',
    });
    expect(state.swapInfo).toEqual(
      {
        fromAmount: 1,
        toAmount: 0.0674,
        price: 0.0674,
        balance: 121,
        fromToken: 'ETH',
        toToken: 'BTC',
      });
  });
  it('setSwapInfo: BTC-USDT', () => {
    const state = {
      swapInfo: {
        fromAmount: 1,
        toAmount: 0,
        price: 0.0674,
        balance: 0,
        fromToken: 'BTC',
        toToken: '',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };

    setSwapInfo(state, {
      fromAmount: 2,
      toToken: 'USDT',
    });
    expect(state.swapInfo).toEqual(
      {
        fromAmount: 2,
        toAmount: 120000,
        price: 60000,
        balance: 1.4,
        fromToken: 'BTC',
        toToken: 'USDT',
      });
  });
  it('setSwapInfo:DAI-BTC', () => {
    const state = {
      swapInfo: {
        fromAmount: 2.0,
        toAmount: 120000,
        price: 0.0674,
        balance: 0,
        fromToken: 'ETH',
        toToken: 'BTC',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    setSwapInfo(state, {
      fromAmount: 2.0,
      fromToken: 'DAI',
    });

    expect(state.swapInfo).toEqual(
      {
        fromAmount: 2.0,
        toAmount: 2 * (1 / 59900),
        price: 1 / 59900,
        balance: 900,
        fromToken: 'DAI',
        toToken: 'BTC',
      });
  });
  it('setSwapInfo:ETH-XRP', () => {
    const state = {
      swapInfo: {
        fromAmount: 1.0,
        toAmount: 9,
        price: 0.0674,
        balance: 0,
        fromToken: 'BTC',
        toToken: 'XRP',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    setSwapInfo(state, {
      fromAmount: 2.0,
      fromToken: 'ETH',
      toToken: 'XRP',
    });
    expect(state.swapInfo).toEqual(
      {
        fromAmount: 2.0,
        toAmount: 0,
        price: 0,
        balance: 121,
        fromToken: 'ETH',
        toToken: 'XRP',
      });
  });
  it('setSwapInfo:ETH-NONE', () => {
    const state = {
      swapInfo: {
        fromAmount: 1.0,
        toAmount: 0,
        price: 0,
        balance: 0,
        fromToken: '',
        toToken: ''
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    setSwapInfo(state, {
      fromAmount: 2.0,
      fromToken: 'BTC',
      toToken: '',
    });
    expect(state.swapInfo).toEqual(
      {
        fromAmount: 2.0,
        toAmount: 0,
        price: 0,
        balance: 1.4,
        fromToken: 'BTC',
        toToken: '',
      });
  });
  it('setSwapInfo:fromAmount=0', () => {
    const state = {
      swapInfo: {
        fromAmount: 1.0,
        toAmount: 9,
        price: 0.0674,
        balance: 0,
        fromToken: 'BTC',
        toToken: 'XRP',
      },
      tokenPool: POOLS.pools,
      balances: BALANCES.balances,
      tokens: TOKENS.tokens,
    };
    setSwapInfo(state, {
      fromAmount: 0,
      fromToken: 'ETH',
      toToken: 'XRP',
    });
    expect(state.swapInfo).toEqual(
      {
        fromAmount: 0,
        toAmount: 0,
        price: 0,
        balance: 121,
        fromToken: 'ETH',
        toToken: 'XRP',
      });
  });
});
