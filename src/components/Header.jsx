// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0 fs-3">React Post</h1>
        <nav className="d-flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white text-decoration-none ${isActive ? 'fw-bold' : ''}`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `text-white text-decoration-none ${isActive ? 'fw-bold' : ''}`
            }
          >
            Bài viết
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white text-decoration-none ${isActive ? 'fw-bold' : ''}`
            }
          >
            Giới thiệu
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
