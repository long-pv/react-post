import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts, clearSearchResults } from "../store/search/searchSlice";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.search);
    
    // Clear dữ liệu khi trang vừa load
    useEffect(() => {
        dispatch(clearSearchResults());
        setKeyword("");
    }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() !== "") {
      dispatch(searchPosts(keyword));
    } else {
      dispatch(clearSearchResults());
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">Tìm kiếm bài viết</h2>
      <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Tìm
        </button>
      </form>

      {loading && (
        <div className="d-flex justify-content-center my-4">
          <ClipLoader color="#000" size={40} />
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      {data.length > 0 && (
        <div className="row">
          {data.map((post) => {
            const thumbnail =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <div className="col-md-4 mb-4" key={post.id}>
                <div className="card h-100">
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt={post.title.rendered}
                      className="card-img-top"
                    />
                  )}
                  <div className="card-body">
                    <h5
                      className="card-title"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <Link to={`/posts/${post.id}`} className="btn btn-sm btn-outline-primary">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
