import { useState } from 'react'
import { motion } from "framer-motion";
import { BsTrash } from 'react-icons/bs';
import CloudUpload from "../../assets/images/icons/empty-upload-dark.png";
import isEmpty from 'validator/lib/isEmpty';
import { addNewPost } from '../../helpers/helperAPI';
import { Alert } from "../../components";
import { useStateValue } from '../../context/StateProvider';

const PostForm = () => {
    const [msgValidation, setMsgValidation] = useState("");
    const [tempImg, setTempImg] = useState("");
    const [file, setFile] = useState(null);
    const [postContent, setPostContent] = useState("");
    const [alert, setAlert] = useState("");
    const [{ user }, dispatch] = useStateValue();
    const handleUploadImg = (e) => {
        setTempImg(URL.createObjectURL(e[0]));
        setFile(e[0]);
    }

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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) return;
        // handleSubmit
        const formData = new FormData();
        formData.append("file", file ? file : null);
        formData.append("post_content", postContent);
        formData.append("user_id", user?.id);
        addNewPost(formData).then((res) => {
            if (res.data.success) {
                setAlert({
                    type: "success",
                    message: "Upload Successfully!"
                });
                setTimeout(() => setAlert(""), 2000);
                setPostContent("");
                setFile(null);
                setTempImg("");
            } else {
                setAlert({
                    type: "error",
                    message: "Upload False!"
                });
                setTimeout(() => setAlert(""), 2000);
            }
        });
    }

    return (
        <motion.div
            className="my-4 w-full flex flex-wrap items-center justify-center"
            initial={{ opacity: 0.5, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -1000 }}
        >
            {alert !== "" && (<Alert alert={alert} />)}
            <form encType="multipart/form-data" className="w-full md:w-1/2 flex flex-col gap-4 p-2 justify-center bg-gradient-to-b from-primary to-headerColor rounded-md oveflow-hidden"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="w-full flex-wrap flex items-center justify-between gap-6">
                    <div className="w-48 h-48 flex items-center p-1 justify-center border-dotted border-2 border-white rounded-md">
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
                            <label htmlFor="song_cover" className="cursor-pointer">
                                <img src={CloudUpload} alt="" className="object-cover" />
                            </label>
                        )}
                        <input id="song_cover" name="song_cover" type="file" hidden accept="image/*"
                            onChange={(e) => handleUploadImg(e.target.files)}
                        />
                    </div>
                </div>


                <div className="w-full">
                    <label htmlFor="song_lyric" className="cursor-pointer text-md font-semibold text-white">Nội dung:</label>
                    <textarea rows={5} value={postContent} id="song_lyric" name="song_lyric" type="text" placeholder="Lời bài hát" className="tex-texColor w-full rounded-md text-base p-2 focus-within:bg-white focus-within:shadow-md transition-all duration-150 ease-in-out border border-white-500 bg-gray-300 outline-none"
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                    <p className="text-red-700 font-light ml-2 text-xs italic">
                        <span className={`${msgValidation?.post_content ? "visible" : "invisible"}`}>* </span>
                        {msgValidation?.post_content}
                    </p>
                </div>
                <button type="submit" className="text-white bg-green-600 hover:bg-green-900 transition-all duration-75 ease-in-out flex items-center justify-center rounded-md px-4 py-1 m-4">Thêm</button>
            </form>
        </motion.div>
    )
}

export default PostForm
