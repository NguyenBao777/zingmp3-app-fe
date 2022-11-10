import { useState, useEffect } from "react";
import { SongItem } from "../../../components";
import { getNewSong } from "../../../helpers/helperAPI";

const NewSong = () => {
    const [listNewSong, setListNewSong] = useState([]);
    useEffect(() => {
        getNewSong().then((res) => {
            if (res.data.success) setListNewSong(res.data.message);
        });
    }, []);
    return (
        <section className="w-full flex flex-col gap-4">
            {listNewSong.length > 0 && listNewSong.map((song, i) => (
                <SongItem key={i} song={song} index={i} />
            ))}
        </section>
    )
}

export default NewSong
