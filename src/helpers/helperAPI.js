import axios from "axios";
// const baseUrl = "http://localhost:4000";
const baseUrl = "https://zingmp3-app-be-deploy-nguyenbao777.vercel.app";
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

export const getAllArtists = async () => {
	const res = await axios.get(`${baseUrl}/user/getall`);

	return res;
};
/********************* songs API: ***************************/
export const addNewSong = async (formData) => {
	const res = await axios.post(`${baseUrl}/song/addnew`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

	return res;
};

export const getNewSong = async (pages = 1, limit = 10) => {
	const res = await axios.get(`${baseUrl}/song/getnew/${pages}/${limit}`);

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

export const getSongByCategory = async (categoryID, pages = 1, limit = 5) => {
	const res = await axios.get(`${baseUrl}/song/getbycategory/${categoryID}/${pages}/${limit}`);

	return res;
};

export const getSongByArtistID = async (artistID) => {
	const res = await axios.get(`${baseUrl}/song/getbyartist/${artistID}`);

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

/********************* Post API: ***************************/
export const addNewPost = async (formData) => {
	const res = await axios.post(`${baseUrl}/post/addnew`, formData);

	return res;
};

export const getAllPost = async (limit = 3, pages = 1) => {
	const res = await axios.get(`${baseUrl}/post/getall/${limit}/${pages}`);

	return res;
};

export const getPostByArtist = async (artistID) => {
	const res = await axios.get(`${baseUrl}/post/getbyartist/${artistID}`);

	return res;
};

export const deletePost = async (postID) => {
	const res = await axios.delete(`${baseUrl}/post/delete/${postID}`);

	return res;
};

export const editPost = async (formData) => {
	const res = await axios.put(`${baseUrl}/post/edit`, formData);

	return res;
};
