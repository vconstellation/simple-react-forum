import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from './AxiosAPI';

const CreateThread = () => {

    const [threadName, setThreadName] = useState(null);
    const [username, setUsername] = useState(null);

    const { slug } = useParams();

    useEffect(() => {
        axiosInstance.get('api/forum/user/').then((res) => {
            const data = res.data;
            const username = data.pk;
            setUsername(username);
        })
    }, [])


    const onChangeThreadName = (e) => {
        const threadName = e.target.value;
        setThreadName(threadName);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axiosInstance.post('api/forum/threads/create_new/', {
                thread_name: threadName,
                thread_author: username,
                category_id: slug,
                }
            ).then((res) => (
                console.log(res)
            ))
        } catch (e) {
            throw e;
        }
    }




    return (
        <div>
            Create Thread
            <br />
            { username }
            <br />
            { slug }
            <form onSubmit={handleSubmit}>
                <label>
                    Thread Name:
                    <input name='Thread Name' type='text' value={threadName} onChange={onChangeThreadName} />
                </label>
                <input type='submit' value='Submit' />
            </form>

        </div>
    )
}

export default CreateThread;