import { useEffect, useState } from 'react';
import { getTop100 } from '../../../helpers/helperAPI';
import { SongItem } from "../../../components";

const TopOneHundred = () => {
    const [listTop100, setListTop100] = useState([]);
    useEffect(() => {
        getTop100().then((res) => {
            if (res.data.success) setListTop100(res.data.message);
        });
    }, []);

    return (
        <section className="w-full flex flex-col gap-4">
            {listTop100.length > 0 && listTop100.map((song, i) => (
                <SongItem key={i} song={song} index={i} />
            ))}
        </section>
    )
}

export default TopOneHundred
