// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // chặn reload
    if (searchKey.trim()) {
      navigate(`/search?key=${encodeURIComponent(searchKey)}`);
    }
  };

  return (
    <header className="header_main">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-lg-10">
            <div className="row align-items-center">
              <div className="col-auto">
                <Link className="header_main_logo" to="/">
                  <img src="/images/logo.svg" alt="logo" />
                </Link>
              </div>
              <div className="col">
                <nav className="header_main_nav">
                  <NavLink
                    to="/"
                    className={({ isActive }) => ` ${isActive ? 'active' : ''}`}
                  >
                    Trang chủ
                  </NavLink>
                  <NavLink
                    to="/posts"
                    className={({ isActive }) => ` ${isActive ? 'active' : ''}`}
                  >
                    Danh sách bài viết
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <form className="header_main_form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
