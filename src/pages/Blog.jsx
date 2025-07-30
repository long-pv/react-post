import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PostCard from "../components/PostCard";
import ClipLoader from "react-spinners/ClipLoader";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const [postIds, setPostIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let categoryId = null;

      if (categorySlug) {
        const categoryRes = await axiosClient.get(`/wp-json/wp/v2/categories?slug=${categorySlug}`);
        if (categoryRes.data.length === 0) {
          setPostIds([]);
          setTotalPages(1);
          setLoading(false);
          return;
        }
        categoryId = categoryRes.data[0].id;
      }

      const query = new URLSearchParams({
        _embed: true,
        per_page: 12,
        page: currentPage,
        ...(categoryId && { categories: categoryId }),
      }).toString();

      const res = await axiosClient.get(`/wp-json/wp/v2/posts?${query}`);
      const total = res.headers["x-wp-totalpages"];
      setPostIds(res.data.map((post) => post.id));
      setTotalPages(Number(total));
    } catch (err) {
      console.error("Lỗi khi lấy bài viết:", err);
      setPostIds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categorySlug, currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container section">
      <Helmet>
        <title>Danh sách bài viết</title>
        <meta name="description" content="Tổng hợp các bài viết mới nhất." />
      </Helmet>

      <h1 className="mb-4">
        {categorySlug ? `Chuyên mục: ${categorySlug}` : "Tất cả bài viết"}
      </h1>

      {loading ? (
        <div className="text-center my-5">
          <ClipLoader size={40} color="#000" />
        </div>
      ) : postIds.length === 0 ? (
        <p>Không có bài viết nào.</p>
      ) : (
        <>
          <div className="row">
            {postIds.map((id) => (
              <div className="col-md-4 col-lg-3 mb-4" key={id}>
                <PostCard id={id} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
