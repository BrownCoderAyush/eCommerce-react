import { Link } from "react-router-dom";

function CategoryItem({categoryName , filter=''}) {

    const redirectLink = `/products?category=${filter}`;

    return (
        <div className="category-item d-flex align-items-center justify-content-center">
            <Link to={redirectLink}>{categoryName}</Link>
        </div>
    )
}

export default CategoryItem;