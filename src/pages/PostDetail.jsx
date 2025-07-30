import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import ClipLoader from "react-spinners/ClipLoader";
import Seo from "../components/Seo";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosClient.get(
          `/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );
        if (res.data.length > 0) {
          setPost(res.data[0]);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <ClipLoader size={40} color="#000" />
      </div>
    );
  }

  if (!post) {
    return <p className="text-center mt-5">Không tìm thấy bài viết.</p>;
  }

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div>
      {/* SEO */}
      {post?.yoast_head_json && <Seo yoast={post.yoast_head_json} />}

      <div className="container section">
        {/* Breadcrumb */}
        <nav className="mb-4" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blog">Bài viết</Link>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </ol>
        </nav>

        {/* Title */}
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {/* Featured Image */}
        {featuredImage && (
          <img
            src={featuredImage}
            alt={post.title.rendered}
            className="img-fluid mb-4"
          />
        )}

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </div>
  );
};

export default PostDetail;