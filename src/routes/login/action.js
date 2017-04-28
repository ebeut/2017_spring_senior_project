import request from 'superagent';

export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const IS_LOGGED_IN_FAIL = `${IS_LOGGED_IN}_FAIL`;
export const IS_LOGGED_IN_OK = `${IS_LOGGED_IN}_OK`;

export const isLogin = () => {
  const url = `http://localhost:5000/db/usr/loggedin`;
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

export const LOGOUT = 'LOGOUT';
export const LOGOUT_FAIL = `${LOGOUT}_FAIL`;
export const LOGOUT_OK = `${LOGOUT}_OK`;

export const logout = (username) => {
  const url = `http://localhost:5000/db/usr/logout/${username}`;
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({ type: LOGOUT_FAIL, err });
      } else {
        dispatch({ type: LOGOUT_OK, res });
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
    case LOGOUT: {
      return { ...initialState, gettingLogin: true, loginErr: null }
    }
    case LOGOUT_FAIL: {
      return { ...initialState, gettingLogin: false, loginErr: action.err }
    }
    case LOGOUT_OK: {
      const logoutData = action.res.body;
      return { ...initialState, gettingLogin: false, logoutData }
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
    case IS_LOGGED_IN: {
      return { ...initialState, gettingRegister: true, registerErr: null }
    }
    case IS_LOGGED_IN_FAIL: {
      return { ...initialState, gettingRegister: false, registerErr: action.err }
    }
    case IS_LOGGED_IN_OK: {
      const userName = action.res.body;
      return { ...initialState, gettingRegister: false, userName }
    }
    default:
      return initialState;
  }
}
