import { combineReducers } from 'redux';

import authReducer from './modules/auth/slice';
import countReducer from './modules/count/slice';
import viewCountReducer from './modules/viewCount/slice';
import detailCandidateReducer from './modules/detailCandidate/slice';
import fieldReducer from './modules/field/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  count: countReducer,
  viewCount: viewCountReducer,
  detailCandidate: detailCandidateReducer,
  field: fieldReducer,
});
