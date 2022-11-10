import { useState } from "react";
import { HeaderAdmin, Alert } from "../../../components";
import CloudUpload from "../../../assets/images/icons/empty-upload-dark.png";
import { BsTrash } from "react-icons/bs";
import isEmpty from "validator/lib/isEmpty";
import { addNewCategory } from "../../../helpers/helperAPI";

const AddNewCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const [categoryStatus, setCategoryStatus] = useState("");
    const [msgValidation, setMsgValidation] = useState("");
    const [fileImg, setFileImg] = useState(null);
    const [tempImg, setTempImg] = useState("");
    const [alert, setAlert] = useState("");

    const validation = () => {
        const msg = {};

        if (isEmpty(categoryName)) {
            msg.category_name = "Vui lòng nhập tên thể loại";
        }

        if (isEmpty(categoryDesc)) {
            msg.category_desc = "Vui lòng nhập mô tả thể loại";
        }

        if (isEmpty(tempImg)) {
            msg.category_file = "Vui lòng thêm hình ảnh";
        }

        if (isEmpty(categoryStatus)) {
            msg.category_status = "Vui lòng chọn trạng thái";
        }

        setMsgValidation(msg);
        setTimeout(() => setMsgValidation(""), 1500);
        if (Object.keys(msg).length > 0) return true;

        return false;
    }

    const handleUploadImg = (e) => {
        setTempImg(URL.createObjectURL(e[0]));
        setFileImg(e[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        formData.append("category_name", categoryName);
        formData.append("category_img", fileImg);
        formData.append("category_desc", categoryDesc);
        formData.append("category_status", categoryStatus);
        addNewCategory(formData).then((res) => {
            if (res.data.success) {
                setAlert({
                    type: "success",
                    message: "Upload Successfully!"
                });
                setTimeout(() => setAlert(""), 2000);
                setCategoryName("");
                setCategoryDesc("");
                setCategoryStatus("");
                setFileImg(null);
                setTempImg("");
            } else {
                setAlert({
                    type: "error",
                    message: "Upload false!"
                });
                setTimeout(() => setAlert(""), 2000);
            }
        })
    }

    return (
        <div className="w-full h-screen">
            <HeaderAdmin />
            {alert !== "" && (<Alert alert={alert} />)}
            <form className="w-full mt-14 p-2 flex flex-wrap justify-center" encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="w-full md:w-1/2 px-2">
                    <div className="w-full">
                        <label htmlFor="username" className="text-white">Tên thể loại:</label>
                        <input type="text" id="category_name" value={categoryName} placeholder="Tên danh mục" className="w-full px-2 py-1 border-none outline-none text-black rounded-md bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.category_name ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.category_name}
                        </p>
                    </div>
                    <div className="h-300 w-300 flex items-center p-1 justify-center border-dotted border-2 border-white rounded-md">
                        {tempImg !== "" ? (
                            <div className="relative overflow-hidden w-full h-full rounded-md">
                                <span className="absolute top-1 right-1 cursor-pointer h-6 w-6 rounded-full bg-red-600 flex items-center justify-center"
                                    onClick={() => setTempImg("")}
                                >
                                    <BsTrash className="text-base text-white" />
                                </span>
                                <img src={tempImg} alt="" className="object-cover w-full h-full" />
                            </div>
                        ) : (
                            <label htmlFor="category_img" className="cursor-pointer h-300 w-300 flex items-center justify-center">
                                <img src={CloudUpload} alt="" className="object-cover" />
                            </label>
                        )}
                        <input id="category_img" name="category_img" type="file" hidden accept="image/*"
                            onChange={(e) => handleUploadImg(e.target.files)}
                        />
                    </div>
                    <p className="text-red-700 font-light ml-2 text-xs italic">
                        <span className={`${msgValidation?.category_file ? "visible" : "invisible"}`}>* </span>
                        {msgValidation?.category_file}
                    </p>
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <div className="w-full">
                        <label htmlFor="category_desc" className="cursor-pointer text-md font-semibold text-white">Mô tả Album:</label>
                        <textarea rows={5} value={categoryDesc} id="category_desc" name="category_desc" type="text" placeholder="Album Desc" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                            onChange={(e) => setCategoryDesc(e.target.value)}
                        />
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.category_desc ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.category_desc}
                        </p>
                    </div>
                    <div className="w-full flex items-center gap-3">
                        <label htmlFor="category_status" className="cursor-pointer text-md font-semibold text-white">Trạng thái danh mục:</label>
                        <select name="" id="category_status" classNamme="cursor-pointer px-4 py-2 bg-gray-300 outline-none rounded-md border-none"
                            value={categoryStatus}
                            onChange={(e) => setCategoryStatus(e.target.value)}
                        >
                            <option className="text-center" value="">------------</option>
                            <option className="text-center" value="an">Ẩn</option>
                            <option className="text-center" value="hien">Hiện</option>

                        </select>
                        <p className="text-red-700 font-light ml-2 text-xs italic">
                            <span className={`${msgValidation?.category_status ? "visible" : "invisible"}`}>* </span>
                            {msgValidation?.category_status}
                        </p>
                    </div>
                </div>

                <button type="submit" className="flex items-center justify-center bg-green-600 hover:bg-green-800 rounded-md text-white cursor-pointer w-[100px] px-2 py-1 m-2">
                    Thêm
                </button>
            </form>
        </div>
    )
}

export default AddNewCategory