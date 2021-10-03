import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from './AxiosAPI';

const UpdatePost = (props) => {

    const [postMsg, setPostMsg] = useState(null);
    const [username, setUsername] = useState(null);

    const { id } = useParams();


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
            axiosInstance.put(`api/forum/posts/update/${props.value}/`, {
                msg: postMsg,
                post_author: username,
                thread: id,
                thread_id: id,
                pk: props.value,
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
            Update Post
            <form onSubmit={handleSubmit}>
                <label>
                    <textarea name='Post msg' type='text' value={postMsg} onChange={onChangePostMsg} />
                </label>
                <input type='submit' value='Submit' />
                <h1>{ props.value }</h1>
            </form>

        </div>
    )
}

export default UpdatePost;