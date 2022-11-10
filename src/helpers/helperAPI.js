import axios from "axios";
const baseUrl = "http://localhost:4000";
export const public_server = `${baseUrl}/public`;
/********************* user API: ***************************/
export const userLogin = async (formData) => {
	const username = formData.username;
	const password = formData.password;

	const res = await axios.get(`${baseUrl}/user/login/${username}/${password}`);

	return res;
};

export const userRegistation = async (formData) => {
	const res = await axios.post(`${baseUrl}/user/addnew`, formData);

	return res;
};

export const getOneUser = async (id) => {
	const res = await axios.get(`${baseUrl}/user/getone/${id}`);

	return res;
};

export const editUser = async (formData) => {
	const res = await axios.put(`${baseUrl}/user/edit`, formData);

	return res;
};

export const searchArtist = async (keywords) => {
	const res = await axios.get(`${baseUrl}/user/search/${keywords}`);

	return res;
};
/********************* songs API: ***************************/
export const addNewSong = async (formData) => {
	const res = await axios.post(`${baseUrl}/song/addnew`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

	return res;
};

export const getNewSong = async () => {
	const res = await axios.get(`${baseUrl}/song/getnew`);

	return res;
};

export const getTop100 = async () => {
	const res = await axios.get(`${baseUrl}/song/gettop100`);

	return res;
};

export const updateSongListened = async (id) => {
	const data = { id };
	const res = await axios.put(`${baseUrl}/song/updatelistened`, data);

	return res;
};

export const getSongChart = async (name) => {
	const res = await axios.get(`${baseUrl}/song/getchart/${name}`);

	return res;
};

export const searchSongs = async (keywords) => {
	const res = await axios.get(`${baseUrl}/song/search/${keywords}`);

	return res;
};
/********************* Album API: ***************************/
export const addNewAlbum = async (formData) => {
	const res = await axios.post(`${baseUrl}/album/addnew`, formData);

	return res;
};

export const addToAlbum = async (formData) => {
	const res = await axios.post(`${baseUrl}/album/addsongtoalbum`, formData);

	return res;
};

export const getAllAlbums = async (id = null) => {
	const res = await axios.get(`${baseUrl}/album/getall/${id}`);

	return res;
};

export const getOneAlbum = async (albumCode) => {
	const res = await axios.get(`${baseUrl}/album/getone/${albumCode}`);

	return res;
};

export const getAlbumDetails = async (albumCode) => {
	const res = await axios.get(`${baseUrl}/album/getalbumdetail/${albumCode}`);

	return res;
};

export const deleteAlbum = async (albumCode) => {
	const res = await axios.delete(`${baseUrl}/album/delete/${albumCode}`);

	return res;
};

export const searchAlbums = async (keywords) => {
	const res = await axios.get(`${baseUrl}/album/search/${keywords}`);

	return res;
};

/********************* Category API: ***************************/
export const addNewCategory = async (formData) => {
	const res = await axios.post(`${baseUrl}/category/addnew`, formData);

	return res;
};

export const getAllCategory = async (limit = 0) => {
	const res = await axios.get(`${baseUrl}/category/getall/${limit}`);

	return res;
};
