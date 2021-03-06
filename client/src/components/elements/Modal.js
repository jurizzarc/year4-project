import React, { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const ModalContext = createContext();

const SIZES = [
    'modal-default',
    'modal-sm'
];

export default function Modal({
    children,
    modalId,
    modalSize,
    onModalClose
}) {
    const checkModalSize = SIZES.includes(modalSize)
        ? modalSize
        : SIZES[0];
    return createPortal(
        <>
            <div
                role="dialog"
                id={modalId}
                className={`modal-container ${checkModalSize}`}
                aria-modal="true"
            >
                <div className="modal-content">
                    <ModalContext.Provider value={{ onModalClose }}>
                        {children}
                    </ModalContext.Provider>
                </div>
            </div>
            <div className="modal-overlay" id="modal-overlay"></div>
        </>,
        document.body
    );
}

Modal.Header = function ModalHeader(props) {
    const { onModalClose } = useContext(ModalContext);

    return (
        <div className="modal-header">
            <button 
                className="close-btn"
                title="Close Modal"
                onClick={onModalClose}
            >
                Close
            </button>
            <h5>{props.children}</h5>
        </div>
    );
}

Modal.Body = function ModalBody(props) {
    return (
        <div className="modal-body">
            {props.children}
        </div>
    );
}