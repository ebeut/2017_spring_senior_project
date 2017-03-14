import request from 'superagent';

// ACTION TYPE
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const SHOW_SEARCH_OK = `${SHOW_SEARCH}_OK`;
export const SHOW_SEARCH_FAIL = `${SHOW_SEARCH}_FAIL`;

export const GET_ALL_SHOW_NAMES = 'GET_ALL_SHOW_NAMES';
export const GET_ALL_SHOW_NAMES_OK = `${GET_ALL_SHOW_NAMES}_OK`;
export const GET_ALL_SHOW_NAMES_FAIL = `${GET_ALL_SHOW_NAMES}_FAIL`;

// ACTION CALLS
export const searchTVAPI = (searchContent) => {
  const url = `http://api.tvmaze.com/singlesearch/shows?q=${searchContent}`;
  return (dispatch) => {
    dispatch({type: SHOW_SEARCH});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: SHOW_SEARCH_FAIL, err});
      } else {
        dispatch({type: SHOW_SEARCH_OK, res});
      }
    });
  }
};

export const getShows = () => {
  const url = '/vehicles/GetAllMakes?format=json';
  return (dispatch) => {
    dispatch({type: GET_ALL_SHOW_NAMES});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: GET_ALL_SHOW_NAMES_FAIL, err});
      } else {
        dispatch({type: GET_ALL_SHOW_NAMES_OK, res});
      }
    });
  }
};

export const actions = {
  searchTVAPI, getShows
};

const initialState = {};

// Reducer (when the action is sent out and returned it calls this reducer)
export default function carSearchReducer (state = initialState, action) {
  switch (action.type){
    case SHOW_SEARCH: {
      return { ...initialState, gettingSearchRes: true, gettingSearchResErr: null }
    }
    case SHOW_SEARCH_FAIL: {
      return { ...initialState, gettingSearchRes: false, gettingSearchResErr: action.err }
    }
    case SHOW_SEARCH_OK: {
      const searchResults = action.res;
      return { ...initialState, gettingSearchRes: false, searchResults }
    }
    case GET_ALL_SHOW_NAMES: {
      return { ...initialState, gettingAllShows: true, gettingAllShowsErr: null }
    }
    case GET_ALL_SHOW_NAMES_FAIL: {
      return { ...initialState, gettingAllShows: false, gettingAllShowsErr: action.err }
    }
    case GET_ALL_SHOW_NAMES_OK: {
      const showsResults = action.res.body;
      return { ...initialState, gettingAllShows: false, showsResults }
    }
    default:
      return initialState;
  }
}
