import React, {Component} from 'react';
import './assets/css/App.scss';
import {
    Nav,
    Navbar,
    NavbarToggler,
    Collapse,
    NavItem,
} from 'reactstrap';
import MainNav from "./components/navigation/MainNav";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./components/pages/Login";

const initialState = {
    isOpen: false
};

class App extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    toggleSmallScreen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

  render(){
      const {isOpen} = this.state;

      return (
          <Router>
            <Navbar light color="light" expand="md">
                <NavbarToggler onClick={this.toggleSmallScreen}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {MainNav.links.map((item) => {
                                return (
                                    <NavItem key={item.url} className="navbar-nav">
                                        <NavLink exact to={item.url}
                                                 className="nav-link"> {item.name}</NavLink>
                                    </NavItem>
                                )
                            }
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
              <Switch>
                  <Route path='/profile/login' component={Login} />
                  <Route path='/' component={props => <DefaultLayout {...props} />}/>
              </Switch>
      </Router>
    );
  }
}

export default App;
