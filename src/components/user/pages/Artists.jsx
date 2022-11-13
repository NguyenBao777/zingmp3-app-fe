import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllArtists, public_server } from '../../../helpers/helperAPI';
import { CarouselArtists } from "../../../components";

const Artists = () => {
    const [listArtists, setListArtists] = useState([]);
    useEffect(() => {
        getAllArtists().then((res) => {
            if (res.data.success) setListArtists(res.data.message);
        });
    }, []);

    return (
        <div className="w-full h-screen">
            <CarouselArtists />
        </div>
    )
}

export default Artists