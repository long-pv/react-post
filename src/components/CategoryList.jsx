import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosClient.get(
                    "/wp-json/wp/v2/categories?_fields=id,name,slug"
                );
                setCategories(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách category:", err);
            }
        };

        fetch();
    }, []);

    if (!categories.length) return null;

    return (
        <div className="section container">
            <div className="category-list">
                <h2 className="mb-3">Chuyên mục</h2>
                <div className="row">
                    {categories.map((cat) => (
                        <div className="col-6 col-md-3 mb-3" key={cat.id}>
                            <Link
                                to={`/category/${cat.slug}`}
                                className="btn btn-outline-secondary w-100 text-center"
                            >
                                {cat.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
