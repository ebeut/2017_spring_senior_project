import request from 'superagent';

export const GET_FAVORITE = 'GET_FAV';
export const GET_FAVORITE_FAIL = `${GET_FAVORITE}_FAIL`;
export const GET_FAVORITE_OK = `${GET_FAVORITE}_OK`;

export const getFav = (showId) => {
  const url = `http://localhost:5000/db/fav/${showId}`;
  return (dispatch) => {
    dispatch({type: GET_FAVORITE});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: GET_FAVORITE_FAIL, err});
      } else {
        dispatch({type: GET_FAVORITE_OK, res});
      }
    });
  };
};


export const actions = {
  getFav
};

const initialState = {};

export default function favoriteReducer (state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE: {
      return { ...initialState, gettingShowInfo: true, showInfoErr: null }
    }
    case GET_FAVORITE_FAIL: {
      return { ...initialState, gettingShowInfo: false, showInfoErr: action.err.response.statusText}
    }
    case GET_FAVORITE_OK: {
      const favorites = action.res.body;
      return { ...initialState, gettingShowInfo: false, favorites}
    }
    default:
      return initialState;
  }
}
