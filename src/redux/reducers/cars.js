import actionTypes from '../actions/actionTypes';

export const getInitialState = () => {
  return {
    cars: [],
    initialized: false,
    queryString: ''
  };
};

const initialState = getInitialState();

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_STORE:
      return { ...state, ...action.payload };
    case actionTypes.DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.DATA_RECEIVED:
      return {
        ...state,
        loading: false,
        error: null,
        cars: action.data
      };
    case actionTypes.DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null
      };
    default:
      return state;
  }
};
