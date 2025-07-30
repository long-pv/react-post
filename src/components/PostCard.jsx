import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Image from "./Image"; // dùng lại component ảnh

const PostCard = ({ id }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const res = await axiosClient.get(
                    `/wp-json/wp/v2/posts/${id}?_embed&_fields=id,title,featured_media`
                );
                setPost(res.data);
            } catch (err) {
                console.error("Lỗi tải bài viết:", err);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return null;

    return (
        <div className="card h-100">
            <Image id={post.featured_media} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <Link to={`/posts/${post.id}`} className="btn btn-sm btn-outline-primary">
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
};

export default PostCard;
