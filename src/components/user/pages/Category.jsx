import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllCategory, public_server } from '../../../helpers/helperAPI';

const CategoryItem = ({ data }) => {

    return (
        <Link to="/" className="relative group w-fit rounded-md overflow-hidden">
            <img src={data?.category_img ? `${public_server}/categories/${data?.category_img}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGsVphEBcygve8B_47NkxMU4kknl5IsYKOBbRCFcAlj6cyvEJBVBasyehi89vtuBw-Bw&usqp=CAU"} alt=""
                className="object-cover w-[200px] h-[100px] drop-shadow-md group-hover:scale-125 transition-all duration-200 ease-in-out" />
            <p className="absolute bottom-1 left-0 w-full bg-black/50 text-white text-center text-base">
                {data?.category_name || "Shiina Sora"}
            </p>
        </Link>
    )
}

const Category = () => {
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        if (listCategory.length <= 0) {
            getAllCategory(10).then((res) => {
                if (res.data.success) setListCategory(res.data.message);
            });
        }
    }, []);
    return (
        <section className="w-full flex flex-wrap items-center justify-center gap-4">
            {listCategory.length > 0 && listCategory.map((category, i) => (
                <CategoryItem key={i} data={category} />
            ))}
            {/* <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem />
            <CategoryItem /> */}
        </section>
    )
}

export default Category
