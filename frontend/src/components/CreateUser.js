import { useState } from "react";
import axiosInstance from "./AxiosAPI";

const CreateUser = () => {
    
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [bio, setBio] = useState(null);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeAvatar = (e) => {
        const avatar = e.target.files[0]
        setAvatar(avatar);
    }

    const onChangeBio = (e) => {
        const bio = e.target.value;
        setBio(bio)
    }

    // special axios handler for the posting image purposes
    // const axiosInstance = axios.create({
    //     baseURL: 'http://127.0.0.1:8000/',
    //     timeout: 5000,
    //     headers: {
    //         'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
    //         'Content-Type': undefined,
    //         'accept': 'application/json'
    //     }
    // });

    // since i've been having issues with the multipart/form-data
    // instantiating a formData seems like a solution to the issue

    // const config = { headers: {
    //     'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
    //     'Content-type': 'multipart/form-data',
    //     'accept': 'application/json'
    // }}

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         let fd = new FormData();
    //         fd.append('username', username);
    //         fd.append('password', password);
    //         fd.append(
    //             'profile', {
    //                 user: username,
    //                 bio: bio,
    //                 avatar: avatar,
    //             }
    //         )
    //         const res = await axios.post('http://127.0.0.1:8000/api/users/create/', fd, config)
    //         return res;
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('api/users/create/', {
                username: username,
                password: password,
                profile: {
                    // user: username,
                    bio: bio,
                    // avatar: avatar,
                }
            })
            return res;
        } catch (e) {
            throw e;
        }
    }

    return (
        <div>
            Signup
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input name='username' type='text' value={username} onChange={onChangeUsername} />
                </label>
                <label>
                    Password:
                    <input name='password' type='password' value={password} onChange={onChangePassword} />
                </label>
                <label>
                    Bio:
                    <input name='bio' type='text' value={bio} onChange={onChangeBio} />
                </label>
                <label>
                    Avatar:
                    <input name='avatar' type='file' onChange={onChangeAvatar} />
                </label>
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default CreateUser;