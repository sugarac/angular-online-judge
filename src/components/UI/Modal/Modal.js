import React, {Component} from 'react';

import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi/Auxi'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) { //improve performance
        return nextProps.show !== this.props.show;
    }
    componentWillUpdate() {
        console.log('Modal componentWillUpdate')
    }


    render() {
        return (
            <Auxi>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translate(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxi>)
    }
}

export default Modal;