import { Link } from "react-router-dom";

function CategoryItem({categoryName}) {


    return (
        <div className="category-item d-flex align-items-center justify-content-center">
            <Link to="/products">{categoryName}</Link>
        </div>
    )
}

export default CategoryItem;