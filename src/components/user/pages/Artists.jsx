import { useState, useEffect } from 'react'
import NotLogin from "../../../assets/images/icons/NotLogin.png";
import { getAllArtists, getAllPost, getOneUser, public_server } from '../../../helpers/helperAPI';
import { CarouselArtists } from "../../../components";
import Masonry from 'react-masonry-css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoCloseOutline } from 'react-icons/io5';

const PostItem = ({ data }) => {
    const [liked, setLiked] = useState(false);
    const [anounLike, setAnounLike] = useState(Math.floor(Math.random() * 1000));
    const [artist, setArtist] = useState("");
    const [readMore, setReadMore] = useState(false);

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
        <div className="flex flex-col gap-2 rounded-md bg-gradient-to-b from-primary to-headerColor p-2 shadow-md">
            <div className="flex items-center gap-4">
                <img src={artist?.user_avatar ? `${public_server}/users/${artist?.user_avatar}` : NotLogin} alt="" className="object-cover h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                    <p className="text-white text-base font-semibold">{artist?.user_name}</p>
                    <p className="text-slate-300 text-xs">
                        {data?.created_at}
                        <span className="text-xs">
                            {data?.created_at !== data?.updated_at ? " ● Đã chỉnh sửa" : ""}
                        </span>
                    </p>
                </div>
            </div>
            {data?.post_content && data?.post_content.length > 200 ? (

                <p className="text-base text-white">
                    {data?.post_content.slice(0, 193) + "..."}
                    <span className="text-white uppercase cursor-pointer hover:text-blue-800 transition-all duration-150 ease-in-out"
                        onClick={() => setReadMore(!readMore)}
                    >Xem thêm</span>
                </p>
            ) : (
                <p className="text-white text-base">{data?.post_content}</p>
            )}
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

            {readMore && (
                <div className="fixed z-30 bg-black/75 top-0 bottom-0 left-0 right-0 flex pt-3 justify-center">
                    <div className="relative w-[350px] md:w-[1000px] h-[80%] bg-gradient-to-b from-primary to-headerColor rounded-md flex flex-col gap-4 p-4">
                        <span className="absolute top-1 right-1 cursor-pointer" onClick={() => setReadMore(false)}>
                            <IoCloseOutline className="text-2xl text-white" />
                        </span>
                        <div className="flex items-center gap-4">
                            <img src={`${public_server}/users/${artist?.user_avatar}`} alt="" className="object-cover h-12 w-12 rounded-full" />
                            <div className="flex flex-col gap-2">
                                <p className="text-white text-base font-semibold">{artist?.user_name}</p>
                                <p className="text-slate-300 text-xs">
                                    {data?.created_at}
                                    <span className="text-xs">
                                        {data?.created_at !== data?.updated_at ? " ● Đã chỉnh sửa" : ""}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {data?.post_image && (
                                <div className="w-full md:w-1/2 p-2">
                                    <img src={`${public_server}/posts/${data?.post_image}`} alt="" className="object-cover w-full max-h-[200px] md:max-h-[350px] rounded-md" />
                                </div>
                            )}
                            <div className="w-full md:w-1/2">
                                <div className="max-h-[200px] md:max-h-[370px] text-slate-300 overflow-y-auto scroll-custom">
                                    {data?.post_content}
                                </div>

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
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

const Artists = ({ listPosts = [] }) => {
    const [listArtists, setListArtists] = useState([]);

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