import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar, Navbar, Header, Musicbar, Carousel, NewSong, Category, Playlist, TopOneHundred, ZingChart, UserProfile, AlbumDetail, SearchResult } from "../../../components";
import { useStateValue } from "../../../context/StateProvider";

const Home = () => {
    const [{ playlist }, dispatch] = useStateValue([]);
    const [showPlaylist, setShowPlaylist] = useState(false);

    return (
        <div className="w-full h-full overflow-x-hidden">
            <Sidebar />
            <div className={`w-full ml-28 md:ml-[14rem] relative ${playlist?.length > 0 ? "mb-28" : ""}`}>
                <Header />
                <div className="mt-14 mr-28 md:mr-[14rem] flex flex-col items-center px-4">
                    <Navbar />
                    <Carousel />
                    <Routes>
                        <Route path="/*" element={<NewSong />} />
                        <Route path="/zingchart" element={<ZingChart />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/toponehundred" element={<TopOneHundred />} />
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/albumdetail/:albumcode" element={<AlbumDetail />} />
                        <Route path="/searchresult/:keywords" element={<SearchResult />} />
                    </Routes>
                </div>
            </div>
            {playlist?.length > 0 && (
                <Musicbar showPlaylist={showPlaylist} setShowPlaylist={setShowPlaylist} />
            )}
            {showPlaylist && playlist.length > 0 && (
                <Playlist />
            )}
        </div>
    )
}

export default Home
