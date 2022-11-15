import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsJournalAlbum, BsNewspaper, BsMusicNoteList, BsMusicNote } from "react-icons/bs";
import { AiOutlinePlayCircle, AiOutlinePlus } from "react-icons/ai";
import { FiDisc } from "react-icons/fi";
import { TbWaveSawTool } from "react-icons/tb";
import { VscRadioTower } from "react-icons/vsc";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import LogoSmall from "../../assets/images/logo/ZingMP3smalllogo.png";
import LogoLarge from "../../assets/images/logo/ZingMP3largerlogo.svg.png";
import { useStateValue } from '../../context/StateProvider';
import { activeStyles, noActiveStyles } from '../../helpers/activeStyle';



const Sidebar = () => {
    const [{ playlist, user }, dispatch] = useStateValue([]);
    return (
        <nav className={`flex flex-col items-center justify-between gap-2 py-2 bg-white/25 fixed top-0 bottom-0 left-0 shadow-md ${playlist?.length > 0 ? "h-[calc(100%-80px)] md:h-[calc(100%-96px)]" : "h-full"} z-0`}>
            <Link to="/" className="px-2 w-full items-center justify-center hidden lg:flex">
                <img src={LogoLarge} alt="" className="w-150" />
            </Link>
            <Link to="/" className="w-full flex justify-center items-center lg:hidden">
                <img src={LogoSmall} alt="" className="w-[80px]" />
            </Link>
            <div className="w-full h-full flex flex-1 flex-col justify-between items-start gap-2">
                <NavLink to="/userprofile" className={({ isActive }) => isActive ? activeStyles : noActiveStyles}>
                    <span className="flex items-center gap-4">
                        <BsJournalAlbum className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-4xl lg:text-2xl" />
                        <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                            Cá nhân
                        </p>
                    </span>
                    <AiOutlinePlayCircle className="hidden lg:block text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-150 ease-linear" />
                </NavLink>

                <NavLink to="/newsong" className={({ isActive }) => isActive ? activeStyles : noActiveStyles}>
                    <FiDisc className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-4xl lg:text-2xl" />
                    <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                        Khám phá
                    </p>
                </NavLink>

                <NavLink to="/zingchart" className={({ isActive }) => isActive ? activeStyles : noActiveStyles}>
                    <span className="flex items-center gap-4">
                        <TbWaveSawTool className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-4xl lg:text-2xl" />
                        <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                            #zingchart
                        </p>
                    </span>
                    <AiOutlinePlayCircle className="hidden lg:block text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-150 ease-linear" />
                </NavLink>

                {/* <NavLink to="/" className={({ isActive }) => isActive ? activeStyles : noActiveStyles}>
                    <span className="flex items-center gap-4">
                        <VscRadioTower className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-4xl lg:text-2xl" />
                        <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                            Radio <span className="bg-red-600 text-white text-[8px] rounded-md py-1 px-3">LIVE</span>
                        </p>
                    </span>
                    <AiOutlinePlayCircle className="hidden lg:block text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-150 ease-linear" />
                </NavLink> */}

                <NavLink to="/artists" className={({ isActive }) => isActive ? activeStyles : noActiveStyles}>
                    <BsNewspaper className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-4xl lg:text-2xl" />
                    <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                        Theo dõi
                    </p>
                </NavLink>
                <div className="h-[0.25px] w-auto bg-gray-200 mx-4"></div>

                <div className="flex flex-col justify-center gap-2 max-h-[150px] overflow-y-auto scroll-custom">
                    {/* <div className="hidden md:block w-auto p-4 text-white bg-primary rounded-md mx-4">
                        <p className="text-white font-semibold text-xs w-190 mb-2">
                            Đăng nhập để khám phá playlist dành riêng cho bạn.
                        </p>

                        <div className="flex items-center justify-center cursor-pointer border border-white hover:text-white/75 hover:border-white/75 transition-all duration-150 ease-linear rounded-full px-6 py-1 text-sm uppercase">
                            Đăng nhập
                        </div>
                    </div>

                    <div className="hidden md:block w-auto p-4 text-white bg-gradient-to-r from-blue-700 to-primary rounded-md mx-4">
                        <p className="text-white font-semibold text-xs w-190 mb-2">
                            Nghe nhạc không quảng cáo cùng kho nhạc VIP.
                        </p>

                        <div className="flex items-center justify-center cursor-pointer text-black bg-yellow-500 hover:bg-yellow-600 transition-all duration-150 ease-linear rounded-full px-6 py-1 text-sm uppercase">
                            Nâng cấp VIP
                        </div>
                    </div> */}

                    <h4 className="group text-xs md:text-sm uppercase w-full text-white px-4 flex items-center justify-between">
                        Thư viện
                        <span className="group-hover:opacity-100 hover:bg-white/25 opacity-0 w-6 h-6 rounded-full cursor-pointer flex items-center justify-center transition-all duration-75 ease-linear">
                            <MdOutlineEdit className="text-white text-base" />
                        </span>
                    </h4>

                    <NavLink to="/" className="group flex items-center justify-center md:justify-between gap-4 px-6 py-1 transition-all duration-150 ease-linear">
                        <span className="flex items-center gap-4">
                            <span className="p-2 flex items-center justify-center bg-blue-600 rounded-lg">
                                <BsMusicNote className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-sm" />
                            </span>
                            <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                                Bài hát
                            </p>
                        </span>
                        <AiOutlinePlayCircle className="hidden md:block text-white text-2xl opacity-0 group-hover:opacity-100 transition-all duration-150 ease-linear" />
                    </NavLink>

                    <NavLink to="/" className="group flex items-center justify-center md:justify-start gap-4 px-6 py-1 transition-all duration-150 ease-linear">
                        <span className="p-2 flex items-center justify-center bg-green-600 rounded-lg">
                            <BsMusicNoteList className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-sm" />
                        </span>
                        <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                            Playlist
                        </p>
                    </NavLink>

                    <NavLink to="/" className="group flex items-center justify-center md:justify-start gap-4 px-6 py-1 transition-all duration-150 ease-linear">
                        <span className="p-2 flex items-center justify-center bg-yellow-600 rounded-lg">
                            <BiTimeFive className="text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-sm" />
                        </span>
                        <p className="hidden lg:block text-white/75 text-base font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                            Gần đây
                        </p>
                    </NavLink>
                </div>
            </div>

        </nav>
    )
}

export default Sidebar
