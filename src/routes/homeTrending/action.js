import request from 'superagent';

//Action Type
export const HOME_DATA = 'HOW_DATA';
export const HOME_DATA_FAIL = `${HOME_DATA}_FAIL`;
export const HOME_DATA_OK = `${HOME_DATA}_OK`;

export const getHomePageData = () => {
  const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
  return (dispatch) => {
    dispatch({type: HOME_DATA});
    request.get(url).end((err, res) => {
      if (err || !res.ok) {
        dispatch({type: HOME_DATA_FAIL, err});
      } else {
        dispatch({type: HOME_DATA_OK, res});
      }
    });
  }
};

export const actions = {
  getHomePageData
};

const initialState = {};

export default function homePageData (state = initialState, action) {
  switch (action.type) {
    case HOME_DATA: {
      return { ...initialState, gettingSearchRes: true, gettingSearchResErr: null }
    }
    case HOME_DATA_FAIL: {
      return { ...initialState, gettingSearchRes: false, gettingSearchResErr: action.err }
    }
    case HOME_DATA_OK: {
      const homeData = action.res.body;
      return { ...initialState, gettingSearchRes: false, homeData }
    }
    default:
      return initialState;
  }
}
