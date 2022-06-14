import { v4 as uuid } from 'uuid';

const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';

export function AddToFavourites(cityName) {
	return { type: ADD_TO_FAVOURITES, id: uuid().slice(0, 6), cityName }
}

export function RemoveFromFavourites(id) {
	return { type: REMOVE_FROM_FAVOURITES, id }
}

// export const SetCurrentCity = (cityName) => {
// 	return { type: SET_CURRENT_CITY, cityName }
// }
