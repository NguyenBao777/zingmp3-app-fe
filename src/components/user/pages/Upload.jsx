import { useState } from "react";
import { BsMusicNote } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";
import { RiUserVoiceFill } from "react-icons/ri";
import { HeaderTheme, UploadSong, UploadAlbum } from "../../../components";

const Upload = () => {
    const [uploadType, setUploadType] = useState("song");
    return (
        <div className="w-full">
            <HeaderTheme />
            <div className="mt-14 w-full px-4 py-2">
                <nav className="w-fit mx-auto flex items-center justify-center gap-6 bg-white/25 rounded-full px-4">
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "song" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("song")}
                    >
                        <BsMusicNote className="text-xl" />
                        Thêm bài hát
                    </div>
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "author" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("author")}
                    >
                        <FaUserEdit className="text-xl" />
                        Thêm Nhạc sĩ
                    </div>
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "artist" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("artist")}
                    >
                        <RiUserVoiceFill className="text-xl" />
                        Thêm Nghệ sĩ
                    </div>
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "album" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("album")}
                    >
                        <IoIosAlbums className="text-xl" />
                        Thêm Album
                    </div>
                </nav>
                {uploadType !== "" && uploadType === "song" && (
                    <UploadSong />
                )}
                {uploadType !== "" && uploadType === "author" && (
                    <UploadSong />
                )}
                {uploadType !== "" && uploadType === "artist" && (
                    <UploadSong />
                )}
                {uploadType !== "" && uploadType === "album" && (
                    <UploadAlbum />
                )}
            </div>
        </div>
    )
}

export default Upload