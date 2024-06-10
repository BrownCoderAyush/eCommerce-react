import { useEffect, useState } from "react";
import { getAllCategories } from "../APIs/fakeStoreProdApis";
import axios from "axios";

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    async function downloadCategories() {
        const response = await axios.get(getAllCategories());
        setCategories(response.data);
    }

    useEffect(() => {
        downloadCategories();
    }, [])
    return [categories];
}