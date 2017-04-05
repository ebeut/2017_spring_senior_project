import request from 'superagent';

export const SHOW_INFO = 'SHOW_INFO';
export const SHOW_INFO_FAIL = `${SHOW_INFO}_FAIL`;
export const SHOW_INFO_OK = `${SHOW_INFO}_OK`;

export const getShowInfo = (showId) => {
  const url = `http://localhost:5000/tv/details/${showId}`;
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
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case SHOW_INFO_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoEerr: action.err}
    }
    case SHOW_INFO_OK: {
      const showInfo = action.res.body;
      console.log(action.res);
      return { ...initialState, gettingShowInfo: false, showInfo}
    }
    default:
      return initialState;
  }
}
