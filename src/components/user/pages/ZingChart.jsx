import { useState, useEffect } from 'react'
import { BsPlayCircle } from 'react-icons/bs'
import { useStateValue } from '../../../context/StateProvider';
import { getSongChart, public_server } from "../../../helpers/helperAPI";
import { actionType } from "../../../context/reducer";

const ZingChartItem = ({ data, index }) => {
    let indexColor;
    if (index === 0) {
        indexColor = "text-red-600";
    } else if (index === 1) {
        indexColor = "text-yellow-600";
    } else if (index === 2) {
        indexColor = "text-green-600";
    } else {
        indexColor = "text-white";
    }

    const [{ playlist }, dispatch] = useStateValue([]);
    const handleSetPlaylist = () => {
        const exist = playlist.find((song) => song.id === data.id);
        if (!exist) {
            dispatch({
                type: actionType.SET_PLAYLIST,
                playlist: [...playlist, data]
            });
        }
    }

    return (
        <div className="w-full flex items-center justify-between gap-4 hover:bg-white/50 hover:shadow-md transition-all duration-150 ease-in-out rounded-md cursor-pointer p-2 ">
            <p className={`${indexColor} text-4xl font-bold font-chart`}>{index + 1}</p>
            <div className="relative group">
                <img src={`${public_server}/songs/${data?.song_cover}`} alt="" className="object-cover h-12 w-12 rounded-md" />
                <div className="absolute top-0 left-0 w-full h-full bg-white/25 hidden group-hover:flex items-center justify-center"
                    onClick={handleSetPlaylist}
                >
                    <BsPlayCircle className="text-2xl text-pink-600" />
                </div>
            </div>
            <div className="flex flex-col justify-center flex-1">
                <p className="text-white text-base">{data?.song_name?.length > 12 ? data?.song_name.slice(0, 12) + "..." : data?.song_name}</p>
                <p className="text-slate-400 text-xs font-italic">{data?.artist_name}</p>
            </div>
            <p className="text-white text-base">{data?.song_duration}</p>
        </div>
    )
}

const ZingChart = () => {
    const [listChartVPOP, setListChartVPOP] = useState([]);
    const [listChartUSUK, setListChartUSUK] = useState([]);
    const [listChartKPOP, setListChartKPOP] = useState([]);
    const [{ playlist }, dispatch] = useStateValue([]);
    useEffect(() => {
        getSongChart("VPOP").then((res) => {
            if (res.data.success) setListChartVPOP(res.data.message);
        });
        getSongChart("US-UK").then((res) => {
            if (res.data.success) setListChartUSUK(res.data.message);
        });
        getSongChart("KPOP").then((res) => {
            if (res.data.success) setListChartKPOP(res.data.message);
        });
    }, []);

    const handleSetPlaylist = (list) => {
        dispatch({
            type: actionType.SET_PLAYLIST,
            playlist: list,
        });
    }
    return (
        <div className="w-full">
            <h4 className="text-2xl font-bold uppercase text-white w-full">Bảng xếp hạng</h4>
            <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
                <div className="w-full lg:w-[30%] bg-white/25 rounded-md p-2 flex flex-col items-center gap-2">
                    <div className="group flex items-center gap-4 w-full justify-center cursor-pointer"
                        onClick={() => handleSetPlaylist(listChartVPOP)}>
                        <h4 className="text-white text-xl font-semibold uppercase group-hover:text-pink-600 transition-all duration-150 ease-in-out">
                            Vpop
                        </h4>
                        <BsPlayCircle className="text-2xl text-pink-600" />
                    </div>
                    {listChartVPOP.length > 0 && listChartVPOP.map((song, i) => (
                        <ZingChartItem data={song} index={i} key={i} />
                    ))}
                </div>
                <div className="w-full lg:w-[30%] bg-white/25 rounded-md p-2 flex flex-col items-center ">
                    <div className="group flex items-center gap-4 w-full justify-center cursor-pointer"
                        onClick={() => handleSetPlaylist(listChartUSUK)}>
                        <h4 className="text-white text-xl font-semibold uppercase group-hover:text-pink-600 transition-all duration-150 ease-in-out">
                            US-UK
                        </h4>
                        <BsPlayCircle className="text-2xl text-pink-600" />
                    </div>
                    {listChartUSUK.length > 0 && listChartUSUK.map((song, i) => (
                        <ZingChartItem data={song} index={i} key={i} />
                    ))}
                </div>
                <div className="w-full lg:w-[30%] bg-white/25 rounded-md p-2 flex flex-col items-center ">
                    <div className="group flex items-center gap-4 w-full justify-center cursor-pointer"
                        onClick={() => handleSetPlaylist(listChartKPOP)}>
                        <h4 className="text-white text-xl font-semibold uppercase group-hover:text-pink-600 transition-all duration-150 ease-in-out">
                            KPOP
                        </h4>
                        <BsPlayCircle className="text-2xl text-pink-600" />
                    </div>
                    {listChartKPOP.length > 0 && listChartKPOP.map((song, i) => (
                        <ZingChartItem data={song} index={i} key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ZingChart
