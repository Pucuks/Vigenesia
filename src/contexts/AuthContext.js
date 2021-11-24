import AsyncStorage from '@react-native-async-storage/async-storage';

import createDataContext from './createDataContext';
import anriokita from '../apis/anriokita';
import { navigate } from '../Navigation/RootNavigation';

const SIGNUP_ERROR = 'SIGNUP_ERROR';
const SIGNIN_ERROR = 'SIGNIN_ERROR';
const SIGNIN = 'SIGNIN';
const SIGNUP = 'SIGNUP';
const CLEAR_ERROR = 'CLEAR_ERROR';
const LOCAL_LOGIN = 'LOCAL_LOGIN';
const SIGNOUT = 'SIGNOUT';

const initialState = {
  errorMessage: null,
  success: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOCAL_LOGIN:
    case SIGNIN:
      return {
        ...state,
        errorMessage: null,
        success: null,
        token: action.payload,
      };
    case SIGNUP:
      return { ...state, success: action.payload };
    case SIGNUP_ERROR:
    case SIGNIN_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR:
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const { data } = await anriokita.post('/vigenesia/signin', {
        email,
        password,
      });

      if (data.success) {
        await AsyncStorage.setItem('token', data.token);
        dispatch({ type: SIGNIN, payload: data.token });
        navigate('Home');
      }
    } catch (error) {
      dispatch({ type: SIGNIN_ERROR, payload: error.response.data.error });
    }
  };

const signup =
  (dispatch) =>
  async ({ name, profesi, email, password }) => {
    try {
      const { data } = await anriokita.post('/vigenesia/signup', {
        name,
        profesi,
        email,
        password,
      });

      if (data.success) {
        dispatch({ type: SIGNUP, payload: 'Account created' });
        navigate('Signin');
      }
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, payload: error.response.data.error });
    }
  };

const clearError = (dispatch) => () => {
  dispatch({ type: CLEAR_ERROR });
};

const localLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: LOCAL_LOGIN, payload: token });
    navigate('Home');
  } else {
    navigate('Signin');
  }
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: SIGNOUT });
  navigate('Signin');
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    clearError,
    localLogin,
    signOut,
  },
  initialState
);
