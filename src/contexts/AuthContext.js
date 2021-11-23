import createDataContext from './createDataContext';
import anriokita from '../apis/anriokita';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
    case 'SIGNUP':
    default:
      return state;
  }
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
    } catch (error) {}
  };

const signup =
  (dispatch) =>
  async ({ name, profesi, email, password }) => {
    const { data } = await anriokita.post('/vigenesia/signup', {
      name,
      profesi,
      email,
      password,
    });
    console.log(data);
    try {
    } catch (error) {}
  };

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signin,
    signup,
  },
  {}
);
