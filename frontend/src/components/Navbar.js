import { AppBar, Tabs, Tab } from '@material-ui/core/';
import { Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Categories from './Categories';
import Threads from './Threads';
import Posts from './Posts';
import Login from './Login';
import axiosInstance from './AxiosAPI';
import CreateThread from './CreateThread';
import CreatePost from './CreatePost';
import CreateUser from './CreateUser';
import Profile from './Profile';

const Navbar = () => {

    // checks if user is logged in, currently doesnt refres when user logs out
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // useEffect(() => {
    //     {
    //         axiosInstance.get('api/users/logged_in/').then((res) => {
    //             if (res) {
    //                 setIsLoggedIn(true);
    //             }
    //         })
    //     } 
    // }, [])

    // styles block

    const navbarStyle = {
        backgroundColor: '#4E699D',
    }

    // end of block

    const [username, setUsername] = useState(null);

    useEffect(() => {
        axiosInstance.get('api/forum/user/').then((res) => {
            if (res) {
                const data = res.data;
                const username = data.username;
                setUsername(username);
                setIsLoggedIn(true);
            }

        })
    }, [])

    // logout and blacklist token logic:
    const handleLogout = () => {
        try {
            const response = axiosInstance.post('/api/users/logout/', {
                "refresh_token": localStorage.getItem('refresh_token')
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            setIsLoggedIn(false);
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <AppBar style={navbarStyle} position='static'>
                <Tabs>
                    <Tab label='Home' component={Link} to='/' />
                    <Tab label='Categories' component={Link} to='#' />
                    { isLoggedIn ? 
                    <Tab label='logout' onClick={handleLogout} /> 
                    : <Tab label='Login' component={Link} to='/login/' /> }
                    <Tab label='create_account' component={Link} to='users/create/' />
                    <Tab label={username} component={Link} to={`/users/profile/${username}/`} />
                </Tabs>
            </AppBar>
            <Switch>
                <Route exact path={'/'} component={Categories} />
                <Route exact path={'/users/create/'} component={CreateUser} />
                <Route exact path={'/threads/:id'} component={Threads} />
                <Route exact path={'/posts/:id/'} component={Posts} />
                <Route exact path={'/login/'} component={Login} />
                <Route exact path={'/threads/:id/create_new'} component={CreateThread} />
                <Route exact path={'/posts/:id/create_new'} component={CreatePost} />
                <Route exact path={'/users/profile/:slug/'} component={Profile} />
            </Switch>
        </div>
    )
}

export default Navbar;