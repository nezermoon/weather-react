import { AddToFavourites, RemoveFromFavourites } from '../actions'

const initialState = {
	favouriteCitiesList: [],
}

export const FavouriteCities = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVOURITES':
			return { ...state, favouriteCitiesList: [...state.favouriteCitiesList, { cityName: action.cityName, id: action.id }] }
		case 'REMOVE_FROM_FAVOURITES':
			return { ...state, favouriteCitiesList: state.favouriteCitiesList.filter(cityName => cityName.id !== action.id) }
		default:
			return state;
	}
}