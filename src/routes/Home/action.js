import request from 'superagent';

//Action Type
export const HOME_DATA = 'HOW_DATA';
export const HOME_DATA_FAIL = `${HOME_DATA}_FAIL`;
export const HOME_DATA_OK = `${HOME_DATA}_OK`;

export const getHomePageData = (isSignedIn) => {
  if (isSignedIn) {
    // makes a call to the backend to get infor from db
  } else {
    // makes a call to backend to get trending/popular shows
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
      const homeData = action.res;
      return { ...initialState, gettingSearchRes: false, homeData }
    }
    default:
      return initialState;
  }
}
