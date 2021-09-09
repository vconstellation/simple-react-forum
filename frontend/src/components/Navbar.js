import { AppBar, Tabs, Tab } from '@material-ui/core/';
import { Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Categories from './Categories';
import Threads from './Threads';
import Posts from './Posts';
import Login from './Login';
import axiosInstance from './AxiosAPI';

const Navbar = () => {

    // checks if user is logged in, currently doesnt refres when user logs out
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        {
            axiosInstance.get('api/users/logged_in/').then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                }
            })
        } 
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
            <AppBar position='static'>
                <Tabs>
                    <Tab label='Home' component={Link} to='/' />
                    <Tab label='Categories' component={Link} to='#' />
                    
                    <Tab label='Login' component={Link} to='/login/' />
                </Tabs>
            </AppBar>
            <div>
                <button onClick={handleLogout}>Logout</button> 
                <t> { isLoggedIn ? 'Logged in' : 'Not logged in' }</t> 
            </div>
            <Switch>
                <Route exact path={'/'} component={Categories} />
                <Route exact path={'/threads/:slug'} component={Threads} />
                <Route exact path={'/posts/:id/'} component={Posts} />
                <Route exact path={'/login/'} component={Login} />
            </Switch>
        </div>
    )
}

export default Navbar;