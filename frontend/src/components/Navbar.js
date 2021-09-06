import { AppBar, Tabs, Tab } from '@material-ui/core/';
import { Switch, Route, Link } from 'react-router-dom';
import Categories from './Categories';
import Threads from './Threads';
import Posts from './Posts';

const Navbar = () => {


    return (
        <div>
            <AppBar position='static'>
                <Tabs>
                    <Tab label='Home' component={Link} to='/' />
                    <Tab label='Categories' component={Link} to='#' />
                </Tabs>
            </AppBar>
            <Switch>
                <Route exact path={'/'} component={Categories} />
                <Route exact path={'/threads/:slug'} component={Threads} />
                <Route exact path={'/posts/:id/'} component={Posts} />
            </Switch>
        </div>
    )
}

export default Navbar;