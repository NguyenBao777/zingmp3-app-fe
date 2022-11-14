import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { public_server, searchSongs } from "../../helpers/helperAPI";
import { SongItem } from "../../components";
import { useStateValue } from "../../context/StateProvider";
import IconIsPlay from "../../assets/images/icons/icon-playing.gif"
import { actionType } from "../../context/reducer";
import { Link } from "react-router-dom";

const Searchbar = () => {
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchSongResult, setSearchSongResult] = useState([]);
    const [keySearch, setKeySearch] = useState("");
    const [{ currentsong, isPlay, playlist }, dispatch] = useStateValue();

    useEffect(() => {
        if (keySearch !== "") {
            searchSongs(keySearch).then((res) => {
                if (res.data.success) setSearchSongResult(res.data.message);
            });
        } else {
            setSearchSongResult([]);
            setShowSearchBox(false);
        }

        // if (searchSongResult.length === 0) setShowSearchBox(false);
    }, [keySearch]);


    const handleSetPlaylist = (data) => {
        const exist = playlist.find((song) => song?.song_path === data?.song_path);
        if (!exist) {
            dispatch({
                type: actionType.SET_PLAYLIST,
                playlist: [...playlist, data]
            });
        }

        dispatch({
            type: actionType.SET_CURRENTSONG,
            currentsong: data
        })

        dispatch({
            type: actionType.SET_ISPLAY,
            isPlay: true
        });

        setShowSearchBox(false);
    }


    return (
        <div className="w-full rounded-full relative">
            <div className={`${showSearchBox ? "bg-primary" : "bg-white/25"} p-2 rounded-full absolute -top-5 w-full z-20 focus-within:bg-primary transition-all duration-75 ease-in-out`}>
                <div className="flex items-center gap-2">
                    <BsSearch className="text-2xl text-white" />
                    <input type="text" value={keySearch} placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." className="focus-within:bg-primary bg-transparent border-none outline-none transition-all duration-75 ease-in-out text-white placeholder:text-white w-full"
                        onChange={(e) => setKeySearch(e.target.value)}
                        onFocus={() => setShowSearchBox(true)}
                    // onBlur={() => setShowSearchBox(false)}
                    />
                </div>
            </div>
            {showSearchBox && searchSongResult.length > 0 && (
                <div className="bg-gradient-to-b from-primary to-headerColor rounded-md w-full absolute -top-1 left-0 z-10 pt-10 px-2 py-2 overflow-hidden">
                    <h4 className="text-white mb-2">Kết quả tìm kiếm</h4>
                    <Link to={`/searchresult/${keySearch}`} className="p-2 flex items-center gap-4 w-full hover:bg-white/25 transition-all duration-150 ease-in-out rounded-md" onClick={() => setTimeout(() => { setShowSearchBox(false) }, 500)}>
                        <BsSearch className="text-base text-white" />
                        <p className="text-white text-base">{keySearch}</p>
                    </Link>
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto scroll-custom">
                        {searchSongResult.length > 0 && searchSongResult.map((song, i) => (
                            <div key={i} className="w-full flex items-center gap-4 cursor-pointer hover:bg-white/25 rounded-md p-2"
                                onClick={() => handleSetPlaylist(song)}
                            >
                                <div className="relative">
                                    <img src={`${public_server}/songs/${song?.song_cover}`} alt="" className="object-cover h-12 w-12 rounded-md" />
                                    {currentsong && currentsong?.song_path === song?.song_path && isPlay && (
                                        <img src={IconIsPlay} alt="" className="object-cover h-6 w-6 absolute bottom-1 left-1" />
                                    )}
                                </div>
                                <div className="flex flex-col justify-center w-full">
                                    <p className="text-white text-base whitespace-nowrap">{song?.song_name}</p> {/* > 15 ? song?.song_name.slice(0, 10) + "..." : song?.song_name*/}
                                    <p className="text-sm text-slate-400">{song?.author_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Searchbar