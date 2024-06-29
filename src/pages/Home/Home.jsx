import axios from 'axios';
import { useEffect, useState } from 'react';

import CategoryItem from '../../components/CategoryItem/CategoryItem';
import { getAllCategories } from '../../APIs/fakeStoreProdApis';

//css imports 
import './Home.css';
import useCategory from '../../hooks/useCategory';

function Home() {

    const [categories]=useCategory();

    return (
        <div className="container welcome-wrapper h-900">
            <div className="row">
                <h2 className="home-title text-center">Welcome to Shop Cart</h2>
                <div className="category-list d-flex flex-row justify-content-between align-items-center" id="categoryList">
                    <CategoryItem categoryName="All Products" />
                    {categories.map((category, index) =>{
                        return <CategoryItem      
                        categoryName={category}
                        key={index}
                        filter={category}

                    />
                    })}
                </div>
                <div className="category-title text-center">
                    Select a category to start Shopping
                </div>
            </div>
        </div>
    )


}

export default Home;