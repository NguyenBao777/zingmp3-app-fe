import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { MdOutlineFeaturedVideo } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { navActiveStyles, navNoActiveStyles } from '../../helpers/activeStyle'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between gap-2 bg-white/25 rounded-full p-1">
            <NavLink to="/newsong" className={({ isActive }) => isActive ? navActiveStyles : navNoActiveStyles}>
                <BsMusicNoteBeamed className="hidden md:block text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-xl" />
                <p className="text-white/75 text-[10px] md:text-sm font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                    Nhạc mới
                </p>
            </NavLink>
            <NavLink to="/category" className={({ isActive }) => isActive ? navActiveStyles : navNoActiveStyles}>
                <BiCategoryAlt className="hidden md:block text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-xl" />
                <p className="text-white/75 text-[10px] md:text-sm font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                    Thể loại
                </p>
            </NavLink>

            <NavLink to="/toponehundred" className={({ isActive }) => isActive ? navActiveStyles : navNoActiveStyles}>
                <AiOutlineStar className="hidden md:block text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-xl" />
                <p className="text-white/75 text-[10px] md:text-sm font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                    Top 100
                </p>
            </NavLink>

            <NavLink to="/" className={({ isActive }) => isActive ? navActiveStyles : navNoActiveStyles}>
                <MdOutlineFeaturedVideo className="hidden md:block text-white/75 group-hover:text-white transition-all duration-150 ease-linear text-xl" />
                <p className="text-white/75 text-[10px] md:text-sm font-semibold group-hover:text-white transion-all duration-150 ease-linear">
                    MV
                </p>
            </NavLink>
        </nav>
    )
}

export default Navbar
