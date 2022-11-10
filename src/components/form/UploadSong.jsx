import { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { BsTrash } from 'react-icons/bs';
import CloudUpload from "../../assets/images/icons/empty-upload-dark.png";
import isEmpty from 'validator/lib/isEmpty';
import { addNewSong, getAllCategory } from '../../helpers/helperAPI';
import { Alert } from "../../components";
import { useStateValue } from '../../context/StateProvider';

const UploadSong = () => {
    const [msgValidation, setMsgValidation] = useState("");
    const [listCategory, setListCategoru] = useState([]);
    const [tempCover, setTempCover] = useState("");
    const [fileCover, setFileCover] = useState(null);
    const [fileAudio, setFileAudio] = useState(null);
    const [songName, setSongName] = useState("");
    const [songDuration, setSongDuration] = useState("");
    const [songLyric, setSongLyric] = useState("");
    const [author, setAuthor] = useState("");
    const [artist, setArtist] = useState("");
    const [category, setCategory] = useState("");
    const [alert, setAlert] = useState("");
    const [{ user }, dispatch] = useStateValue();
    const handleUploadCover = (e) => {
        setTempCover(URL.createObjectURL(e[0]));
        setFileCover(e[0]);
    }

    useEffect(() => {
        getAllCategory().then((res) => {
            if (res.data.success) setListCategoru(res.data.message);
        });
    }, []);

    const validation = () => {
        const msg = {};

        if (isEmpty(songName)) {
            msg.song_name = "Vui lòng nhập Tên bài hát.";
        }

        if (isEmpty(author)) {
            msg.author_name = "Vui lòng nhập Tên tác giả.";
        }

        if (isEmpty(artist)) {
            msg.artist_name = "Vui lòng nhập Tên ca sĩ.";
        }

        if (isEmpty(songLyric)) {
            msg.song_lyric = "Vui lòng nhập Lời bài hát.";
        }

        if (tempCover === "") {
            msg.song_file = "Vui lòng thêm Hình ảnh.";
        }

        if (fileAudio === null) {
            msg.song_file = "Vui lòng thêm file nhạc.";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);
        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleUploadAudio = (e) => {
        setFileAudio(e.target.files[0]);
        const audio = new Audio(URL.createObjectURL(e.target.files[0]));
        audio.addEventListener("canplay", function () {
            const durationMinutes = Math.floor(this.duration / 60) >= 10 ? Math.floor(this.duration / 60) : "0" + Math.floor(this.duration / 60);
            const durationSeconds = Math.floor(this.duration % 60) >= 10 ? Math.floor(this.duration % 60) : "0" + Math.floor(this.duration % 60);
            const SongDuration = `${durationMinutes}:${durationSeconds}`;
            setSongDuration(SongDuration)
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        formData.append("song_name", songName);
        formData.append("artist_id", user?.id);
        formData.append("song_files", fileCover);
        formData.append("song_files", fileAudio);
        formData.append("song_lyric", songLyric);
        formData.append("song_duration", songDuration);
        formData.append("song_author", author);
        formData.append("song_artist", artist);
        formData.append("category_id", category);
        addNewSong(formData).then((res) => {
            if (res.data.success) {
                setAlert({
                    type: "success",
                    message: "Upload Successfully!"
                });
                setTimeout(() => setAlert(""), 2000);
                setSongName("");
                setArtist("");
                setAuthor("");
                setSongLyric("");
                setFileCover(null);
                setFileAudio(null);
                setTempCover("");
                setCategory("");
            } else {
                setAlert({
                    type: "error",
                    message: "Upload False!"
                });
                setTimeout(() => setAlert(""), 2000);
            }
        });
    }

    return (
        <motion.div
            className="my-4"
            initial={{ opacity: 0.5, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -1000 }}
        >
            {alert !== "" && (<Alert alert={alert} />)}
            <form encType="multipart/form-data" className="w-full flex flex-wrap justify-center bg-blue-600/25 rounded-md oveflow-hidden"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4 p-2 border-r border-white">
                    <div className="w-full">
                        <label htmlFor="song_name" className="cursor-pointer text-md font-semibold text-white">Tên bài hát:</label>
                        <input id="song_name" value={songName} name="song_name" type="text" placeholder="User Name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setSongName(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.song_name ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.song_name}
                        </p>
                    </div>
                    <div className="w-full flex-wrap flex items-center justify-between gap-6">
                        <div className="w-32 h-32 flex items-center p-1 justify-center border-dotted border-2 border-white rounded-md">
                            {tempCover !== "" ? (
                                <div className="relative overflow-hidden w-full h-full rounded-md">
                                    <span className="absolute top-1 right-1 cursor-pointer h-6 w-6 rounded-full bg-red-600 flex items-center justify-center"
                                        onClick={() => setTempCover("")}
                                    >
                                        <BsTrash className="text-base text-white" />
                                    </span>
                                    <img src={tempCover} alt="" className="object-cover w-full h-full" />
                                </div>
                            ) : (
                                <label htmlFor="song_cover" className="cursor-pointer">
                                    <img src={CloudUpload} alt="" className="object-cover" />
                                </label>
                            )}
                            <input id="song_cover" name="song_cover" type="file" hidden accept="image/*"
                                onChange={(e) => handleUploadCover(e.target.files)}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="song_audio" className="cursor-pointer text-md font-semibold text-white">Thêm bài hát:</label>
                            <input id="song_audio" name="song_audio" type="file" accept="audio/*" className="cursor-pointer ml-2 border border-white rounded-md px-2 py-1"
                                onChange={(e) => handleUploadAudio(e)}
                            />
                        </div>
                    </div>

                    <div className="w-full flex items-center gap-4">
                        <label htmlFor="song_category" className="cursor-pointer text-md font-semibold text-white">Thể loại bài hát:</label>
                        <select value={category} id="song_category" className="cursor-pointer outline-none rounded-sm"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" className="text-center cursor-pointer">-------------</option>
                            {listCategory.length > 0 && listCategory.map((category, i) => (
                                <option key={i} value={category?.id} className="text-center cursor-pointer">{category?.category_name}</option>
                            ))}
                        </select>
                    </div>

                    <p className="text-red-700 font-light ml-2 text-xs italic">
                        <span className={`${msgValidation?.song_file ? "visible" : "invisible"}`}>* </span>
                        {msgValidation?.song_file}
                    </p>
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <div className="w-full">
                        <label htmlFor="song_lyric" className="cursor-pointer text-md font-semibold text-white">Lời bài hát:</label>
                        <textarea rows={5} value={songLyric} id="song_lyric" name="song_lyric" type="text" placeholder="Lời bài hát" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setSongLyric(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.song_lyric ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.song_lyric}
                        </p>
                    </div>


                    <div className="w-full">
                        <label htmlFor="author_name" className="cursor-pointer text-md font-semibold text-white">Tên tác giả:</label>
                        <input id="author_name" value={author} name="author_name" type="text" placeholder="Authorauthor Name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.author_name ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.author_name}
                        </p>
                    </div>
                    <div className="w-full">
                        <label htmlFor="artist_name" className="cursor-pointer text-md font-semibold text-white">Tên ca sĩ:</label>
                        <input id="artist_name" value={artist} name="artist_name" type="text" placeholder="Artist Name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setArtist(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.artist_name ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.artist_name}
                        </p>
                        { }
                    </div>
                </div>
                <button type="submit" className="text-white bg-green-600 hover:bg-green-900 transition-all duration-75 ease-in-out flex items-center justify-center rounded-md px-4 py-1 m-4">Thêm</button>
            </form>
        </motion.div>
    )
}

export default UploadSong
