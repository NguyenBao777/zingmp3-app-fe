import { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots, BsTrash } from 'react-icons/bs'
import { MdPlaylistPlay } from 'react-icons/md';
import { useStateValue } from '../../context/StateProvider';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { PlaylistItem, Alert } from "../../components";
import { actionType } from '../../context/reducer';
import { addToAlbum, getAllAlbums, public_server } from '../../helpers/helperAPI';

const AlbumItem = ({ data, setAlert }) => {
    const [showMsg, setShowMsg] = useState(false);
    const [{ playlist }, dispatch] = useStateValue([]);

    const addSongToAlbum = () => {
        if (playlist.length > 0) {
            const formData = {
                album_code: data?.album_code,
                playlist: playlist
            };
            addToAlbum(formData).then((res) => {
                if (res.data.success) {
                    setAlert({
                        type: "success",
                        message: res.data.message
                    });
                    setTimeout(() => setAlert(""), 2000);
                } else {
                    setAlert({
                        type: "error",
                        message: res.data.message
                    });
                    setTimeout(() => setAlert(""), 2000);
                }
            })
        }

        return
    }

    return (
        <div className="relative bg-gray-300 rounded-md w-14 h-14 hover:shadow-md transition-all duration-75 ease-in-out flex flex-col items-center justify-center gap-2"
            onClick={() => setShowMsg(!showMsg)}
        >
            <img src={`${public_server}/albums/${data?.album_cover}`} alt="" className="object-cover w-full h-full rounded-md" />
            <p className="text-[10px] text-white bg-black/25 text-center absolute bottom-1 left-0 w-full">{data?.album_name?.length > 9 ? data?.album_name.slice(0, 7) + "..." : data?.album_name}</p>

            {showMsg && (
                <div className="absolute top-16 left-0 z-10 bg-gray-300 rounded-md p-2 w-150">
                    <p className="text-black text-xs">Bạn có muốn thêm bài hát vào album này?</p>
                    <div className="flex items-center justify-evenly mt-2">
                        <div className="flex items-center justify-center w-[60px] text-white cursor-pointer px-2 rounded-full bg-headerColor"
                            onClick={addSongToAlbum}
                        >
                            yes
                        </div>
                        <div className="flex items-center justify-center w-[60px] text-white cursor-pointer px-2 rounded-full bg-gray-500"
                            onClick={() => setShowMsg(false)}
                        >
                            no
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


const Playlist = () => {
    const [showMenuPlaylist, setShowMenuPlaylist] = useState(false);
    const [listAlbum, setListAlbum] = useState([]);
    const [{ playlist, user }, dispatch] = useStateValue([]);
    const [alert, setAlert] = useState("");

    useEffect(() => {
        getAllAlbums(user?.id).then((res) => {
            if (res.data.success) setListAlbum(res.data.message);
        });
    }, []);

    const destroyPlaylist = () => {
        dispatch({
            type: actionType.SET_ISPLAY,
            isPlay: false
        });

        dispatch({
            type: actionType.SET_PLAYLIST,
            playlist: []
        });
    }

    return (
        <motion.div className="fixed top-0 right-0 bottom-0 z-20 bg-slate-600 shadow-md py-2 h-full pb-24 overflow-y-overlay scroll-custom transtion-all duration-200 ease-in-out"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 1000 }}
        >
            {alert !== "" && (<Alert alert={alert} />)}
            <div className="flex items-center justify-center gap-4 p-2 relative">
                <h4 className="text-white flex-1 text-center text-lg px-4">Danh sách đang phát</h4>
                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear"
                    onClick={() => setShowMenuPlaylist(!showMenuPlaylist)}
                >
                    <BsThreeDots className="text-2xl text-white" />
                </div>

                {showMenuPlaylist && (
                    <div className="absolute top-8 right-2 z-20 bg-headerColor py-2 rounded-md shadow-md flex flex-col items-center justify-center gap-2">
                        <div className="w-full px-4 py-2 cursor-pointer flex items-center justify-center gap-2 hover:bg-white/25 transiton-all duration-75 ease-in-out"
                            onClick={destroyPlaylist}
                        >
                            <BsTrash className="text-xl text-white" />
                            <p className="text-white text-base">Xóa danh sách phát</p>
                        </div>
                        <div className="w-full px-4 py-2 cursor-pointer flex items-center justify-center gap-2 hover:bg-white/25 transiton-all duration-75 ease-in-out relative group">
                            <MdPlaylistPlay className="text-xl text-white" />
                            <p className="text-white text-base">Thêm vào Album</p>

                            <div className="absolute top-8 -left-4 bg-headerColor shadow-md rounded-md group-hover:block hidden py-2">
                                <Link to={listAlbum.length >= 3 ? "" : "/upload"} className="group w-full px-4 py-2 cursor-pointer flex items-center justify-center gap-2 hover:bg-white/25 transiton-all duration-75 ease-in-out">
                                    <div className="flex items-center justify-center rounded-md border-2 border-stale-600 border-dotted hover:border-stale-400 transition-all duration-75 ease-in-out p-2">
                                        <AiOutlinePlus className="text-xl text-slate-600 group-hover:text-slate-400 transition-all duration-150 ease-in-out" />
                                    </div>
                                    <p className="text-white text-base">Thêm Album mới</p>
                                </Link>

                                <div className="flex flex-wrap items-center gap-3 p-2">
                                    {listAlbum.length > 0 && listAlbum.map((album, i) => (
                                        <AlbumItem data={album} key={i} setAlert={setAlert} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="pt-6 w-full flex flex-col items-center justify-center gap-2 px-1">
                {playlist.length > 0 && playlist.map((song, i) => (
                    <PlaylistItem key={i} index={i} song={song} />
                ))}
            </div>
        </motion.div>
    )
}

export default Playlist