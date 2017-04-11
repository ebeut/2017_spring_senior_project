import request from 'superagent';

//Action Type
export const CALENDAR = 'HOW_DATA';
export const CALENDAR_FAIL = `${CALENDAR}_FAIL`;
export const CALENDAR_OK = `${CALENDAR}_OK`;

export const getCalendarData = (isSignedIn) => {
  if (isSignedIn) {
    // makes a call to the backend to get infor from db
  } else {
    // makes a call to backend to get trending/popular shows
  }
};

export const actions = {
  getCalendarData
};

const initialState = {};

export default function calendarData (state = initialState, action) {
  switch (action.type) {
    case CALENDAR: {
      return { ...initialState, gettingSearchRes: true, gettingSearchResErr: null }
    }
    case CALENDAR_FAIL: {
      return { ...initialState, gettingSearchRes: false, gettingSearchResErr: action.err }
    }
    case CALENDAR_OK: {
      const homeData = action.res;
      return { ...initialState, gettingSearchRes: false, homeData }
    }
    default:
      return initialState;
  }
}
