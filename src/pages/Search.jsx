import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import ClipLoader from "react-spinners/ClipLoader";
import PostCard from "../components/PostCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState(searchParams.get("key") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gọi API khi từ khóa thay đổi (URL query)
  useEffect(() => {
    const q = searchParams.get("key")?.trim();

    if (q) {
      setLoading(true);
      setError("");
      axiosClient
        .get(`/wp-json/wp/v2/posts`, {
          params: {
            search: q,
            _embed: true,
          },
        })
        .then((res) => setPosts(res.data))
        .catch(() => setError("Không thể tìm kiếm."))
        .finally(() => setLoading(false));
    } else {
      setPosts([]);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
      setSearchParams({ key: trimmed });
    } else {
      setSearchParams({});
      setPosts([]);
    }
  };

  return (
    <div className="container section">
      <h2 className="mb-3">Tìm kiếm bài viết</h2>

      <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Tìm</button>
      </form>

      {loading && (
        <div className="text-center my-4">
          <ClipLoader color="#000" size={40} />
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      {!loading && posts.length === 0 && keyword && (
        <p>Không tìm thấy bài viết nào.</p>
      )}

      {posts.length > 0 && (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4 col-lg-3 mb-4" key={post.id}>
              <PostCard id={post.id} data={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
