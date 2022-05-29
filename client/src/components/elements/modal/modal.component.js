import React, { createContext, useContext, useEffect, createRef } from "react";
import { createPortal } from "react-dom";

import { BiX } from "react-icons/bi";

import "./modal.styles.css";

const ModalContext = createContext();

const POSITIONS = ["modal-centre", "modal-topright"];

const SIZES = ["modal-md", "modal-sm"];

export default function Modal({
  children,
  modalId,
  modalSize,
  modalPosition,
  onModalClose,
}) {
  const checkModalSize = SIZES.includes(modalSize) ? modalSize : SIZES[0];

  const checkModalPosition = POSITIONS.includes(modalPosition)
    ? modalPosition
    : POSITIONS[0];

  // Keyboard shortcut
  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();
  const handleTabKey = (e) => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ]);

  return createPortal(
    <>
      <div
        role="dialog"
        id={modalId}
        className={`modal-container ${checkModalSize} ${checkModalPosition}`}
        aria-modal="true"
      >
        <div className="modal-document" role="document">
          <div className="modal-content" ref={modalRef}>
            <ModalContext.Provider value={{ onModalClose }}>
              {children}
            </ModalContext.Provider>
          </div>
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
        className="modal-close-btn"
        aria-label="Close Modal"
        onClick={onModalClose}
      >
        <BiX className="btn-icon" />
      </button>
      <h4>{props.children}</h4>
    </div>
  );
};

Modal.Body = function ModalBody(props) {
  return <div className="modal-body">{props.children}</div>;
};
