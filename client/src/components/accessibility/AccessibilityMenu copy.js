import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTheme } from '../../theme/useTheme';
import { getFromLS } from '../../utils/storage';
import Button from '../elements/Button';
import Modal from '../elements/Modal';

const AccessibilityMenu = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const themesFromStore = getFromLS('all-themes');
    const [data, setData] = useState(themesFromStore.data);
    const [themes, setThemes] = useState([]);
    const { setMode } = useTheme();

    const themeSwitcher = (selectedTheme) => {
        console.log(selectedTheme);
        setMode(selectedTheme);
        props.setter(selectedTheme);
    };

    useEffect(() => {
        setThemes(_.keys(data));
    }, [data]);

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
                    modalSize="modal-sm"
                    onModalClose={
                        () => setIsModalVisible(false)
                    }
                >
                    <Modal.Header>Accessibility Options</Modal.Header>

                    <Modal.Body>
                        <div className="dialog-form">
                            <div className="dialog-form-item">
                                <label htmlFor="mainTheme">Change Theme</label>
                                <select
                                    name="mainTheme"
                                    id="mainTheme"
                                    className="form-select"
                                    onChange={
                                        (theme) => themeSwitcher(theme)
                                    }
                                >
                                    {
                                        themes.length > 0 &&
                                        themes.map(theme => (
                                            <option
                                                key={data[theme].id}
                                                value={data[theme].name}
                                            >
                                                {data[theme].name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default AccessibilityMenu;