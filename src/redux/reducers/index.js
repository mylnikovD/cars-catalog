import { combineReducers } from 'redux';

import { reducer as carsReducer } from './cars';

export default combineReducers({ carsReducer });
