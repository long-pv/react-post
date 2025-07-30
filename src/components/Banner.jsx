import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Image from "./Image";

const Banner = ({ pageId }) => {
    const [acf, setAcf] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            if (!pageId) return;

            try {
                const response = await axiosClient.get(
                    `/wp-json/wp/v2/pages/${pageId}?_fields=id,acf,yoast_head_json`
                );
                setAcf(response.data.acf);
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu banner:", err);
            }
        };

        fetchPage();
    }, [pageId]);

    if (!acf) return null;

    return (
        <div className="section banner">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h1 className="banner_title">{acf?.banner?.tieu_de}</h1>
                        <div className="banner_desc">{acf?.banner?.mo_ta}</div>
                    </div>
                    <div className="col-lg-6">
                        <div className="banner_img">
                            <Image id={acf?.banner?.hinh_anh} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
