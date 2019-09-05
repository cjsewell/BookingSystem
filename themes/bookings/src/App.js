import React, {useState} from 'react';
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
import {AuthProvider, AuthConsumer} from "./components/context/AuthProvider";


function App() {
    const [isOpen, setOpen] = useState(false);

    function toggleSmallScreen () {
        setOpen(!isOpen)
    }

    return (
          <AuthProvider>
              <Router>
                  <AuthConsumer>
                      {({member}) => {
                          return member ? (
                                  <>
                                      <Navbar light color="light" expand="md">
                                          <NavbarToggler onClick={toggleSmallScreen}/>
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
                                  </>
                              ) :
                              <>
                              </>
                      }}

                  </AuthConsumer>
                  <Switch>
                      <Route path='/profile/login' component={Login} />
                      <Route path='/' component={props => <DefaultLayout {...props} />}/>
                  </Switch>
              </Router>
          </AuthProvider>
      );
}

export default App;
