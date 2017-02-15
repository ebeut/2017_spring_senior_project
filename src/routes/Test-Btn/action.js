import request from 'superagent';
// ------------------------------------
// Constants
// ------------------------------------
export const TEST_API = 'TEST_API';
export const TEST_ASYNC_API = 'TEST_ASYNC_API';
export const TEST_ASYNC_API_FAIL = `${TEST_ASYNC_API}_FAIL`;
export const TEST_ASYNC_API_OK = `${TEST_ASYNC_API}_OK`;

// ------------------------------------
// Actions
// ------------------------------------
export function testHttpReq (url) {
  return {
    type    : TEST_API,
    payload : url
  }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const doubleTestAsync = (url) => {
  return (dispatch) => {
        dispatch({type: TEST_ASYNC_API});
        request.get(url).end((err, res) => {
          if (err || !res.ok) {
            dispatch({type: TEST_ASYNC_API_FAIL, err});
          } else {
            dispatch({type: TEST_ASYNC_API_OK, res});
          }
        });
  }
};


export const actions = {
  testHttpReq,
  doubleTestAsync
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function testReducer (state = initialState, action) {
  switch (action.type){
    case TEST_ASYNC_API: {
      return { ...initialState, getting: true, err: null }
    }
    case TEST_ASYNC_API_FAIL: {
      return { ...initialState, getting: false, err: action.err}
    }
    case TEST_ASYNC_API_OK: {
      const data = JSON.stringify(action.res.body);
      return { ...initialState, getting: false, data}
    }
    default:
      return initialState;
  }
}
