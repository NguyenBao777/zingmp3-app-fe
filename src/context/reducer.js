export const actionType = {
	SET_USER: "SET_USER",
	SET_CURRENTSONG: "SET_CURRENTSONG",
	SET_PLAYLIST: "SET_PLAYLIST",
	SET_ARTISTS: "SET_ARTISTS",
	SET_ALBUMS: "SET_ALBUMS",
	SET_ISPLAY: "SET_ISPLAY",
	// filter types
	SET_FILTER_TERM: "FILTER_TERM",
	SET_FILTER_ARTIST: "FILTER_ARTIST",
	SET_FILTER_ALBUM: "FILTER_ALBUM",
	SET_FILTER_LANGUAGE: "FILTER_LANGUAGE",
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionType.SET_USER:
			return {
				...state,
				user: action.user,
			};

		case actionType.SET_CURRENTSONG:
			return {
				...state,
				currentsong: action.currentsong,
			};
		case actionType.SET_PLAYLIST:
			return {
				...state,
				playlist: action.playlist,
			};

		case actionType.SET_ARTISTS:
			return {
				...state,
				artists: action.artists,
			};

		case actionType.SET_ALBUMS:
			return {
				...state,
				albums: action.albums,
			};
		case actionType.SET_ISPLAY:
			return {
				...state,
				isPlay: action.isPlay,
			};
		// Filter case

		case actionType.SET_FILTER_ALBUM:
			return {
				...state,
				filterAlbum: action.filterAlbum,
			};
		case actionType.SET_FILTER_ARTIST:
			return {
				...state,
				filterArtist: action.filterArtist,
			};
		case actionType.SET_FILTER_LANGUAGE:
			return {
				...state,
				filterLanguage: action.filterLanguage,
			};

		default:
			return state;
	}
};

export default reducer;
