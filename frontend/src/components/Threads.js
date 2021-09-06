import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from './AxiosAPI';

const Threads = () => {

    const [threads, setThreads] = useState(null);

    let { slug } = useParams();

    useEffect(() => {
        axiosInstance.get(`/api/forum/category/${slug}/`).then((res) => {
            const data = res.data;
            setThreads(data);
        })
    }, [])

    return (
        <div>
            <h2>Threads</h2>
            {threads && threads.threads.map((item) => (
                <Link to={`/posts/${item.id}/`} key={item.id}> {item.name} </Link>
            ))}
        </div>
    )

}

export default Threads;