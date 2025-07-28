import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../store/posts/postsSlice";
import ClipLoader from "react-spinners/ClipLoader";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { dataPostDetails, loadingPostDetails } = useSelector((state) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
  }, [dispatch, id]);

  if (loadingPostDetails) {
    return (
      <div className="d-flex justify-content-center my-5">
        <ClipLoader size={40} color="#000" />
      </div>
    );
  }

  if (!dataPostDetails) {
    return <p className="text-center mt-5">Không tìm thấy bài viết.</p>;
  }

  const featuredImage =
    dataPostDetails._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="container">
      {/* ✅ Breadcrumb */}
      <nav className="mb-4" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/posts">Bài viết</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" dangerouslySetInnerHTML={{ __html: dataPostDetails?.title?.rendered }} />
        </ol>
      </nav>

      {/* ✅ Title */}
      <h1 dangerouslySetInnerHTML={{ __html: dataPostDetails?.title?.rendered }} />

      {/* ✅ Image */}
      {featuredImage && (
        <img
          src={featuredImage}
          alt={dataPostDetails?.title?.rendered}
          className="img-fluid mb-4"
        />
      )}

      {/* ✅ Content */}
      <div
        dangerouslySetInnerHTML={{ __html: dataPostDetails?.content?.rendered }}
        className="post-content"
      />
    </div>
  );
};

export default PostDetail;