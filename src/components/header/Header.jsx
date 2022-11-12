import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiFillSetting, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheck, AiOutlineCloudUpload, AiOutlineSkin } from "react-icons/ai";
import { IoDiamond, IoNewspaperOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { CgUnavailable } from "react-icons/cg";
import { MdArrowForwardIos, MdOutlineHighQuality } from "react-icons/md";
import { RiAdvertisementLine, RiErrorWarningLine } from "react-icons/ri";
import { BsShieldCheck, BsTelephone } from "react-icons/bs";
import { GiQueenCrown } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Searchbar, LoginForm, RegistationForm, Alert } from "../../components";
import NotLogin from "../../assets/images/icons/NotLogin.png";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { FaTimes } from "react-icons/fa";
import { public_server } from "../../helpers/helperAPI";

const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [showMenu, setShowMenu] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSettingMenu, setShowSettingMenu] = useState(false);
    const [showRegistationForm, setShowRegistationForm] = useState(false);
    const [alert, setAlert] = useState("");

    useEffect(() => {
        const rememberUser = JSON.parse(localStorage.getItem("user"));
        if (rememberUser !== null) {
            dispatch({
                type: actionType.SET_USER,
                user: rememberUser
            });
        }

    }, []);

    const handleShowLoginForm = () => {
        if (user) {
            setShowMenu(!showMenu);
        } else {
            setShowLoginForm(true);
        }
    }

    const handleShowSettingMenu = (e) => {
        e.stopPropagation();
        setShowSettingMenu(!showSettingMenu);
    }

    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: actionType.SET_USER,
            user: null
        });
        localStorage.setItem("user", null);
        setShowMenu(false);
    }
    return (

        <>
            <header className="w-[calc(100%-6.8rem)] md:w-[calc(100%-7.4rem)] lg:w-[calc(100%-14rem)] flex items-center justify-between px-2 py-1 gap-4 bg-headerColor fixed top-0 right-0 drop-shadow-md z-20">
                <div className="hidden md:flex items-center justify-center gap-4">
                    <AiOutlineArrowLeft className="text-3xl cursor-pointer text-white/75 hover:text-white transition-all duration-150 ease-linear" />
                    <AiOutlineArrowRight className="text-3xl cursor-pointer text-white/75 hover:text-white transition-all duration-150 ease-linear" />
                </div>
                <Searchbar />
                <div className="w-auto xl:w-225 flex items-center justify-end gap-2 xl:ml-28 relative"
                    onClick={handleShowLoginForm}
                >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                        <img src={user?.user_avatar ? `${public_server}/users/${user?.user_avatar}` : NotLogin} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div className={`hidden xl:block`}>
                        <p className="text-white text-base font-semibold">{user?.user_name || "Đăng nhập"}</p>
                        <p className="text-white text-[12px] flex items-center gap-2"><GiQueenCrown /> VIP member</p>
                    </div>
                    {showMenu && (
                        <div className="bg-primary w-[175px] rounded-md shadow-md flex flex-col justify-center gap-4 absolute top-12 -left-34 md:-left-7 py-2 px-1">
                            <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                <div className="bg-white/25 flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
                                    <AiOutlineSkin className="text-xl text-white" />
                                </div>
                                <p className="text-white text-xs md:text-sm">Chủ đề</p>
                            </div>

                            <div className={`w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer relative ${showSettingMenu ? "bg-gray-300/25" : ""}`}
                                onClick={(e) => handleShowSettingMenu(e)}
                            >
                                <div className="bg-white/25 flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
                                    <AiFillSetting className="text-xl text-white" />
                                </div>
                                <p className="text-white text-xs md:text-sm">Cài đặt</p>
                                {showSettingMenu && (
                                    <div className="drop-shadow-md px-1 py-2 rounded-md bg-primary absolute -top-16 -left-48 z-20">
                                        <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                            <CgUnavailable className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Danh sách chặn</p>
                                        </div>

                                        <div className="group w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer relative">
                                            <MdOutlineHighQuality className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Chất lượng nhạc</p>
                                            <MdArrowForwardIos className="text-xl text-white" />

                                            <div className="group-hover:block hidden w-[250px] px-1 py-2 absolute top-8 md:top-0 left-0 md:left-[-15rem] z-30 drop-shadow-md bg-primary rounded-md">
                                                <div className="w-full p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-full">
                                                            <p className="text-white text-base font-semibold">SQ &#9679; 128</p>
                                                            <p className="text-gray-300/50 text-xs md:text-sm">Giảm sử dụng dữ liệu cho các kết nối chậm hơn.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-full">
                                                            <p className="text-white text-base font-semibold">HQ &#9679; 320</p>
                                                            <p className="text-gray-300/50 text-xs md:text-sm">Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.</p>
                                                        </div>
                                                        <AiOutlineCheck className="text-xl text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-[0.25px] my-1 w-auto bg-gray-200/50 mx-4"></div>

                                        <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                            <RiErrorWarningLine className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Giới thiệu</p>
                                        </div>

                                        <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                            <BsTelephone className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Liên hệ</p>
                                        </div>

                                        <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                            <RiAdvertisementLine className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Quảng cáo</p>
                                        </div>

                                        <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                            <IoNewspaperOutline className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Thỏa thuận sử dụng</p>
                                        </div>

                                        <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                            <BsShieldCheck className="text-xl text-white" />
                                            <p className="text-white text-xs md:text-sm">Chính sách bảo mật</p>
                                        </div>
                                    </div>
                                )}

                            </div>
                            <div className="h-[0.25px] w-auto bg-gray-200/50 mx-4"></div>

                            <Link to="/upload" className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="bg-white/25 flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
                                    <AiOutlineCloudUpload className="text-xl text-white" />
                                </div>
                                <p className="text-white text-xs md:text-sm">Tải lên</p>
                            </Link>

                            <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer">
                                <div className="bg-white/50 flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
                                    <IoDiamond className="text-xl text-white" />
                                </div>
                                <p className="text-white text-xs md:text-sm">Nâng cấp VIP</p>
                            </div>
                            <div className="w-full flex items-center gap-2 p-1 hover:bg-gray-300/25 hover:drop-shadow-md transition-all duration-75 ease-linear rounded-md cursor-pointer"
                                onClick={(e) => handleLogout(e)}
                            >
                                <div className="flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
                                    <IoIosLogOut className="text-xl text-white" />
                                </div>
                                <p className="text-white text-xs md:text-sm">Đăng xuất</p>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            {showLoginForm && (
                <div className="fixed top-0 left-0 bottom-0 right-0 z-20 flex items-center justify-center bg-white/25">
                    {alert !== "" && (<Alert alert={alert} />)}

                    <span className="absolute top-14 right-2 w-6 h-6 cursor-pointer flex items-center justify-center p-2 rounded-full bg-red-600 hover:bg-red-800 transtion-all duration-150 ease-in-out"
                        onClick={() => setShowLoginForm(false)}
                    >
                        <FaTimes className="text-xl text-white" />
                    </span>
                    {!showRegistationForm ? (
                        <LoginForm setAlert={setAlert} setShowLoginForm={setShowLoginForm} setShowRegistationForm={setShowRegistationForm} />
                    ) : (
                        <RegistationForm setAlert={setAlert} setShowLoginForm={setShowLoginForm} setShowRegistationForm={setShowRegistationForm} />
                    )
                    }
                </div>)}
        </>
    )
}

export default Header