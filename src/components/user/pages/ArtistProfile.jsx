import { useState, useEffect } from 'react';
import { SongItem } from "../../../components";
import { IoCloseOutline } from 'react-icons/io5';
import zmaAward from "../../../assets/images/icons/zma.svg";
import { BsPlayCircle, BsPlayFill } from 'react-icons/bs';
import IconIsPlay from "../../../assets/images/icons/icon-playing.gif";
import { getAllAlbums, getOneUser, getSongByArtistID, public_server } from '../../../helpers/helperAPI';
import { actionType } from '../../../context/reducer';
import { useStateValue } from '../../../context/StateProvider';
import { Link, useParams } from 'react-router-dom';

const ArtistProfile = () => {
    const [readMore, setReadMore] = useState(false);
    const [listSongs, setListSongs] = useState([]);
    const [listAlbums, setListAlbums] = useState([]);
    const [artist, setArtist] = useState(null);
    const [{ playlist, currentsong, isPlay }, dispatch] = useStateValue();
    const artistID = useParams().id;


    useEffect(() => {
        getOneUser(artistID).then((res) => {
            if (res.data.success) setArtist(res.data.message);
        });

        getSongByArtistID(artistID).then((res) => {
            if (res.data.success) setListSongs(res.data.message);
        });

        getAllAlbums(artistID).then((res) => {
            if (res.data.success) setListAlbums(res.data.message);
        });
    }, []);

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
        <div className="">
            <div className="flex flex-wrap-reverse justify-between items-center gap-4">
                <div className="w-full lg:w-2/3">
                    <div className="flex items-center gap-4">
                        <h4 className="text-4xl font-bold text-white">{artist?.user_name}</h4>
                        <img src={zmaAward} alt="" className="object-cover w-8 h-8" />
                    </div>
                    {artist?.user_desc.length > 193 ? (
                        <p className="text-base text-white">
                            {artist?.user_desc.slice(0, 193) + "..."}
                            <span className="text-white uppercase cursor-pointer hover:text-blue-800 transition-all duration-150 ease-in-out"
                                onClick={() => setReadMore(!readMore)}
                            >Xem thêm</span>
                        </p>
                    ) : (
                        <p className="text-base text-white">
                            {artist?.user_desc}
                        </p>
                    )
                    }

                </div>
                <img src={`${public_server}/users/${artist?.user_avatar}`} alt="" className="object-cover h-52 w-52 rounded-full" />
            </div>

            <h4 className="text-white font-semibold uppercase my-4">Bài hát</h4>

            <div className="w-full flex flex-wrap justify-center">
                <div className="w-full lg:w-1/3 flex flex-col justify-center items-center gap-2 p-2">
                    <div className="group rounded-md w-60 h-60 overflow-hidden cursor-pointer relative"
                        onClick={handlePlaySong}
                    >
                        <img src={currentsong ? `${public_server}/songs/${currentsong?.song_cover}` : `${public_server}/users/${artist?.user_avatar}`} alt=""
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
                    <button className="flex items-center justify-center gap-1 rounded-full px-4 py-2 bg-pink-500 text-white"
                        onClick={() => dispatch({
                            type: actionType.SET_PLAYLIST,
                            playlist: listSongs
                        })}
                    >
                        <BsPlayFill className="text-white text-2xl" />
                        Phát toàn bộ
                    </button>
                </div>
                <div className="w-full lg:w-2/3 p-2 flex flex-col items-center justify-center gap-2">
                    {listSongs.length > 0 && listSongs.map((song, i) => (
                        <SongItem song={song} index={i} key={i} />
                    ))}
                </div>
            </div>
            <h4 className="text-white font-semibold uppercase my-4">Album công bố</h4>
            <div className="flex items-center flex-wrap">
                {listAlbums.length > 0 && listAlbums.map((album, i) => (
                    <Link key={i} to={`/albumdetail/${album?.album_code}`} className="bg-white/25 hover:bg-white/50 transition-all duration-150 ease-in-out rounded-md flex gap-4 p-2 md:w-[30%] w-full">
                        <img src={`${public_server}/albums/${album?.album_cover}`} alt="" className="object-cover h-24 w-24 rounded-md" />
                        <div className="">
                            <p className="text-slate-400 text-sm">Album</p>
                            <p className="text-white text-base font-bold">{album?.album_name}</p>
                            <p className="text-slate-400 text-base">{album?.album_desc.length > 40 ? album?.album_desc.slice(0, 37) + "..." : album?.album_desc}</p>
                        </div>
                    </Link>
                ))}
            </div>



            {readMore && (
                <div className="fixed z-30 bg-black/75 top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                    <div className="relative w-[350px] bg-gradient-to-b from-primary to-headerColor rounded-md flex flex-col gap-4 p-4 items-center">
                        <span className="absolute top-1 right-1 cursor-pointer" onClick={() => setReadMore(false)}>
                            <IoCloseOutline className="text-2xl text-white" />
                        </span>
                        <img src={`${public_server}/users/${artist?.user_avatar}`} alt="" className="object-cover h-32 w-32 rounded-full" />
                        <h4 className="text-lg text-white uppercase font-bold">{artist?.user_name}</h4>
                        <div className="max-h-[300px] text-slate-300 overflow-y-auto">{artist?.user_desc}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ArtistProfile