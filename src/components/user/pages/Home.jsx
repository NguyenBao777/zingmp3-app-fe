import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Navbar, Header, Musicbar, Carousel, NewSong, Category, Playlist, TopOneHundred, ZingChart, UserProfile, AlbumDetail, SearchResult, ArtistProfile, Artists } from "../../../components";
import { useStateValue } from "../../../context/StateProvider";

const Home = () => {
    const [{ playlist }, dispatch] = useStateValue([]);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [showCarousel, setShowCarousel] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/newsong", { replace: true });
    }, []);
    const location = useLocation();
    console.log(location)
    useEffect(() => {
        switch (location.pathname) {
            case "/artists": setShowCarousel(false);
                break;
            case "/userprofile": setShowCarousel(false);
                break;

            default: setShowCarousel(true);
        }
    }, [location.pathname]);

    return (
        <div className="w-full h-full overflow-x-hidden">
            <Sidebar />
            <div className={`w-full ml-28 lg:ml-[14rem] relative ${playlist?.length > 0 ? "mb-28" : ""}`}>
                <Header />
                <div className="mt-14 mr-28 lg:mr-[14rem] flex flex-col items-center px-4 pb-2">
                    {showCarousel && (
                        <>
                            <Navbar />
                            <Carousel />
                        </>
                    )}
                    <Routes>
                        <Route path="/newsong" element={<NewSong />} />
                        <Route path="/zingchart" element={<ZingChart />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/toponehundred" element={<TopOneHundred />} />
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/albumdetail/:albumcode" element={<AlbumDetail />} />
                        <Route path="/searchresult/:keywords" element={<SearchResult />} />
                        <Route path="/artistprofile/:id" element={<ArtistProfile />} />
                        <Route path="/artists" element={<Artists />} />
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
