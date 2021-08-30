import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group";
import sty from './index.module.scss';

function Modal(props) {

    const children = (
        <div onClick={() => props.onHide()} className={sty.mask}>
            <div onClick={e => e.stopPropagation()} className={sty.box}>
                {props.children}
            </div>
        </div>
    )

    return (
        <CSSTransition unmountOnExit in={props.show} timeout={200} classNames='modal'>
            <>
                {
                    ReactDOM.createPortal(children, document.body)
                }
            </>
        </CSSTransition>
    );
}

export default Modal;