import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedPosts } from "../store/posts/postListSlice";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const PostList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, totalPages } = useSelector(
    (state) => state.postList
  );

  useEffect(() => {
    dispatch(getPaginatedPosts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Danh sách bài viết</h1>

      {loading ? (
        <div className="text-center my-5">
          <ClipLoader size={40} color="#000" />
        </div>
      ) : error ? (
        <p className="text-danger">Lỗi: {error}</p>
      ) : data.length === 0 ? (
        <p>Không có bài viết nào.</p>
      ) : (
        <>
          <div className="row">
            {data.map((post) => {
              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              return (
                <div className="col-md-4 mb-4" key={post.id}>
                  <div className="card h-100">
                    {featuredImage && (
                      <img
                        src={featuredImage}
                        className="card-img-top"
                        alt={post.title.rendered}
                      />
                    )}
                    <div className="card-body">
                      <h5
                        className="card-title"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <Link to={`/posts/${post.id}`} className="btn btn-primary">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phân trang */}
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === currentPage ? "active" : ""}`}
                  onClick={() => handlePageClick(page)}
                >
                  <button className="page-link">{page}</button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default PostList;
