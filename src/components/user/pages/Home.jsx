import { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Navbar, Header, Musicbar, Carousel, NewSong, Category, Playlist, TopOneHundred, ZingChart, UserProfile, AlbumDetail, SearchResult, ArtistProfile, Artists } from "../../../components";
import { useStateValue } from "../../../context/StateProvider";
import { getAllPost } from "../../../helpers/helperAPI";

const Home = () => {
    const [{ playlist }, dispatch] = useStateValue([]);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [showCarousel, setShowCarousel] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [listPosts, setListPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/newsong", { replace: true });
        getAllPost(itemsPerPage, currentPage).then((res) => {
            if (res.data.success) setListPosts(res.data.message);
        });
    }, []);
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case "/artists": setShowCarousel(false);
                break;
            case "/userprofile": setShowCarousel(false);
                break;

            default: setShowCarousel(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        getAllPost(itemsPerPage, currentPage).then((res) => {
            if (res.data.success) setListPosts([...listPosts, ...res.data.message]);
        });
    }, [currentPage]);

    const handleScroll = (e) => {
        if (location.pathname === "/artists" && e.currentTarget.scrollTop > 1000 * currentPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="w-full h-full overflow-x-hidden" onScroll={(e) => handleScroll(e)}>
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
                        <Route path="/artists" element={<Artists listPosts={listPosts} />} />
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
