import { useState } from "react"
import axiosInstance from "./AxiosAPI";


const Login = () => {
    
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axiosInstance.post('api/users/obtain/', {
                username: username,
                password: password,
            }).then (
                res => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT" + res.data.access;
                    localStorage.setItem('access_token', res.data.access)
                    localStorage.setItem('refresh_token', res.data.refresh)
                }
            )
        } catch (e) {
            throw e;
        }
    }

    return (
        <div>
            Login
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input name='username' type='text' value={username} onChange={onChangeUsername} />
                </label>
                <label>
                    Password:
                    <input name='password' type='password' value={password} onChange={onChangePassword} />
                </label>
                <input type='submit' value='Submit' />
            </form>

        </div>
    )
}

export default Login;