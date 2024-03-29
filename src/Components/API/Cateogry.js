import axios from "axios";
import { useState, useEffect } from "react";


const Cateogry = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://englishforum.zeabur.app/api/v1/categories',
            );
            setCategory(result.data);
        };
        fetchData();
    }, []);

    return category;
}

export default Cateogry;