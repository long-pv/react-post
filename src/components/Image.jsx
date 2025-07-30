import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const Image = ({ id }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchImage = async () => {
            try {
                const res = await axiosClient.get(`/wp-json/wp/v2/media/${id}?_fields=id,source_url`);
                setUrl(res.data.source_url);
            } catch (err) {
                console.error("Lỗi tải ảnh:", err);
            }
        };

        fetchImage();
    }, [id]);

    if (!url) return null;

    return <img src={url} />;
};

export default Image;
