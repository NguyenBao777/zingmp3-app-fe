import React from 'react'
import { BsTrash } from 'react-icons/bs';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { public_server } from '../../helpers/helperAPI';

const PlaylistItem = ({ index, song }) => {
    const [{ currentsong, playlist }, dispatch] = useStateValue();

    const handleRemoveSong = (e) => {
        e.stopPropagation();
        dispatch({
            type: actionType.SET_PLAYLIST,
            playlist: playlist.filter((item) => item?.id !== song?.id)
        })
    }

    return (
        <div className={`${currentsong?.id === song?.id ? "bg-pink-600/25" : ""} relative group w-full cursor-pointer flex items-center justify-between gap-2 hover:bg-white/25 hover:shadow-md rounded-sm transtion-all duraton-75 ease-in-out p-2`}
            onClick={() => dispatch({
                type: actionType.SET_CURRENTSONG,
                currentsong: song
            })}
        >
            <p className="text-white text-base">{index + 1}</p>
            <img src={`${public_server}/songs/${song?.song_cover}`} alt="" className="object-cover w-10 h-10 rounded-md" />
            <div className="flex flex-1 flex-col items-start justify-center">
                <p className="text-white text-base">{song?.song_name}</p>
                <p className="text-gray-600/75 text-xs">{song?.artist_name}</p>
            </div>
            <p className="text-white text-sm">{song?.song_duration}</p>
            <div className="cursor-pointer h-6 w-6 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear p-1"
                onClick={(e) => handleRemoveSong(e)}
            >
                <BsTrash className="text-xs text-white" />
            </div>
        </div>
    )
}

export default PlaylistItem
