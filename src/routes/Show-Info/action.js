import request from 'superagent';

export const GET_FAV = 'GET_FAV';
export const GET_FAV_FAIL = `${GET_FAV}_FAIL`;
export const GET_FAV_OK = `${GET_FAV}_OK`;

export const getFav = (showId) => {
  const url = `http://localhost:5000/db/fav/${showId}`;
  return (dispatch) => {
    dispatch({type: GET_FAV});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: GET_FAV_FAIL, err});
      } else {
        dispatch({type: GET_FAV_OK, res});
      }
    });
  };
};

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

export const ADD_FAV = 'ADD_FAV';
export const ADD_FAV_FAIL = `${ADD_FAV}_FAIL`;
export const ADD_FAV_OK = `${ADD_FAV}_OK`;

export const addFavorite = (username, showId) => {
  const url = `http://localhost:5000/db/insert/${username}/${showId}`;
  return (dispatch) => {
    dispatch({type: ADD_FAV});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: ADD_FAV_FAIL, err});
      } else {
        dispatch({type: ADD_FAV_OK, res});
      }
    });
  }
};

export const ADD_EPISODE = 'ADD_EPISODE';
export const ADD_EPISODE_FAIL = `${ADD_EPISODE}_FAIL`;
export const ADD_EPISODE_OK = `${ADD_EPISODE}_OK`;

export const addEpisode = (username, showId, sepisode) => {
  const url = `http://localhost:5000/db/epi/insert/${username}/${showId}/${sepisode}`;
  return (dispatch) => {
    dispatch({type: ADD_EPISODE});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: ADD_EPISODE_FAIL, err});
      } else {
        dispatch({type: ADD_EPISODE_OK, res});
      }
    });
  }
};

export const DEL_EPISODE = 'ADD_EPISODE';
export const DEL_EPISODE_FAIL = `${DEL_EPISODE}_FAIL`;
export const DEL_EPISODE_OK = `${DEL_EPISODE}_OK`;

export const delEpisode = (username, showId, sepisode) => {
  const url = `http://localhost:5000/db/epi/remove/${username}/${showId}/${sepisode}`;
  return (dispatch) => {
    dispatch({type: DEL_EPISODE});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: DEL_EPISODE_FAIL, err});
      } else {
        dispatch({type: DEL_EPISODE_OK, res});
      }
    });
  }
};


export const GET_EPISODE = 'GET_EPISODE';
export const GET_EPISODE_FAIL = `${GET_EPISODE}_FAIL`;
export const GET_EPISODE_OK = `${GET_EPISODE}_OK`;

export const getEpisodes = (username, showId) => {
  const url = `http://localhost:5000/db/epi/watched/${username}/${showId}`;
  return (dispatch) => {
    dispatch({type: GET_EPISODE});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: GET_EPISODE_FAIL, err});
      } else {
        dispatch({type: GET_EPISODE_OK, res});
      }
    });
  }
};


export const DEL_FAV = 'DEL_FAV';
export const DEL_FAV_FAIL = `${DEL_FAV}_FAIL`;
export const DEL_FAV_OK = `${DEL_FAV}_OK`;

export const delFavorite = (username, showId) => {
  const url = `http://localhost:5000/db/remove/${username}/${showId}`;
  return (dispatch) => {
    dispatch({type: DEL_FAV});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: DEL_FAV_FAIL, err});
      } else {
        dispatch({type: DEL_FAV_OK, res});
      }
    });
  }
};


export const actions = {
  getShowSeasonInfo,
  getShowInfo,
  addFavorite,
  delEpisode,
  addEpisode,
  delFavorite,
  getEpisodes,
  getFav
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
    case ADD_FAV: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case ADD_FAV_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case ADD_FAV_OK: {
      const addFavRes = action.res.body;
      return { ...initialState, gettingShowInfo: false, addFavRes}
    }
    case ADD_EPISODE: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case ADD_EPISODE_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case ADD_EPISODE_OK: {
      const addEpiRes = action.res.body;
      return { ...initialState, gettingShowInfo: false, addEpiRes}
    }
    case DEL_EPISODE: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case DEL_EPISODE_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case DEL_EPISODE_OK: {
      const delEpiRes = action.res.body;
      return { ...initialState, gettingShowInfo: false, delEpiRes}
    }
    case GET_EPISODE: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case GET_EPISODE_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case GET_EPISODE_OK: {
      const watchedEpiList = action.res.body;
      return { ...initialState, gettingShowInfo: false, watchedEpiList}
    }
    case DEL_FAV: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case DEL_FAV_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case DEL_FAV_OK: {
      const delFavRes = action.res.body;
      return { ...initialState, gettingShowInfo: false, delFavRes}
    }
    case GET_FAV: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case GET_FAV_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case GET_FAV_OK: {
      const getFavRes = action.res.body;
      return { ...initialState, gettingShowInfo: false, getFavRes}
    }
    default:
      return initialState;
  }
}
