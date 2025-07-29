import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "../store/options/optionsSlice";
import { getLatestPosts } from "../store/posts/postsSlice";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Footer = () => {
  const dispatch = useDispatch();
  const { data: dataOptions, loading: loadingOptions } = useSelector((state) => state.options);
  const { data: dataPosts, loading: loadingPosts } = useSelector((state) => state.posts);
  const lienHe = dataOptions?.lien_he;
  const gioi_thieu = dataOptions?.gioi_thieu;

  useEffect(() => {
    const fetchInitialData = () => {
      dispatch(getOptions());
      dispatch(getLatestPosts());
    };
    fetchInitialData();
  }, [dispatch]);

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Cột 1 - Logo */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">React Post</h5>
            {loadingOptions ? (
              <div className="d-flex align-items-center gap-2">
                <ClipLoader size={32} color="#ffffff" />
              </div>
            ) : gioi_thieu ? (
              <div>{gioi_thieu}</div>
            ) : (
              <p>Không có dữ liệu.</p>
            )}
          </div>

          {/* Cột 2 - Bài viết mới (fix cứng tạm) */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Bài viết mới</h5>
            {loadingPosts ? (
              <ClipLoader size={32} color="#ffffff" />
            ) : dataPosts ? (
              <ul className="list-unstyled">
                {dataPosts.map((post) => (
                  <li key={post.id}>
                    <Link to={`/posts/${post.id}`} className="text-white">
                      {post.title.rendered}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có dữ liệu.</p>
            )}
          </div>

          {/* Cột 3 - Liên hệ */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Liên hệ</h5>

            {loadingOptions ? (
              <div className="d-flex align-items-center gap-2">
                <ClipLoader size={32} color="#ffffff" />
              </div>
            ) : lienHe ? (
              <div dangerouslySetInnerHTML={{ __html: lienHe }} />
            ) : (
              <p>Không có dữ liệu.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
