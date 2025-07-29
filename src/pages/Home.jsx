import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPageById } from "../store/page/pageSlice";
import { getOptions } from "../store/options/optionsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data: optionsData } = useSelector((state) => state.options);
  const { data: pageData } = useSelector((state) => state.page);
  const trang_chu_id = optionsData?.trang_chu;
  console.log(pageData);

  useEffect(() => {
    dispatch(getOptions());
  }, [dispatch]);

  useEffect(() => {
    if (trang_chu_id) {
      dispatch(getPageById(trang_chu_id));
    }
  }, [dispatch, trang_chu_id]);

  return (
    <div>
      <h2 className="mb-4">Bài viết mới nhất</h2>

      <div className="text-center mt-4">
        <Link to="/posts" className="btn btn-outline-secondary">
          Xem tất cả bài viết
        </Link>
      </div>
    </div>
  );
};

export default Home;