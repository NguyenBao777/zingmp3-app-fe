import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { public_server, searchAlbums, searchArtist, searchSongs } from '../../../helpers/helperAPI';
import { SongItem } from "../../../components";
const SearchResult = () => {
    const [listSongs, setListSongs] = useState([]);
    const [listAlbums, setListAlbums] = useState([]);
    const [listArtists, setListArtists] = useState([]);
    const keywords = useParams().keywords;

    useEffect(() => {
        searchSongs(keywords).then((res) => {
            if (res.data.success) setListSongs(res.data.message);
        });
        searchAlbums(keywords).then((res) => {
            if (res.data.success) setListAlbums(res.data.message);
        });
        searchArtist(keywords).then((res) => {
            if (res.data.success) setListArtists(res.data.message);
        });
    }, []);

    return (
        <div className="w-full flex flex-col justify-center gap-4">
            <h4 className="text-white font-bold text-lg uppercase">Nghệ sĩ</h4>
            <div className="w-full flex flex-wrap items-center gap-4">
                {listArtists.length > 0 && listArtists.map((artist, i) => (
                    <Link to={`/artistprofile/${artist?.id}`} key={i} className="w-full md:w-[30%] bg-white/25 hover:bg-white/50 transition-all duration-150 ease-in-out rounded-md flex flex-wrap gap-4 p-2">
                        <img src={`${public_server}/users/${artist?.user_avatar}`} alt="" className="object-cover h-24 w-24 rounded-full" />
                        <div className="">
                            <p className="text-slate-400 text-sm">Nghệ sĩ</p>
                            <p className="text-white text-base font-bold">{artist?.user_name}</p>
                            <p className="text-white text-base italic"> Ngày sinh: <span className="text-slate-400">{artist?.user_birthday}</span></p>
                        </div>
                    </Link>
                ))}
            </div>
            <h4 className="text-white font-bold text-lg uppercase">Albums</h4>
            <div className="flex flex-wrap items-center gap-4">
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
            <h4 className="text-white font-bold text-lg uppercase">Bài hát</h4>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {listSongs.length > 0 && listSongs.map((song, i) => (
                    <SongItem song={song} index={i} key={i} />
                ))}
            </div>
        </div>
    )
}

export default SearchResult
