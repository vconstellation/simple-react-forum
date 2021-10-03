import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from './AxiosAPI';

const CreatePost = () => {

    const [postMsg, setPostMsg] = useState(null);
    const [username, setUsername] = useState(null);

    const { id } = useParams();

    // this need to get removed and made into helper class
    useEffect(() => {
        axiosInstance.get('api/forum/user/').then((res) => {
            const data = res.data;
            const username = data.pk;
            setUsername(username);
        })
    }, [])


    const onChangePostMsg = (e) => {
        const postMsg = e.target.value;
        setPostMsg(postMsg);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axiosInstance.post('api/forum/posts/create_new/', {
                msg: postMsg,
                post_author: username,
                thread: id,
                thread_id: id,
                }
            ).then((res) => (
                window.location.reload()
            ))
        } catch (e) {
            throw e;
        }
    }




    return (
        <div>
            Create Post
            <form onSubmit={handleSubmit}>
                <label>
                    Post msg:
                    <textarea name='Post msg' type='text' value={postMsg} onChange={onChangePostMsg} />
                </label>
                <input type='submit' value='Submit' />
            </form>

        </div>
    )
}

export default CreatePost;