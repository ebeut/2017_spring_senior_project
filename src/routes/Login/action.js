import request from 'superagent';

//Action Type
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = `${LOGIN}_FAIL`;
export const LOGIN_OK = `${LOGIN}_OK`;

export const login = (username, password) => {
  console.log(username, password);
  const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
  return (dispatch) => {
    dispatch({type: LOGIN});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: LOGIN_FAIL, err});
      } else {
        dispatch({type: LOGIN_OK, res});
      }
    });
  }
};

export const actions = {
  login
};

const initialState = {};

export default function homePageData (state = initialState, action) {
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
    default:
      return initialState;
  }
}
