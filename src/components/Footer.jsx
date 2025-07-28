import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Footer = () => {
  const { data, loading } = useSelector((state) => state.options);
  const lienHe = data?.lien_he;

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Cột 1 - Logo */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">React Post</h5>
            <p>Simple Blog built with React + WordPress (Headless).</p>
          </div>

          {/* Cột 2 - Bài viết mới (fix cứng tạm) */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Bài viết mới</h5>
            <ul className="list-unstyled">
              <li><Link to="/posts/post-1" className="text-white">Post 1</Link></li>
              <li><Link to="/posts/post-2" className="text-white">Post 2</Link></li>
              <li><Link to="/posts/post-3" className="text-white">Post 3</Link></li>
            </ul>
          </div>

          {/* Cột 3 - Liên hệ */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Liên hệ</h5>

            {loading ? (
              <div className="d-flex align-items-center gap-2">
                <ClipLoader size={32} color="#ffffff" />
              </div>
            ) : lienHe ? (
              <div dangerouslySetInnerHTML={{ __html: lienHe }} />
            ) : (
              <p>Không có dữ liệu liên hệ.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
