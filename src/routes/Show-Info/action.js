import request from 'superagent';

export const SHOW_SEASON_INFO = 'SHOW_SEASON_INFO';
export const SHOW_SEASON_INFO_FAIL = `${SHOW_SEASON_INFO}_FAIL`;
export const SHOW_SEASON_INFO_OK = `${SHOW_SEASON_INFO}_OK`;

export const getShowSeasonInfo = (showId, seasonNum) => {
  const url = `http://localhost:5000/tv/episodes/${showId}/${seasonNum}`;
  return (dispatch) => {
    dispatch({type: SHOW_SEASON_INFO});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: SHOW_SEASON_INFO_FAIL, err});
      } else {
        dispatch({type: SHOW_SEASON_INFO_OK, res});
      }
    });
  };
};

export const SHOW_INFO = 'SHOW_INFO';
export const SHOW_INFO_FAIL = `${SHOW_INFO}_FAIL`;
export const SHOW_INFO_OK = `${SHOW_INFO}_OK`;

export const getShowInfo = (showId) => {
  const url = `http://localhost:5000/tv/details/${showId}`;
  console.log("calling",url);
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
  getShowSeasonInfo,
  getShowInfo
};

const initialState = { show: {}, gettingShowInfo: false, showInfoErr: null, showSeasonInfo: [], gettingShowSeasonInfo: false, showSeasonInfoErr: null};

export default function showSeasonInfoReducer (state = initialState, action) {
  switch (action.type) {

    case SHOW_SEASON_INFO: {
      return { ...initialState, gettingShowSeasonInfo: true, showSeasonInfoErr: null }
    }
    case SHOW_SEASON_INFO_FAIL: {
      return { ...initialState, gettingShowSeasonInfo: false, showSeasonInfoErr: action.err.response.statusText}
    }
    case SHOW_SEASON_INFO_OK: {
      const showSeasonInfo = action.res.body;
      return { ...initialState, gettingShowSeasonInfo: false, showSeasonInfo }
    }
    case SHOW_INFO: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case SHOW_INFO_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case SHOW_INFO_OK: {
      const show = action.res.body;
      return { ...initialState, gettingShowInfo: false, show}
    }
    default:
      return initialState;
  }
}
