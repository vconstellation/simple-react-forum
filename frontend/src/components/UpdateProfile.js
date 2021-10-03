import { useEffect, useState } from "react";
import axiosInstance from "./AxiosAPI";


const UpdateProfile = (props) => {


    const [newBio, setNewBio] = useState(null);

    // this need to get removed and made into helper class
    const [username, setUsername] = useState(null);

    useEffect(() => {
        axiosInstance.get('api/forum/user/').then((res) => {
            const data = res.data;
            const username = data.username;
            setUsername(username);
        })
    }, [])

    const onChangeBioField = (e) => {
        const newBio = e.target.value;
        setNewBio(newBio);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axiosInstance.put(`api/users/profile/${username}/update/`, {
                bio: newBio,
                user: props.value,
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
            Update Profile
            <form onSubmit={handleSubmit}>
                <label>
                    <textarea name='New bio' type='text' value={newBio} onChange={onChangeBioField} />
                </label>
                <br />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default UpdateProfile;