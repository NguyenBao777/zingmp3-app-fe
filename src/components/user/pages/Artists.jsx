import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllArtists, getAllPost, getOneUser, public_server } from '../../../helpers/helperAPI';
import { CarouselArtists } from "../../../components";
import Masonry from 'react-masonry-css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const PostItem = ({ data }) => {
    const [liked, setLiked] = useState(false);
    const [anounLike, setAnounLike] = useState(Math.floor(Math.random() * 1000));
    const [artist, setArtist] = useState("");
    useEffect(() => {
        getOneUser(data?.user_id).then((res) => {
            if (res.data.success) setArtist(res.data.message);
        });
    }, []);

    const handleLiked = () => {
        if (liked) {
            setLiked(false);
            setAnounLike(anounLike - 1);
        } else {
            setLiked(true);
            setAnounLike(anounLike + 1);
        }
    }

    return (
        <div className="flex flex-col gap-2 rounded-md bg-slate-400/25 p-2 hover:bg-slate-400/75 transition-all duration-150 ease-in-out">
            <div className="flex items-center gap-4">
                <img src={`${public_server}/users/${artist?.user_avatar}`} alt="" className="object-cover h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                    <p className="text-white text-base font-semibold">{artist?.user_name}</p>
                    <p className="text-slate-300 text-xs">{data?.created_at}</p>
                </div>
            </div>
            <p className="text-white text-base">
                {data?.post_content}
            </p>
            {data?.post_image && (
                <img src={`${public_server}/posts/${data?.post_image}`} alt="" className="object-cover w-full rounded-md" />
            )}
            <div className="flex items-center gap-6">
                <div className="flex gap-2 items-center">
                    {liked ? (
                        <AiFillHeart className="text-pink-500 text-2xl cursor-pointer" onClick={handleLiked} />
                    ) : (
                        <AiOutlineHeart className="text-white text-2xl cursor-pointer" onClick={handleLiked} />
                    )}
                    <p className="text-white text-sm">{anounLike}</p>
                </div>
            </div>
        </div>
    )
}

const Artists = () => {
    const [listArtists, setListArtists] = useState([]);
    const [listPosts, setListPosts] = useState([]);
    const masonryObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1
    }
    useEffect(() => {
        getAllArtists().then((res) => {
            if (res.data.success) setListArtists(res.data.message);
        });
        getAllPost().then((res) => {
            if (res.data.success) setListPosts(res.data.message);
        });
    }, []);

    return (
        <div className="w-full flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase">Nghệ sĩ nổi bật</h4>
            <CarouselArtists />
            <h4 className="text-white font-semibold uppercase">Bài đăng mới</h4>
            <Masonry className="masonry-grid gap-4 my-2"
                columnClassName="masonry-grid-column"
                breakpointCols={masonryObj}
            >
                {listPosts.length > 0 && listPosts.map((post, i) => (
                    <PostItem data={post} key={i} />
                ))}
            </Masonry>
        </div>
    )
}

export default Artists