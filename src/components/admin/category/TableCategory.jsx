import { useState } from 'react'
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { HeaderAdmin } from "../../../components";

const TableItem = () => {
    const [showDeleteBox, setShowDeleteBox] = useState(false);

    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
            </th>
            <td className="py-4 px-6">
                <div className="w-full flex items-center justify-center">
                    <img src="https://javhd.pics/photos/japanese/sora-shiina/7/sora-shiina-8.jpg" alt="" className="object-cover w-150" />
                </div>
            </td>
            <td className="py-4 px-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odio deserunt necessitatibus nesciunt eveniet maxime sint repellendus optio laboriosam possimus!...
            </td>
            <td className="py-4 px-6">
                <p className="w-[100px] text-center text-white bg-green-600 px-2 py-1 text-xs rounded-md">
                    Hiển thị
                </p>
            </td>
            <td className="py-4 px-6 relative">
                <div className="flex flex-col items-center justify-center gap-2">
                    <button className="w-[60px] rounded-md py-1 px-2 flex items-center justify-center bg-red-600 hover:bg-red-800 transition-all duration-150 ease-in-out"
                        onClick={() => setShowDeleteBox(!showDeleteBox)}
                    >
                        <BsTrashFill className="text-xl text-white" />
                    </button>
                    <Link to="addnew" className="w-[60px] rounded-md py-1 px-2 flex items-center justify-center bg-green-600 hover:bg-green-800 transition-all duration-150 ease-in-out">
                        <AiFillEdit className="text-xl text-white" />
                    </Link>
                </div>
                {showDeleteBox && (
                    <div className="absolute top-12 right-1 z-10 w-300 rounded-md bg-slate-300 p-2">
                        <p className="text-base text-black">Bạn có chắc muốn xóa <span className="font-semibold">danh mục</span> này?</p>
                        <div className="flex items-center justify-evenly mt-2">
                            <div className="flex items-center justify-center w-[60px] cursor-pointer px-2 py-1 rounded-full bg-headerColor">
                                yes
                            </div>
                            <div className="flex items-center justify-center w-[60px] cursor-pointer px-2 py-1 rounded-full bg-gray-500"
                                onClick={() => setShowDeleteBox(false)}
                            >
                                no
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    )
}

const TableCategory = () => {
    return (
        <div className="">
            <HeaderAdmin />
            <div className="w-full mt-14 p-2">
                <div className="flex items-center justify-center gap-4">
                    <Link to="addnew" className="p-2 rounded-md h-10 w-10 flex items-center justify-center border border-gray-600 bg-gray-300 hover:shadow-md hover:bg-slate-500 transition-all duration-150 ease-in-out">
                        <AiOutlinePlus className="text-2xl" />
                    </Link>
                    <h4 className="text-2xl uppercase text-orange-600 font-semibold">
                        Danh sách thể loại
                    </h4>
                </div>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Tên thể loại
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Hình ảnh
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Mô tả
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableItem />
                            <TableItem />
                            <TableItem />
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default TableCategory
