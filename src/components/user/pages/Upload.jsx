import { useState } from "react";
import { BsFileEarmarkPost, BsMusicNote } from "react-icons/bs";
import { IoIosAlbums } from "react-icons/io";
import { RiUserVoiceFill } from "react-icons/ri";
import { HeaderTheme, UploadSong, UploadAlbum, PostForm } from "../../../components";

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
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "album" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("album")}
                    >
                        <IoIosAlbums className="text-xl" />
                        Thêm Album
                    </div>
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "post" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("post")}
                    >
                        <BsFileEarmarkPost className="text-xl" />
                        Thêm bài viết
                    </div>
                    <div className={`text-white cursor-pointer flex items-center justify-center gap-1 px-2 my-1 rounded-full ${uploadType === "artist" ? "bg-pink-600/50" : ""}`}
                        onClick={() => setUploadType("artist")}
                    >
                        <RiUserVoiceFill className="text-xl" />
                        Thêm Nghệ sĩ
                    </div>
                </nav>
                {uploadType !== "" && uploadType === "song" && (
                    <UploadSong />
                )}
                {uploadType !== "" && uploadType === "post" && (
                    <PostForm />
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