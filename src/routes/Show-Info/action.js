import request from 'superagent';

export const SHOW_INFO = 'SHOW_INFO';
export const SHOW_INFO_FAIL = `${SHOW_INFO}_FAIL`;
export const SHOW_INFO_OK = `${SHOW_INFO}_OK`;

export const getShowInfo = (showId) => {
  const url = `que?-${showId}`;
  return (dispatch) => {
    dispatch({type: SHOW_INFO});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: SHOW_INFO_FAIL, err});
      } else {
        dispatch({type: SHOW_INFO_OK, res});
      }
    });
  }
};

export const actions = {
  getShowInfo
};

const initialState = {};

export default function showInfoReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_INFO: {
      return { ...initialState, getting: true, err: null }
    }
    case SHOW_INFO_FAIL: {
      return { ...initialState, getting: false, err: action.err}
    }
    case SHOW_INFO_OK: {
      const data = JSON.stringify(action.res);
      return { ...initialState, getting: false, data}
    }
    default:
      return initialState;
  }
}
