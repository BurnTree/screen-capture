import React, {Component} from 'react';
import {Button} from 'reactstrap';
import ScreenshotDecorator from "./ScreenshotDecorator";
import {FaBell} from "react-icons/all";

class Header extends Component {

    state = {
        setIsOpen: false
    }


    render() {
        return (
            <div>
                <Button className="float-right mx-5 my-2" color="primary" onClick={() => this.props.openModal()}><FaBell/></Button>
                <br/>
                {this.props.modalWindow()}
            </div>
        );
    }
}

export default ScreenshotDecorator(Header);