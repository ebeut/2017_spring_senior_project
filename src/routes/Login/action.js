import request from 'superagent';

// Action Type
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = `${LOGIN}_FAIL`;
export const LOGIN_OK = `${LOGIN}_OK`;

export const login = (username, password) => {
  const url = `http://localhost:5000/db/usr/login/${username}/${password}`;
  return (dispatch) => {
    dispatch({ type: LOGIN });
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: LOGIN_FAIL, err });
      } else {
        dispatch({ type: LOGIN_OK, res });
      }
    });
  }
};

export const REGISTER = 'REGISTER';
export const REGISTER_FAIL = `${REGISTER}_FAIL`;
export const REGISTER_OK = `${REGISTER}_OK`;

export const register = (username, password) => {
  const url = `http://localhost:5000/db/usr/register/${username}/${password}`;
  return (dispatch) => {
    dispatch({ type: REGISTER });
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: REGISTER_FAIL, err });
      } else {
        dispatch({ type: REGISTER_OK, res });
        dispatch({ type: 'CALENDAR_OK', res: {body: {login: true}}});
      }
    });
  }
};

export const actions = {
  login,
  register
};

const initialState = {};

export default function userData (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...initialState, gettingLogin: true, loginErr: null }
    }
    case LOGIN_FAIL: {
      return { ...initialState, gettingLogin: false, loginErr: action.err }
    }
    case LOGIN_OK: {
      const loginData = action.res.body;
      return { ...initialState, gettingLogin: false, loginData }
    }
    case REGISTER: {
      return { ...initialState, gettingRegister: true, registerErr: null }
    }
    case REGISTER_FAIL: {
      return { ...initialState, gettingRegister: false, registerErr: action.err }
    }
    case REGISTER_OK: {
      const registerData = action.res.body;
      return { ...initialState, gettingRegister: false, registerData }
    }
    default:
      return initialState;
  }
}
