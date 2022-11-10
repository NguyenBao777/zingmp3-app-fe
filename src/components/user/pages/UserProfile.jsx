import { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsPlayCircle, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../../context/StateProvider'
import { deleteAlbum, getAllAlbums, public_server } from '../../../helpers/helperAPI';
import NotLogin from "../../../assets/images/icons/NotLogin.png";
import { EditUserForm } from '../../../components';

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
                        <p className="text-black text-xs">Bạn có muốn xóa album này?</p>
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
    useEffect(() => {
        getAllAlbums(user?.id).then((res) => {
            if (res.data.success) setListUserAlbums(res.data.message);
        });
    }, []);

    return (
        <div className="w-full h-full">
            <div className="flex justify-center flex-wrap my-2">
                <div className="w-full md:w-1/2 rounded-md bg-white p-2 shadow-md flex flex-col items-center gap-2">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-blue-600 relative">
                        <img src={user?.user_avatar ? `${public_server}/users/${user?.user_avatar}` : NotLogin} alt="" className="w-14 h-14 rounded-full object-cover" />
                        {user?.user_role === "artist" && (
                            <BsFillCheckCircleFill className="absolute bottom-1 -right-1 text-blue-600 bg-white rounded-full" />
                        )}
                    </div>
                    <p className="text-black text-base font-semibold">{user?.user_name} <span className="text-md text-black">- {user?.user_role}</span></p>
                    <p className="text-black text-xs">Ngày sinh: {user?.user_birthday} tại: {user?.user_country}</p>
                    <p className="text-black text-xs">Tiểu sử: {user?.user_desc}</p>
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
            </div>
        </div >
    )
}

export default UserProfile