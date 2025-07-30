import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOptions } from "../store/options/optionsSlice";
import LatestPosts from "../components/LatestPosts";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";

const Home = () => {
  const dispatch = useDispatch();
  const { data: optionsData } = useSelector((state) => state.options);

  useEffect(() => {
    dispatch(getOptions());
  }, [dispatch]);

  return (
    <div>
      {/* banner */}
      <Banner pageId={optionsData?.trang_chu} />

      {/* tin tức mới nhất */}
      <LatestPosts />

      {/* category */}
      <CategoryList />
    </div>
  );
};

export default Home;