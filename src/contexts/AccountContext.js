import createDataContext from './createDataContext';
import anriokita from '../apis/anriokita';

const GET_ACCOUNT = 'GET_ACCOUNT';
const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';

const initialState = {
  account: {
    name: null,
    profesi: null,
    email: null,
    createdAt: null,
  },
};

function accountReducer(state, action) {
  switch (action.type) {
    case GET_ACCOUNT:
      return { ...state, account: { ...state.account, ...action.payload } };
    case CLEAR_ACCOUNT:
      return { ...state, account: { ...initialState.account } };
    default:
      return state;
  }
}

function getAccount(dispatch) {
  return async function () {
    try {
      const { data } = await anriokita.get('/account');
      if (data.success) {
        dispatch({ type: GET_ACCOUNT, payload: data.account });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

function settings(dispatch) {
  return async function () {
    try {
    } catch (error) {}
  };
}

function clearAccount(dispatch) {
  return function () {
    dispatch({ type: CLEAR_ACCOUNT });
  };
}

export const { Context, Provider } = createDataContext(
  accountReducer,
  { getAccount, settings, clearAccount },
  initialState
);
