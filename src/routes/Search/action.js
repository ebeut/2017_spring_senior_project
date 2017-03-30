import request from 'superagent';

// ACTION TYPE
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const SHOW_SEARCH_OK = `${SHOW_SEARCH}_OK`;
export const SHOW_SEARCH_FAIL = `${SHOW_SEARCH}_FAIL`;

// ACTION CALLS
export const searchTVAPI = (searchContent) => {
  const url = `http://127.0.0.1:5000/tv/search/${searchContent}`;
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

export const actions = {
  searchTVAPI
};

const initialState = {};

// Reducer (when the action is sent out and returned it calls this reducer)
export default function showSearchReducer (state = initialState, action) {
  switch (action.type){
    case SHOW_SEARCH: {
      return { ...initialState, gettingSearchRes: true, gettingSearchResErr: null }
    }
    case SHOW_SEARCH_FAIL: {
      return { ...initialState, gettingSearchRes: false, gettingSearchResErr: action.err }
    }
    case SHOW_SEARCH_OK: {
      const searchResults = action.res.body;
      return { ...initialState, gettingSearchRes: false, searchResults }
    }
    default:
      return initialState;
  }
}
