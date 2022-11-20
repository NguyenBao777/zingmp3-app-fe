import { useState, useEffect } from "react";
import { SongItem, Pagination } from "../../../components";
import { getNewSong } from "../../../helpers/helperAPI";

const NewSong = () => {
    const [listNewSong, setListNewSong] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getNewSong(currentPage, itemsPerPage).then((res) => {
            if (res.data.success) {
                setListNewSong(res.data.message);
                setTotalPages(res.data.total);
            };
        });
    }, []);

    useEffect(() => {
        getNewSong(currentPage, itemsPerPage).then((res) => {
            if (res.data.success) {
                setListNewSong(res.data.message);
                setTotalPages(res.data.total);
            };
        });
    }, [currentPage]);

    return (
        <section className="w-full flex flex-col gap-4">
            {listNewSong.length > 0 && listNewSong.map((song, i) => (
                <SongItem key={i} song={song} index={i} />
            ))}
            <Pagination itemsPerPage={itemsPerPage} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </section>
    )
}

export default NewSong
