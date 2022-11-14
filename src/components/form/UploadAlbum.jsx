import { useState } from 'react'
import { motion } from "framer-motion";
import { BsTrash } from 'react-icons/bs';
import CloudUpload from "../../assets/images/icons/empty-upload-dark.png";
import isEmpty from 'validator/lib/isEmpty';
import { addNewAlbum } from '../../helpers/helperAPI';
import { Alert } from "../../components";
import { useStateValue } from '../../context/StateProvider';

const UploadAlbum = () => {
    const [msgValidation, setMsgValidation] = useState("");
    const [tempCover, setTempCover] = useState("");
    const [fileCover, setFileCover] = useState(null);
    const [albumName, setAlbumName] = useState("");
    const [albumDesc, setAlbumDesc] = useState("");
    const [albumStatus, setAlbumStatus] = useState(false);
    const [alert, setAlert] = useState("");
    const [{ playlist, user }, dispatch] = useStateValue([]);

    const handleUploadCover = (e) => {
        setTempCover(URL.createObjectURL(e[0]));
        setFileCover(e[0]);
    }

    const validation = () => {
        const msg = {};

        if (isEmpty(albumName)) {
            msg.album_name = "Vui lòng nhập Tên bài hát.";
        }

        if (isEmpty(albumDesc)) {
            msg.album_desc = "Vui lòng nhập Lời bài hát.";
        }

        // if (tempCover === "") {
        //     msg.album_file = "Vui lòng thêm Hình ảnh.";
        // }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);
        if (Object.keys(msg).length > 0) return true;

        return false;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        formData.append("user_id", user?.id);
        formData.append("album_name", albumName);
        formData.append("album_files", fileCover);
        formData.append("album_desc", albumDesc);
        formData.append("album_item", playlist);
        formData.append("album_status", albumStatus ? "public" : "private");

        addNewAlbum(formData).then((res) => {
            if (res.data.success) {
                setAlert({
                    type: "success",
                    message: "Upload Successfully!"
                });
                setTimeout(() => setAlert(""), 2000);
                setAlbumName("");
                setAlbumDesc("");
                setFileCover(null);
                setTempCover("");
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
            className="my-4 w-full flex flex-wrap items-center justify-center"
            initial={{ opacity: 0.5, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -1000 }}
        >

            {alert !== "" && (<Alert alert={alert} />)}
            <form encType="multipart/form-data" className="w-full md:w-1/2 flex flex-col items-center bg-gradient-to-b from-primary to-headerColor rounded-md oveflow-hidden"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="w-full flex flex-col items-center justify-center gap-4 p-2">
                    <div className="w-full">
                        <label htmlFor="album_name" className="cursor-pointer text-md font-semibold text-white">Tên Album:</label>
                        <input id="album_name" value={albumName} name="album_name" type="text" placeholder="Album Name" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setAlbumName(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.album_name ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.album_name}
                        </p>
                    </div>

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

                    <p className="text-red-700 font-light ml-2 text-xs italic">
                        <span className={`${msgValidation?.album_file ? "visible" : "invisible"}`}>* </span>
                        {msgValidation?.album_file}
                    </p>
                    <div className="w-full">
                        <label htmlFor="album_desc" className="cursor-pointer text-md font-semibold text-white">Mô tả Album:</label>
                        <textarea rows={5} value={albumDesc} id="album_desc" name="album_desc" type="text" placeholder="Album Desc" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setAlbumDesc(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.album_desc ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.album_desc}
                        </p>
                    </div>
                    <div className="w-full flex items-center gap-4">
                        <label htmlFor="album_desc" className="cursor-pointer text-md font-semibold text-white">Công khai Album:</label>
                        <input type="checkbox" name="" id="" className="h-4 w-4 cursor-pointer"
                            onChange={() => setAlbumStatus(!albumStatus)}
                        />
                    </div>
                </div>

                <button type="submit" className="w-150 text-white bg-green-600 hover:bg-green-900 transition-all duration-75 ease-in-out flex items-center justify-center rounded-md px-4 py-1 m-4">Thêm</button>
            </form>
        </motion.div>
    )
}

export default UploadAlbum
