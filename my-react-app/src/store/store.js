import { legacy_createStore as createStore, combineReducers } from 'redux';
import { FavouriteCities } from '../reducers/favouriteCities';
// import { CurrentCity } from '../reducers/currentCity';

const store = createStore(FavouriteCities);

export default store;