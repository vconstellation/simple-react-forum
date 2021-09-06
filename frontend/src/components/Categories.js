import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';
import { Link } from 'react-router-dom';

const Categories = () => {

    const [categories, setCategories] = useState(null);

    let id = useParams();

    useEffect(() => {
        try {
            axiosInstance.get('/api/forum/').then((res) => {
                const data = res.data;
                setCategories(data);
            })
        } catch (e) {
            throw e;
        }
    }, [])

    return (
        <div>
            <h1>Kategorie</h1>
            {categories && categories.map((item) => (
                <Link to={`/threads/${item.slug}`} key={item.id}>{ item.category_name } </Link>
            ))}
        </div>
    )
}

export default Categories;