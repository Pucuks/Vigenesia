import createDataContext from './createDataContext';
import anriokita from '../apis/anriokita';
import { navigate } from '../Navigation/RootNavigation';

const GET_ACCOUNT = 'GET_ACCOUNT';
const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';
const GET_NOTES = 'GET_NOTES';

const initialState = {
  account: {
    name: null,
    profesi: null,
    email: null,
    createdAt: null,
  },
  notes: [],
};

function accountReducer(state, action) {
  switch (action.type) {
    case GET_ACCOUNT:
      return { ...state, account: { ...state.account, ...action.payload } };
    case CLEAR_ACCOUNT:
      return { ...state, account: { ...initialState.account } };
    case GET_NOTES:
      return { ...state, notes: action.payload };
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

function createNote(dispatch) {
  return async function ({ note }) {
    try {
      const { data } = await anriokita.post('/notes', { note });
      if (data.success) {
        navigate('LocalLogin');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

const getNotes = (dispatch) => async () => {
  try {
    const { data } = await anriokita.get('/notes');
    if (data.success) {
      dispatch({ type: GET_NOTES, payload: data.notes });
    }
  } catch (error) {}
};

export const { Context, Provider } = createDataContext(
  accountReducer,
  { getAccount, settings, clearAccount, createNote, getNotes },
  initialState
);
