import React, {Component} from 'react'
import html2canvas from "html2canvas";
import {Button, Form, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";
import './overlap.css'
import base64 from 'base-64'
import axios from 'axios';
import {toast} from "react-toastify";

export default (CompWithPopup) => class ScreenshotDecorator extends Component {
    //toasts
    notifySuccess = () => {
        toast.success('Message send', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
        });
    }

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

    state = {
        decodeImage: null,
        image: null,
        message: '',
        loaded: false,
        setIsOpen: false,

        winHeight: '',
        winWidth: '',
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,

        on: false,
        isMouseDown: false,
        borderWidth: '',

    }

    componentDidMount = () => {
        window.addEventListener('resize', this.windowResize)
        this.windowResize()
    }

    windowResize = () => {
        this.setState({
            winHeight: window.innerHeight,
            winWidth: window.innerWidth
        })
    }

    handleStart = () => {
        this.setState({on: true})
    }

    handleMouseDown = (e) => {
        this.setState({
            startX: e.clientX,
            startY: e.clientY,
            isMouseDown: true
        })
    }

    handleMouseUp = (e) => {
        const {startX, startY} = this.state
        const X = (startX < e.clientX) ? startX : e.clientX
        const Y = (startY < e.clientY) ? startY : e.clientY
        this.createScreen(X, Y, Math.abs(startX - e.clientX), Math.abs(startY - e.clientY))
        this.setState({
            isMouseDown: false,
            on: false,
            startX: '',
            startY: '',
            endX: e.clientX,
            endY: e.clientY,
            borderWidth: '',
        })
    }

    handleMouseMove = (e) => {
        const ownX = e.clientX
        const ownY = e.clientY
        const {startX, startY, winHeight, winWidth} = this.state
        let newBorder;
        let topBorder;
        let rightBorder;
        let bottomBorder;
        let leftBorder;

        if (startX > ownX) {
            leftBorder = ownX
            rightBorder = winWidth - startX
        } else {
            leftBorder = startX
            rightBorder = winWidth - ownX
        }
        if (startY > ownY) {
            topBorder = ownY
            bottomBorder = winHeight - startY
        } else {
            topBorder = startY
            bottomBorder = winHeight - ownY
        }

        newBorder = `${topBorder}px ${rightBorder}px ${bottomBorder}px ${leftBorder}px`
        this.setState({borderWidth: newBorder})
    }

    createScreen = (startX, startY, width, height) => {
        this.setState({setIsOpen: false})
        if (width <= 20 || height <= 20) {
            this.setState({setIsOpen: true})
            return
        }

        html2canvas(document.body)
            .then((canvas) => {
                let screen = document.createElement('canvas')
                screen.height = height
                screen.width = width
                screen.crossOrigin = "anonymous"
                let changeScreen = screen.getContext('2d')
                changeScreen.drawImage(canvas, startX, startY, width, height, 0, 0, width, height)
                const image = screen.toDataURL()
                this.setState({image})
                this.setState({setIsOpen: true})
            });
    }

    render() {
        return <CompWithPopup createScreen={this.createScreen} {...this} image={this.state.image}
                              loaded={this.state.loaded}/>
    }

    changeMessage = (ev) => {
        this.setState({message: ev.target.value})
    }

    changeImage = (image) => {
        this.setState({image})
    }

    toggle = () => {
        const revertOpen = !this.state.setIsOpen
        this.setState({
            setIsOpen: revertOpen,
            message: '',
            image: null
        });
    }

    openModal = () => {
        this.setState({setIsOpen: true});
    }

    fetchData = () => {
        const decodeImage = base64.encode(this.state.image)
        console.log(decodeImage)
        // this.createFile(this.state.image)
        axios.post('http://localhost:8080/message/send', {
            image: this.state.image,
            message: this.state.message
        }).then(res => {
            this.notifySuccess()
            this.toggle()
        })
            .catch(error => (this.notifyError()))
    }

    modalWindow = () => {
        const {on, isMouseDown, borderWidth, message} = this.state

        if (on) return <div
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
        >
            <div
                className={`overlay ${isMouseDown ? 'highlighting' : ''}`}
                style={{borderWidth}}
            />
        </div>

        return <Modal isOpen={this.state.setIsOpen} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
                Send your message
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Label>Message</Label>
                    <Input type="textarea" name="message" value={message} onChange={(e) => this.changeMessage(e)}/>
                    <div className="m-3">
                        <button className="btn btn-primary"
                                onClick={(ev) => this.handleStart()}>create screen
                        </button>
                    </div>
                    <Button className="float-right m-3" onClick={() => this.fetchData()}>Send</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <img src={this.state.image} width={450}/>
            </ModalFooter>
        </Modal>

    }
}