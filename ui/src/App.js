// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Routes from './router';
import { authenticate } from './store/modules/auth';
import MainNavbar from './components/MainNavbar';

class App extends Component {
    state = {
        show: false,
    };

    componentDidMount() {
        const { authenticate } = this.props;

        authenticate()
            .then(() => this.setState({ show: true }))
            .catch((error) => {
                this.setState({ show: true });

                console.log(error);
            });
    }

    render() {
        const { show } = this.state;

        return (
            <>
                {!show && null}
                {show && (
                    <>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                        />
                        <MainNavbar />
                        <Container id="wrapper">
                            <Routes />
                        </Container>
                    </>
                )}
            </>
        );
    }
}

export default connect(null, { authenticate })(App);
