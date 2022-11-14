import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloudUpload from "../../assets/images/icons/empty-upload-dark.png";
import isEmpty from 'validator/lib/isEmpty';
import { useStateValue } from '../../context/StateProvider';
import { editUser, getOneUser } from '../../helpers/helperAPI';
import { actionType } from '../../context/reducer';
import { motion } from "framer-motion";

const EditUserForm = () => {
    const [{ user }, dispatch] = useStateValue();
    const [userName, setUserName] = useState(user?.user_name || "");
    const [tempAvatar, setTempAvatar] = useState("");
    const [file, setFile] = useState(null);
    const [oldImage, setOldImage] = useState(user?.user_avatar);
    const [userBirthday, setUserBirthday] = useState(new Date(user?.user_birthday || ""));
    const [userDesc, setUserDesc] = useState(user?.user_desc || "");
    const [userCountry, setUserCountry] = useState(user?.user_country || "");

    const handleUploadAvatar = (e) => {
        setTempAvatar(URL.createObjectURL(e[0]));
        setFile(e[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(userName) && isEmpty(tempAvatar)) return;

        // handleSubmit
        const formData = new FormData();
        formData.append("user_id", user?.id);
        formData.append("old_img", oldImage);
        formData.append("file", file);
        formData.append("user_desc", userDesc);
        formData.append("user_birthday", userBirthday);
        formData.append("user_country", userCountry);
        formData.append("user_name", userName !== "" ? userName : user?.user_name);
        editUser(formData).then(() => {
            getOneUser(user?.id).then((res) => {
                if (res.data.success) {
                    dispatch({
                        type: actionType.SET_USER,
                        user: res.data.message
                    });
                    // setUserName("");
                    // setOldImage(user?.user_avatar);
                    // setFile(null);
                    // setTempAvatar("");
                }
            });
        });
    };

    return (
        <motion.form className="w-full p-2 bg-gradient-to-b from-primary to-headerColor rounded-md mt-2 md:mt-0 md:ml-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 1000 }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="w-full">
                <label htmlFor="username" className="text-white">Tên hoặc Nghệ danh:</label>
                <input type="text" id="username" value={userName} placeholder="Tên hoặc nghệ danh" className="w-full px-2 py-1 border-none outline-none text-black rounded-md bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="w-full flex-wrap flex items-center justify-between gap-6">
                <div className="w-32 h-32 flex items-center p-1 justify-center border-dotted border-2 border-black bg-slate-600 rounded-md">
                    {tempAvatar !== "" ? (
                        <div className="relative overflow-hidden w-full h-full rounded-md">
                            <span className="absolute top-1 right-1 cursor-pointer h-6 w-6 rounded-full bg-red-600 flex items-center justify-center"
                                onClick={() => setTempAvatar("")}
                            >
                                <BsTrash className="text-base text-white" />
                            </span>
                            <img src={tempAvatar} alt="" className="object-cover w-full h-full" />
                        </div>
                    ) : (
                        <label htmlFor="user_avatar" className="cursor-pointer">
                            <img src={CloudUpload} alt="" className="object-cover" />
                        </label>
                    )}
                    <input id="user_avatar" name="user_avatar" type="file" hidden accept="image/*"
                        onChange={(e) => handleUploadAvatar(e.target.files)}
                    />
                </div>
            </div>
            <div className="w-full">
                <label htmlFor="" className="text-white">Quốc gia:</label>
                <input type="text" value={userCountry} placeholder="Quốc gia" className="w-full px-2 py-1 border-none outline-none text-black rounded-md bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setUserCountry(e.target.value)}
                />
            </div>
            <div className="w-full">
                <label htmlFor="" className="text-white">Ngày sinh:</label>
                <DatePicker className="bg-gray-300 text-black p-2" selected={userBirthday} onChange={(date) => setUserBirthday(date)} />
            </div>
            <div className="w-full">
                <label htmlFor="username" className="text-white">Tiểu sử:</label>
                <textarea rows="5" type="text" id="username" value={userDesc} placeholder="Tiểu sử" className="w-full px-2 py-1 border-none outline-none text-black rounded-md bg-gray-300 focus-within:bg-white transition-all duration-150 ease-in-out"
                    onChange={(e) => setUserDesc(e.target.value)}
                />
            </div>
            <button type="submit" className="flex items-center justify-center rounded-md bg-green-600 hover:bg-green-800 text-white px-4 py-1 transiton-all duration-150 ease-in-out">
                Gửi
            </button>
        </motion.form>
    )
}

export default EditUserForm
