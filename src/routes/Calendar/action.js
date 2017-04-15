import request from 'superagent';

//Action Type
export const CALENDAR = 'CALENDAR';
export const CALENDAR_FAIL = `${CALENDAR}_FAIL`;
export const CALENDAR_OK = `${CALENDAR}_OK`;

export const getTrending = () => {
    const url = `http://127.0.0.1:5000/tv/trending`;
   // console.log(url);
    return (dispatch) => {
      dispatch({type: CALENDAR});
      request.get(url).end((err, res) => {
        if (err || !res.ok) {
          dispatch({type: CALENDAR_FAIL, err});
        } else {
          dispatch({type: CALENDAR_OK, res});
        }
      });
    }
};

export const actions = {
  getTrending
};

const initialState = {};

export default function calendarData (state = initialState, action) {
  switch (action.type) {
    case CALENDAR: {
      return { ...initialState, gettingCalendar: true, gettingCalendarErr: null }
    }
    case CALENDAR_FAIL: {
      return { ...initialState, gettingCalendar: false, gettingCalendarErr: action.err }
    }
    case CALENDAR_OK: {
      const trendingData = action.res.body;
      return { ...initialState, gettingCalendar: false, trendingData }
    }
    default:
      return initialState;
  }
}
