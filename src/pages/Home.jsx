import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getLatestHomePosts } from "../store/posts/postsSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const dispatch = useDispatch();
  const { dataHome, loadingHome } = useSelector((state) => state.posts);

  useEffect(() => {
    if (dataHome.length === 0) {
      dispatch(getLatestHomePosts());
    }
  }, [dispatch, dataHome.length]);

  return (
    <div>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Simple Blog built with React + WordPress (Headless)." />
      </Helmet>

      <h2 className="mb-4">Bài viết mới nhất</h2>

      {loadingHome ? (
        <div className="d-flex justify-content-center my-5">
          <ClipLoader size={40} color="#000" />
        </div>
      ) : (
        <div className="row">
          {dataHome.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <Link to={`/posts/${post.id}`} className="mt-auto btn btn-primary">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/posts" className="btn btn-outline-secondary">
          Xem tất cả bài viết
        </Link>
      </div>
    </div>
  );
};

export default Home;