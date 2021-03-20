import React, { useState } from 'react';
import Button from '../elements/Button';
import Modal from '../elements/Modal';

const AccessibilityMenu = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <Button
                buttonId="accessibility"
                type="button"
                buttonStyle="btn-accessibility"
                buttonSize="btn-md"
                onClick={
                    () => setIsModalVisible(true)
                }
            >
                Accessibility
            </Button>
            {isModalVisible && (
                <Modal 
                    modalId="accessibility-options-modal"
                    modalSize="modal-default"
                    onModalClose={
                        () => setIsModalVisible(false)
                    }
                >
                    <Modal.Header>Accessibility Options</Modal.Header>

                    <Modal.Body>
                        <div className="dialog-form">
                            <div className="dialog-form-item">
                                <label htmlFor="main-theme">Change Theme</label>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default AccessibilityMenu;