import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BsPlayCircle } from 'react-icons/bs';
import { TbMicrophone2 } from 'react-icons/tb';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { public_server } from '../../helpers/helperAPI';

const SongItem = ({ song, index }) => {
    const [{ playlist, currentsong }, dispatch] = useStateValue([]);

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
        });
    }

    return (
        <div className={`${currentsong?.song_path === song?.song_path ? "bg-gradient-to-b from-primary to-headerColor shadow-md" : ""} group w-full px-4 py-2 rounded-md hover:bg-white/25 flex items-center justify-between gap-4`}>
            <span className="text-lg text-white font-bold">{index + 1}</span>
            <div className="flex flex-1 items-center gap-2">
                <div className="group relative">
                    <img src={`${public_server}/songs/${song?.song_cover}`} alt="" className="object-cover w-12 h-12 rounded-md" />
                    <div className="w-full h-full cursor-pointer flex items-center justify-center absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-linear"
                        onClick={() => handleSetPlaylist(song)}
                    >
                        <BsPlayCircle className="text-2xl text-white" />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-1">
                    <p className="text-white text-base">{song?.song_name?.length > 20 ? song?.song_name.slice(0, 16) + "..." : song?.song_name}</p>
                    <p className="text-gray-400/50 text-xs">{song?.artist_name}</p>
                </div>
            </div>
            <p className="text-gray-400/50 flex-1 text-xs hidden md:block">{song?.song_lyric?.length > 50 ? song?.song_lyric.slice(0, 50) + "..." : song?.song_lyric}</p>
            <div className="group-hover:opacity-100 opacity-0 hidden md:flex items-center justify-center gap-2">
                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                    <TbMicrophone2 className="text-2xl text-white" />
                </div>
                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                    <AiOutlineHeart className="text-2xl text-white" />
                </div>
                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                    <BsThreeDots className="text-2xl text-white" />
                </div>
            </div>
            <p className="text-white text-xs hidden md:block">{song?.song_duration}</p>
        </div>
    )
}

export default SongItem