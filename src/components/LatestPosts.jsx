import { useEffect, useState } from "react";
import Slider from "react-slick";
import axiosClient from "../api/axiosClient";
import PostCard from "./PostCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestPosts = () => {
    const [ids, setIds] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosClient.get(
                    "/wp-json/wp/v2/posts?per_page=6&_fields=id"
                );
                const postIds = res.data.map((item) => item.id);
                setIds(postIds);
            } catch (err) {
                console.error("Lỗi lấy bài viết:", err);
            }
        };

        fetch();
    }, []);

    if (!ids.length) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // hiển thị 3 bài/lượt
        slidesToScroll: 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div>
            <div className="container section">
                <h2 className="mb-3">Tin tức mới nhất</h2>
                <div className="latest-posts-slider">
                    <Slider {...settings}>
                        {ids.map((id) => (
                            <div key={id} className="p-2">
                                <PostCard id={id} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default LatestPosts;