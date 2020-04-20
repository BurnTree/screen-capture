import React, {Component} from 'react';
import {Button, Media} from 'reactstrap';
import {toast} from "react-toastify";
import fair from './fair.jpg';

class SomeFragment extends Component {

    // notifySuccess = () => {
    //     toast.success('Message send', {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: false
    // });
    // }

    notifyError = () => {
        toast.error('Message not send!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }

    render() {
        return (
            <div>
                <h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h1>
                <Button onClick={this.notifyError}>Its button for test</Button>
                <br/>
                <img src={fair} alt="fair photo"/>

            </div>
        );
    }
}

export default SomeFragment;