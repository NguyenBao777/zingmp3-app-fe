import { useState, useEffect } from 'react'
import { AiOutlineCheckCircle, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsPlayCircle, BsTrash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider'
import { deleteAlbum, deletePost, editPost, getAllAlbums, getPostByArtist, public_server } from '../../../helpers/helperAPI';
import NotLogin from "../../../assets/images/icons/NotLogin.png";
import { EditUserForm } from '../../../components';
import Masonry from 'react-masonry-css';
import { MdOutlineCancel } from 'react-icons/md';
import isEmpty from 'validator/lib/isEmpty';

const PostItem = ({ data, setListPosts }) => {
    const [{ user }, dispatch] = useStateValue();
    const [postContent, setPostContent] = useState(data?.post_content);
    const [showEditPost, setShowEditPost] = useState(false);
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [msgValidation, setMsgValidation] = useState("");

    const validation = () => {
        const msg = {};

        if (isEmpty(postContent)) {
            msg.post_content = "Vui lòng nhập nội dung bài đăng.";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);
        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleDeletePost = () => {
        deletePost(data?.id).then((res) => {
            setShowDeleteBox(false);
            getPostByArtist(user?.id).then((res) => {
                if (res.data.success) setListPosts(res.data.message);
            });
        });
    }

    const handleEditPost = () => {
        if (validation()) return;
        // handleEditPost
        const formData = {
            post_content: postContent,
            post_id: data?.id
        }
        editPost(formData).then((res) => {
            if (res.data.success) {
                setShowEditPost(false);
                data.post_content = postContent;
            }
        });
    }

    return (
        <div className="flex flex-col gap-2 rounded-md bg-gradient-to-b from-primary to-headerColor p-2 shadow-md">
            <div className="flex items-center gap-4">
                <img src={`${public_server}/users/${user?.user_avatar}`} alt="" className="object-cover h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                    <p className="text-white text-base font-semibold">{user?.user_name}</p>
                    <p className="text-slate-300 text-xs">{data?.created_at}</p>
                </div>
            </div>
            {showEditPost ? (
                <>
                    <textarea rows="5" value={postContent} className="border-none outline-none bg-transparent text-white"
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                    <p className="text-red-700 font-light ml-2 text-xs italic">
                        <span className={`${msgValidation?.post_content ? "visible" : "invisible"}`}>* </span>
                        {msgValidation?.post_content}
                    </p>
                    <div className="flex items-center justify-end gap-4">
                        <button className="flex items-center justify-center w-[45px] bg-green-600 hover:bg-green-800 transition-all duration-150 ease-in-out rounded-md px-2 py-1"
                            onClick={handleEditPost}
                        >
                            <AiOutlineCheckCircle className="text-white text-2xl" />
                        </button>
                        <button className="flex items-center justify-center w-[45px] bg-red-600 hover:bg-red-800 transition-all duration-150 ease-in-out rounded-md px-2 py-1"
                            onClick={() => setShowEditPost(false)}
                        >
                            <MdOutlineCancel className="text-white text-2xl" />
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-white text-base">
                    {data?.post_content}
                </p>
            )}
            {data?.post_image && (
                <img src={`${public_server}/posts/${data?.post_image}`} alt="" className="object-cover w-full rounded-md" />
            )}
            <div className="flex items-center gap-4 relative">
                <button className="flex items-center justify-center gap-2 px-2 py-1 bg-red-600 hover:bg-red-800 transition-all duration-150 ease-in-out rounded-md"
                    onClick={() => setShowDeleteBox(!showDeleteBox)}
                >
                    <BsTrash className="text-white text-2xl" />
                    <p className="text-white text-base">Xóa</p>
                </button>

                <button className="flex items-center justify-center gap-2 px-2 py-1 bg-green-600 hover:bg-green-800 transition-all duration-150 ease-in-out rounded-md"
                    onClick={() => setShowEditPost(!showEditPost)}
                >
                    <AiOutlineEdit className="text-white text-2xl" />
                    <p className="text-white text-base">Sửa</p>
                </button>

                {showDeleteBox && (
                    <div className="absolute top-0 left-0 rounded-md bg-gradient-to-b from-primary to-headerColor p-2">
                        <p className="text-white text-xs">Sau khi xóa sẽ không thể hoàn tác. Bạn chắc chắn muốn xóa bài đăng này?</p>
                        <div className="flex items-center justify-evenly mt-2">
                            <div className="flex items-center justify-center w-[60px] text-white cursor-pointer px-2 rounded-full bg-primary"
                                onClick={handleDeletePost}
                            >
                                yes
                            </div>
                            <div className="flex items-center justify-center w-[60px] text-white cursor-pointer px-2 rounded-full bg-gray-500"
                                onClick={() => setShowDeleteBox(false)}
                            >
                                no
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AlbumItem = ({ data, setListUserAlbums }) => {
    const [showDeleteBox, setShowDeleteBox] = useState(false);
    const [{ user }, dispatch] = useStateValue();

    const handleDeleteAlbum = () => {
        deleteAlbum(data?.album_code).then(() => {
            getAllAlbums(user?.id).then((res) => {
                if (res.data.success) setListUserAlbums(res.data.message);
            });
        });
    }

    return (
        <div className="group flex flex-col items-center rounded-md hover:drop-shadow-md transition-all duration-150 ease-in-out">
            <div className="relative">
                <img src={`${public_server}/albums/${data?.album_cover}`} alt="" className="object-cover h-24 w-24 rounded-md" />
                <div className="absolute top-0 left-0 w-full h-full items-center justify-between gap-4 p-2 bg-black/25 hidden group-hover:flex">
                    <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear"
                        onClick={() => setShowDeleteBox(!showDeleteBox)}
                    >
                        <BsTrash className="text-2xl text-white" />
                    </div>
                    <Link to={`/albumdetail/${data?.album_code}`} className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/25 transition-all duration-75 ease-linear">
                        <BsPlayCircle className="text-2xl text-white" />
                    </Link>
                </div>

                {showDeleteBox && (
                    <div className="absolute top-16 -left-6 z-10 bg-gray-300 rounded-md p-2 w-150">
                        <p className="text-white text-xs">Bạn có muốn xóa album này?</p>
                        <div className="flex items-center justify-evenly mt-2">
                            <div className="flex items-center justify-center w-[60px] text-white cursor-pointer px-2 rounded-full bg-headerColor"
                                onClick={handleDeleteAlbum}
                            >
                                yes
                            </div>
                            <div className="flex items-center justify-center w-[60px] text-white cursor-pointer px-2 rounded-full bg-gray-500"
                                onClick={() => setShowDeleteBox(false)}
                            >
                                no
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-white text-base">{data?.album_name}</p>

        </div>
    );
}

const UserProfile = () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [{ user }, dispatch] = useStateValue();
    const [listUserAlbums, setListUserAlbums] = useState([]);
    const [listPosts, setListPosts] = useState([]);
    const masonryObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            getAllAlbums(user?.id).then((res) => {
                if (res.data.success) setListUserAlbums(res.data.message);
            });
            getPostByArtist(user?.id).then((res) => {
                if (res.data.success) setListPosts(res.data.message);
            });
        } else {
            navigate("/newsong", { replace: true });
        }
    }, []);

    return (
        <div className="w-full h-full">
            <div className="flex justify-center flex-wrap my-2">
                <div className="w-full md:w-1/2 rounded-md bg-gradient-to-b from-primary to-headerColor p-2 shadow-md flex flex-col items-center gap-2">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-blue-600 relative">
                        <img src={user?.user_avatar ? `${public_server}/users/${user?.user_avatar}` : NotLogin} alt="" className="w-14 h-14 rounded-full object-cover" />
                        {user?.user_role === "artist" && (
                            <BsFillCheckCircleFill className="absolute bottom-1 -right-1 text-blue-600 bg-white rounded-full" />
                        )}
                    </div>
                    <p className="text-white text-base font-semibold">{user?.user_name} <span className="text-md text-white">- {user?.user_role}</span></p>
                    <p className="text-white text-xs">Ngày sinh: {user?.user_birthday} tại: {user?.user_country}</p>
                    <p className="text-white text-xs">Tiểu sử: {user?.user_desc}</p>
                    <button className="flex items-center justify-center rounded-md bg-green-600 hover:bg-green-800 text-white px-4 py-1 transiton-all duration-150 ease-in-out"
                        onClick={() => setShowEditForm(!showEditForm)}
                    >
                        Sửa thông tin
                    </button>
                </div>
                <div className={`${showEditForm ? "w-full md:w-1/2" : "w-0"}`}>
                    {showEditForm && (
                        <EditUserForm />
                    )}
                </div>

            </div>
            <div className="w-full">
                <h4 className="w-full text-xl text-white uppercase">Albums của {user?.user_name}</h4>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-4">
                    <Link to={listUserAlbums.length >= 3 ? "" : "/upload"} className="group flex flex-col items-center rounded-md overflow-hidden hover:drop-shadow-md transition-all duration-150 ease-in-out">
                        <div className="relative rounded-md w-24 h-24 flex items-center justify-center border-2 border-slate-600 border-dotted group-hover:border-slate-400 transtion-all duration-150 ease-in-out">
                            <AiOutlinePlus className="text-2xl text-slate-600 group-hover:text-slate-400 transtion-all duration-150 ease-in-out" />
                        </div>

                        <p className="text-white text-base">Thêm Album mới</p>

                    </Link>
                    {listUserAlbums.length > 0 && listUserAlbums.map((album, i) => (
                        <AlbumItem key={i} data={album} setListUserAlbums={setListUserAlbums} />
                    ))}
                </div>
                <h4 className="w-full text-xl text-white uppercase my-3">Bài đăng của {user?.user_name}</h4>
                <Masonry className="masonry-grid gap-4 my-2"
                    columnClassName="masonry-grid-column"
                    breakpointCols={masonryObj}
                >
                    {listPosts.length > 0 && listPosts.map((post, i) => (
                        <PostItem data={post} key={i} setListPosts={setListPosts} />
                    ))}
                </Masonry>
            </div>
        </div >
    )
}

export default UserProfile