import { useState, useEffect } from 'react'
import { BsPlayCircle, BsPlayFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import IconIsPlay from "../../../assets/images/icons/icon-playing.gif";
import { SongItem } from "../../../components";
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { getAlbumDetails, getOneAlbum, public_server } from '../../../helpers/helperAPI';

const AlbumDetail = () => {
    const albumCode = useParams().albumcode;
    const [album, setAlbum] = useState(null);
    const [listSongs, setListSongs] = useState([]);
    const [{ playlist, currentsong, isPlay }, dispatch] = useStateValue();
    useEffect(() => {
        getAlbumDetails(albumCode).then((res) => {
            if (res.data.success) setListSongs(res.data.message);
        });
        getOneAlbum(albumCode).then((res) => {
            if (res.data.success) setAlbum(res.data.message);
        });
    }, []);

    useEffect(() => {
        getAlbumDetails(albumCode).then((res) => {
            if (res.data.success) setListSongs(res.data.message);
        });
    }, [playlist]);

    const handlePlaySong = () => {
        if (playlist.length > 0) {
            dispatch({
                type: actionType.SET_ISPLAY,
                isPlay: !isPlay
            });
        } else {
            dispatch({
                type: actionType.SET_PLAYLIST,
                playlist: listSongs
            });

            dispatch({
                type: actionType.SET_ISPLAY,
                isPlay: !isPlay
            });
        }
    }

    return (
        <div className="w-full flex flex-wrap justify-center">
            <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-2 p-2">
                <div className="group rounded-md w-60 h-60 overflow-hidden cursor-pointer relative"
                    onClick={handlePlaySong}
                >
                    <img src={currentsong ? `${public_server}/songs/${currentsong?.song_cover}` : `${public_server}/albums/${album?.album_cover}`} alt=""
                        className={`${isPlay ? "animate-spin duration-3000 rounded-full" : "rounded-md hover:scale-125"} object-cover w-full h-full transition-all duration-200 ease-in-out`} />
                    {!isPlay && (
                        <div className="hidden group-hover:flex items-center justify-center absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <BsPlayCircle className="text-[3.5rem] text-white" />
                        </div>
                    )}
                    {isPlay && (
                        <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <img src={IconIsPlay} alt="" className="object-cover h-8 w-8" />
                        </div>
                    )}
                </div>
                <p className="text-xl font-semibold text-white">{album?.album_name}</p>
                <p className="text-slate-400 text-sm italic">Câp nhật ngày: {album?.updated_at}</p>
                <button className="flex items-center justify-center gap-1 rounded-full px-4 py-2 bg-pink-500 text-white"
                    onClick={() => dispatch({
                        type: actionType.SET_PLAYLIST,
                        playlist: listSongs
                    })}
                >
                    <BsPlayFill className="text-white text-2xl" />
                    Phát toàn bộ Album
                </button>
            </div>
            <div className="w-full lg:w-2/3 p-2 flex flex-col items-center justify-center gap-2">
                {listSongs.length > 0 && listSongs.map((song, i) => (
                    <SongItem song={song} index={i} key={i} />
                ))}
            </div>
        </div>
    )
}

export default AlbumDetail
