import { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getAllAlbums, public_server } from "../../helpers/helperAPI";

const Carousel = () => {
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
        getAllAlbums().then((res) => {
            if (res.data.success) setListCarousel(res.data.message);
        });
    }, []);

    return (
        <OwlCarousel className="owl-theme my-2 relative z-0" {...options}>
            {listCarousel.length > 0 && listCarousel.map((carousel, i) => (
                <div className="item rounded-md overflow-hidden" key={i}>
                    <img src={`${public_server}/albums/${carousel?.album_cover}`} alt="" className="object-cover w-full h-225" />
                </div>
            ))}
        </OwlCarousel>
    )
}

export default Carousel