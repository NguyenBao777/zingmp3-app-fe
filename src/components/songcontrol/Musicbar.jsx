import { FaRandom } from "react-icons/fa";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { BsMusicNoteList, BsPauseCircle, BsPlayCircle, BsThreeDots } from "react-icons/bs";
import { IoRepeatOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdOutlineLocalMovies } from "react-icons/md";
import { TbMicrophone2, TbPictureInPicture } from "react-icons/tb";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import IconIsPlay from "../../assets/images/icons/icon-playing.gif";
import { useStateValue } from "../../context/StateProvider";
import { public_server, updateSongListened } from "../../helpers/helperAPI";
import { actionType } from "../../context/reducer";

const Musicbar = ({ showPlaylist, setShowPlaylist }) => {
    const bgSrc = "./assets/images/bg-images/singbar.png";
    const [{ playlist, currentsong, isPlay }, dispatch] = useStateValue([]);
    const [showOption, setShowOPtion] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    // const [isPlay, setIsPlay] = useState(false);
    const [isReplay, setIsReplay] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRandom, setIsRandom] = useState(false);
    const [randomArr, setRandomArr] = useState([]);
    const audioRef = useRef();

    useEffect(() => {
        dispatch({
            type: actionType.SET_CURRENTSONG,
            currentsong: playlist[currentIndex]
        });
    }, [])

    useEffect(() => {
        dispatch({
            type: actionType.SET_CURRENTSONG,
            currentsong: playlist[currentIndex]
        })
        if (randomArr.length >= playlist.length) setRandomArr([]);

    }, [currentIndex]);

    useEffect(() => {
        if (!isPlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

    }, [isPlay, currentsong?.song_path]);
    const handleProgess = () => {

        const currentTimeMinutes = Math.floor(audioRef.current.currentTime / 60) >= 10 ? Math.floor(audioRef.current.currentTime / 60) : "0" + Math.floor(audioRef.current.currentTime / 60);
        const currentTimeSeconds = Math.floor(audioRef.current.currentTime % 60) >= 10 ? Math.floor(audioRef.current.currentTime % 60) : "0" + Math.floor(audioRef.current.currentTime % 60);
        const currentSongCurrentTime = `${currentTimeMinutes}:${currentTimeSeconds}`;
        const currentSongProgress = audioRef.current.currentTime / audioRef.current.duration * 100;

        dispatch({
            type: actionType.SET_CURRENTSONG,
            currentsong: { ...currentsong, currentTime: currentSongCurrentTime, progress: currentSongProgress, volume: audioRef.current.volume * 100 }
        });

    }

    const handleSeekSong = (e) => {
        const newCurrentTime = e.target.value / 100 * audioRef.current.duration;
        audioRef.current.currentTime = newCurrentTime;
    }

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value / 100
        dispatch({
            type: actionType.SET_CURRENTSONG,
            currentsong: { ...currentsong, volume: e.target.value }
        })
    }

    const numberRandom = () => {

        // 
        let number;
        let exist = [];
        do {
            number = Math.floor(Math.random() * playlist.length);
            exist = randomArr.filter((int) => int === number);
        } while (exist.length > 0 || currentsong?.id === playlist[number]?.id);
        setRandomArr([...randomArr, number]);
        return number;

    }

    const prev = () => {
        if (isRandom) {
            const number = numberRandom();
            setCurrentIndex(number);
        } else {
            if (currentIndex === 0) {
                setCurrentIndex(playlist.length - 1);
            } else {
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    const next = () => {
        if (isRandom) {
            const number = numberRandom();
            setCurrentIndex(number);
        } else {
            if (currentIndex === playlist.length - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    const handleEnded = () => {
        updateSongListened(currentsong.id);

        if (playlist.length === 1) {
            dispatch({
                type: actionType.SET_ISPLAY,
                isPlay: false
            });
        }

        if (!isReplay) next();
    }

    return (
        <>
            {fullScreen && (
                <motion.div className="fixed top-0 left-0 bottom-0 right-0 z-30 bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')] flex-1 flex items-center justify-center gap-10 px-4 pb-28 transition-all duration-200 ease-in-out"
                    initial={{ opacity: 0, y: 2000 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                >
                    <div className="cursor-pointer absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full bg-white/25 hover:bg-gray-600/25 transition-all duration-75 ease-linear"
                        onClick={() => setFullScreen(false)}
                    >
                        <MdKeyboardArrowDown className="text-2xl text-white" />
                    </div>
                    <div className="relative hidden md:block cursor-pointer group"
                        onClick={() => dispatch({
                            type: actionType.SET_ISPLAY,
                            isPlay: !isPlay
                        })}
                    >
                        <img src={`${public_server}/songs/${currentsong?.song_cover}`} alt="" className={`object-cover h-300 w-300 transition-all ease-linear ${isPlay ? "animate-spin duration-3000 rounded-full" : "rounded-md"}`} />
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
                    <p className="text-white text-3xl w-656 h-420 overflow-y-auto px-2 scroll-custom">
                        {currentsong?.song_lyric}
                    </p>

                </motion.div>
            )}

            <motion.div className="fixed bottom-0 left-0 z-30 w-full bg-[url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')] bg-repeat flex flex-col justify-between gap-4 px-4 py-2 z-30 transiton-all duration-150 ease-linear"
                initial={{ opacity: 0.5, x: -1000 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.5, x: -1000 }}
            >
                <audio ref={audioRef} muted={isMuted} loop={isReplay} src={`${public_server}/songs/${currentsong?.song_path}`} onTimeUpdate={handleProgess} onEnded={handleEnded}></audio>


                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="w-full hidden md:flex items-center gap-4 relative">
                        {isPlay && (
                            <img src={IconIsPlay} alt="" className="object-cover h-8 w-8 absolute bottom-1 left-1" />
                        )}
                        <img src={`${public_server}/songs/${currentsong?.song_cover}`} alt="" className="object-cover h-20 w-20 rounded-md" />
                        <div className="w-full">
                            <p className="text-white text-base font-semibold">{currentsong?.song_name}</p>
                            <p className="text-gray-400/50 text-sm">{currentsong?.artist_name}</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-center gap-2">
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center justify-center gap-6">
                                <div className={`${isRandom ? "shadow-inner shadow-md shadow-pink-600" : ""}  hover:text-pink-600 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear`}
                                    onClick={() => setIsRandom(!isRandom)}
                                >
                                    <FaRandom className={`text-base ${isRandom ? "text-pink-600" : "text-white"}`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-6">
                                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear"
                                    onClick={prev}
                                >
                                    <BiSkipPrevious className="text-2xl text-white" />
                                </div>
                            </div>
                            {isPlay ? (
                                <div className="shadow-inner shadow-md shadow-pink-600 cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                                    <BsPauseCircle className="text-pink-600 text-3xl cursor-pointer " onClick={() => dispatch({
                                        type: actionType.SET_ISPLAY,
                                        isPlay: !isPlay
                                    })} />
                                </div>
                            ) : (
                                <div className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                                    <BsPlayCircle className="text-white text-3xl cursor-pointer hover:text-pink-600 transition-all duration-75 ease-linear" onClick={() => dispatch({
                                        type: actionType.SET_ISPLAY,
                                        isPlay: !isPlay
                                    })} />
                                </div>
                            )}
                            <div className="flex items-center justify-center gap-6">
                                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear"
                                    onClick={next}
                                >
                                    <BiSkipNext className="text-2xl text-white" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-6">
                                <div className={`${isReplay ? "shadow-inner shadow-pink-600" : ""}  hover:text-pink-600 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear`}
                                    onClick={() => setIsReplay(!isReplay)}
                                >
                                    <IoRepeatOutline className={`text-2xl ${isReplay ? "text-pink-600" : "text-white"}`} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p className="text-white text-base">
                                {currentsong?.currentTime ? currentsong?.currentTime : "00:00"}
                            </p>
                            <input type="range" value={currentsong?.progress || 0} className="w-full rounded-full hover:h-[3.5px] h-[2.5px] transition-all duration-75 ease-linear bg-white/25 cursor-pointer"
                                onChange={(e) => handleSeekSong(e)}
                                onMouseDown={() => audioRef.current?.pause()}
                                onMouseUp={() => { if (isPlay) audioRef.current?.play() }}
                            />
                            <p className="text-white text-base">
                                {currentsong?.song_duration ? currentsong?.song_duration : "00:00"}
                            </p>
                        </div>
                    </div>
                    <div className="w-full hidden md:flex items-center justify-center gap-4">

                        <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                            <MdOutlineLocalMovies className="text-2xl text-white" />
                        </div>


                        <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear"
                            onClick={() => setFullScreen(!fullScreen)}
                        >
                            <TbMicrophone2 className="text-2xl text-white" />
                        </div>


                        <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                            <TbPictureInPicture className="text-2xl text-white" />
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <div className="flex items-center justify-center gap-6">
                                <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                                    {(audioRef.current?.muted === true || currentsong?.volume <= 0) ? (
                                        <FiVolumeX className="text-2xl text-white" onClick={() => setIsMuted(false)} />
                                    ) : (
                                        <FiVolume2 className="text-2xl text-white" onClick={() => setIsMuted(true)} />
                                    )}
                                </div>
                            </div>
                            <input type="range" value={audioRef.current?.muted ? 0 : (currentsong?.volume || 0)} className="w-full rounded-full hover:h-[3.5px] h-[2.5px] transition-all duration-75 ease-linear bg-white/25 cursor-pointer"
                                onChange={(e) => handleVolumeChange(e)}
                            />
                        </div>



                        <div className={`${showPlaylist ? "bg-pink-600/50" : "bg-white/25"} cursor-pointer h-8 w-8 flex items-center justify-center rounded-md hover:bg-white/50 transition-all duration-75 ease-linear`}
                            onClick={() => setShowPlaylist(!showPlaylist)}
                        >
                            <BsMusicNoteList className="text-2xl text-white" />
                        </div>

                    </div>

                    <div className="flex md:hidden items-center justify-center gap-6">
                        <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear"
                            onClick={() => setShowOPtion(!showOption)}
                        >
                            <BsThreeDots className="text-2xl text-white" />
                        </div>
                    </div>
                    {showOption && (
                        <motion.div className="absolute bottom-24 right-1 bg-primary px-1 py-2 rounded-md shadow-md"
                            initial={{ opacity: 0.25, y: 200 }}
                            animate={{ opacity: 1, y: 1 }}
                            exit={{ opacity: 0.25, y: 200 }}
                        >
                            <div className="w-full flex items-center gap-4 relative">
                                {isPlay && (
                                    <img src={IconIsPlay} alt="" className="object-cover h-8 w-8 absolute bottom-1 left-1" />
                                )}
                                <img src={`${public_server}/songs/${currentsong?.song_cover}`} alt="" className="object-cover rounded-md h-20 w-20" />
                                <div className="w-full">
                                    <p className="text-white text-base font-semibold">{currentsong?.song_name}</p>
                                    <p className="text-gray-400/50 text-sm">{currentsong?.artist_name}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="flex items-center justify-center gap-6">
                                    <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                                        {(audioRef.current?.muted === true || currentsong.volume <= 0) ? (
                                            <FiVolumeX className="text-2xl text-white" onClick={() => setIsMuted(false)} />
                                        ) : (
                                            <FiVolume2 className="text-2xl text-white" onClick={() => setIsMuted(true)} />
                                        )}
                                    </div>
                                </div>
                                <input type="range" value={audioRef.current?.muted ? 0 : (currentsong.volume || 0)} className="w-full rounded-full hover:h-[3.5px] h-[2.5px] transition-all duration-75 ease-linear bg-white/25 cursor-pointer"
                                    onChange={(e) => handleVolumeChange(e)}
                                />
                            </div>
                            <div className={`${showPlaylist ? "bg-pink-600/50" : "bg-white/25"} cursor-pointer h-8 w-8 flex items-center justify-center rounded-md hover:bg-white/50 transition-all duration-75 ease-linear`}
                                onClick={() => setShowPlaylist(!showPlaylist)}
                            >
                                <BsMusicNoteList className="text-2xl text-white" />
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </>
    )
}

export default Musicbar
