import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import Logo from "../../assets/images/logo/ZingMP3largerlogo.svg.png";
import { useStateValue } from '../../context/StateProvider';
import NotLogin from "../../assets/images/icons/NotLogin.png"

const HeaderAdmin = () => {
    const [{ admin }, dispatch] = useStateValue();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <header className="fixed top-0 left-0 z-10 w-full bg-headerColor shadow-md flex items-center justify-between gap-4 px-4 py-1">
            <Link to="/dashboard" className="">
                <img src={Logo} alt="" className="object-cover w-150" />
            </Link>
            <nav className="flex-1 hidden md:flex items-center gap-4">
                <NavLink to="category" className="text-textColor text-base hover:text-white hover:font-semibold hover:drop-shadow-md transition-all duration-150 ease-in-out">
                    Thể loại
                </NavLink>
                <NavLink to="category" className="text-textColor text-base hover:text-white hover:font-semibold hover:drop-shadow-md transition-all duration-150 ease-in-out">
                    Slide
                </NavLink>
            </nav>
            <div className="flex items-center justify-center gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                    <img src={admin?.admin_image || NotLogin} alt="" className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-white text-base font-semibold">{admin?.admin_name || "Chưa đăng nhập"}</p>
                    <p className="text-textColor text-sm font-italic">{admin?.admin_role}</p>
                </div>
                <div className="flex items-center justify-center cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <AiOutlineMenu className="text-white text-2xl" />
                </div>
            </div>
            {showMenu && (
                <div className="fixed top-14 right-0 h-[calc(100%-3.5rem)] w-[300px] shadow-md bg-headerColor p-2 flex flex-col items-center justify-between gap-4">
                    <nav className="hidden md:flex w-full text-center">
                        <NavLink to="category" className="w-full text-textColor text-base hover:text-white hover:font-semibold hover:drop-shadow-md transition-all duration-150 ease-in-out">
                            Thể loại
                        </NavLink>
                        <NavLink to="category" className="w-full text-textColor text-base hover:text-white hover:font-semibold hover:drop-shadow-md transition-all duration-150 ease-in-out">
                            Slide
                        </NavLink>
                    </nav>
                    <div className="">
                        <p className="text-white font-italic text-base">
                            Coppyright @ <span className="text-xl font-bold text-textColor">
                                Nguyễn Quốc Bảo Bảo
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </header>
    )
}

export default HeaderAdmin