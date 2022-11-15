import { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getAllArtists, public_server } from "../../helpers/helperAPI";
import { Link } from "react-router-dom";
import NotLogin from "../../assets/images/icons/NotLogin.png";

const CarouselArtists = () => {
    const options = {
        loop: true,
        autoplay: true,
        center: true,
        smartSpeed: 1000,
        autoplayTimeout: 2000,
        margin: 10,
        items: 1,
        center: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 3,

            }
        }
    }

    const [listCarousel, setListCarousel] = useState([]);
    useEffect(() => {
        getAllArtists().then((res) => {
            if (res.data.success) setListCarousel(res.data.message);
        });
    }, []);

    return (
        <OwlCarousel className="owl-theme my-2 relative z-0" {...options}>
            {listCarousel.length > 0 && listCarousel.map((carousel, i) => (
                <Link to={`/artistprofile/${carousel?.id}`} key={i} className="bg-gradient-to-b from-primary to-headerColor transition-all duration-150 ease-in-out rounded-md flex gap-4 p-2 w-full">
                    <img src={carousel?.user_avatar ? `${public_server}/users/${carousel?.user_avatar}` : NotLogin} alt="" className="object-cover h-20 w-20 rounded-md" />
                    <div className="w-full">
                        <p className="text-slate-400 text-sm">Nghệ sĩ</p>
                        <p className="text-white text-base font-bold">{carousel?.user_name}</p>
                        <p className="text-white text-sm italic"> Ngày sinh: <span className="text-slate-400 text-sm">{carousel?.user_birthday ? carousel?.user_birthday : "Chưa cập nhật"}</span></p>
                    </div>
                </Link>
            ))}
        </OwlCarousel>
    )
}

export default CarouselArtists