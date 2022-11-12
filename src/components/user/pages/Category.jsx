import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllCategory, getSongByCategory, public_server } from '../../../helpers/helperAPI';
import { SongItem } from '../../../components';

const CategoryItem = ({ data, setCategoryID }) => {

    return (
        <div className="relative group w-fit rounded-md overflow-hidden cursor-pointer"
            onClick={() => setCategoryID(data?.id)}
        >
            <img src={`${public_server}/categories/${data?.category_img}`} alt=""
                className="object-cover w-[200px] h-[100px] drop-shadow-md group-hover:scale-125 transition-all duration-200 ease-in-out" />
            <p className="absolute bottom-1 left-0 w-full bg-black/50 text-white text-center text-base">
                {data?.category_name}
            </p>
        </div>
    )
}

const Category = () => {
    const [categoryID, setCategoryID] = useState(0);
    const [listCategory, setListCategory] = useState([]);
    const [listSongs, setListSongs] = useState([]);
    useEffect(() => {
        if (listCategory.length <= 0) {
            getAllCategory(10).then((res) => {
                if (res.data.success) {
                    setListCategory(res.data.message);
                    setCategoryID(listCategory[0]?.id);
                }
            });
        }
    }, []);

    useEffect(() => {
        getSongByCategory(categoryID).then((res) => {
            if (res.data.success) setListSongs(res.data.message);
        })
    }, [categoryID]);

    return (
        <section className="w-full">
            <div className="w-full flex flex-wrap items-center justify-center gap-4">
                {listCategory.length > 0 && listCategory.map((category, i) => (
                    <CategoryItem key={i} data={category} setCategoryID={setCategoryID} />
                ))}
            </div>
            <div className="flex flex-col justify-center gap-2">
                {listSongs.length > 0 && listSongs.map((song, i) => (
                    <SongItem song={song} index={i} key={i} />
                ))}
            </div>
        </section>
    )
}

export default Category
