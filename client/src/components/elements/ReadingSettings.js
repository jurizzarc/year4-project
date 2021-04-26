import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BiArrowBack, BiPalette, BiFontFamily, BiAlignLeft } from 'react-icons/bi';
import Button from '../elements/Button';
import Modal from '../elements/Modal';

const ReadingSettings = () => {
    const initStyles = {
        articleBgColor: '#FAFAFA',
        articleTextColor: '#161616',
        maxFontSize: '20',
        articleLineHeight: '1.5',
        articleLetterSpacing: '0',
        articleFontFamily: 'PT Serif',
        articleTextAlign: 'left'
    };
    const [values, setValues] = useState({
        articleBgColor: '',
        articleTextColor: '',
        maxFontSize: '',
        articleLineHeight: '',
        articleLetterSpacing: '',
        articleFontFamily: '',
        articleTextAlign: ''
    });
    const [fontOptions] = useState([
        { label: 'Alegreya', value: 'Alegreya' },
        { label: 'Andika', value: 'Andika' },
        { label: 'Arial', value: 'Arial' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'PT Sans', value: 'PT Sans' },
        { label: 'PT Serif', value: 'PT Serif' },
        { label: 'Tahoma', value: 'Tahoma' },
        { label: 'Times', value: 'Times' },
        { label: 'Verdana', value: 'Verdana' }
    ]);
    const [isColourModalVisible, setIsColourModalVisible] = useState(false);
    const [isTextModalVisible, setIsTextModalVisible] = useState(false);
    const [isLayoutModalVisible, setIsLayoutModalVisible] = useState(false);
    const history = useHistory();
    const onBackBtnClick = () => history.push('/dashboard');

    useEffect(() => {
        // const articleBgColor = localStorage.getItem('article-bg-color');
        // const articleTextColor = localStorage.getItem('article-text-color');
        // const maxFontSize = localStorage.getItem('max-font-size');
        // const articleLineHeight = localStorage.getItem('article-line-height');
        // const articleLetterSpacing = localStorage.getItem('article-letter-spacing');
        // const articleFontFamily = localStorage.getItem('article-font-family');
        // const articleTextAlign = localStorage.getItem('article-text-align');
        setValueFromLocalStorage('article-bg-color');
        setValueFromLocalStorage('article-text-color');
        setValueFromLocalStorage('max-font-size');
        setValueFromLocalStorage('article-line-height');
        setValueFromLocalStorage('article-letter-spacing'); 
        setValueFromLocalStorage('article-font-family');
        setValueFromLocalStorage('article-text-align');
    }, []);

    useEffect(() => {
        const parsedValues = JSON.parse(localStorage.getItem('values'));
        setValues(parsedValues);
    }, []);

    useEffect(() => {
        localStorage.setItem('values', JSON.stringify(values));
    }, [values]);

    const setValueFromLocalStorage = (readingProp) => {
        let value = window.localStorage.getItem(readingProp);
        document.documentElement.style.setProperty(
            `--${readingProp}`,
            value
        );
        const input = document.querySelector(`#${readingProp}`);
        // if (readingProp == 'max-font-size' || readingProp == 'article-letter-spacing') input.value = value.replace('px', '');
    };

    const handleInputChange = (readingProp, isPixel, e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });

        document.documentElement.style.setProperty(
            `--${readingProp}`,
            `${value}${isPixel ? 'px': ''}`
        );
        window.localStorage.setItem(
            readingProp,
            `${value}${isPixel ? 'px' : ''}`
        );
    };

    return (
        <>
            <header
                className="reading-customisation-menu"
            >
                <Button
                    buttonStyle="btn-ghost"
                    buttonSize="btn-sm"
                    ariaLabel="Back to Dashboard Button"
                    onClick={onBackBtnClick}
                >
                    <BiArrowBack className="btn-icon" />
                    <span className="nav-name">Back</span>
                </Button>

                <ul 
                    className="centre-menu"
                    role="toolbar"
                >
                    <li>
                        <Button
                            buttonStyle="btn-ghost"
                            buttonSize="btn-sm"
                            ariaLabel="Colour Options"
                            onClick={
                                () => setIsColourModalVisible(true)
                            }
                        >
                            <BiPalette className="btn-icon" />
                            <span className="nav-name">Colour</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            buttonStyle="btn-ghost"
                            buttonSize="btn-sm"
                            ariaLabel="Font Options"
                            onClick={
                                () => setIsTextModalVisible(true)
                            }
                        >
                            <BiFontFamily className="btn-icon" />
                            <span className="nav-name">Text</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            buttonStyle="btn-ghost"
                            buttonSize="btn-sm"
                            ariaLabel="Layout Options"
                            onClick={
                                () => setIsLayoutModalVisible(true)
                            }
                        >
                            <BiAlignLeft className="btn-icon" />
                            <span className="nav-name">Layout</span>
                        </Button>
                    </li>
                </ul>
            </header>
            {/* Reading Settings Modals */}
            {isColourModalVisible && (
                <Modal
                    modalId="colour-options-modal"
                    modalSize="modal-sm"
                    modalPosition="modal-topright"
                    onModalClose={
                        () => setIsColourModalVisible(false)
                    }
                >
                    <Modal.Header>Colour</Modal.Header>
                    <Modal.Body>
                        <form id="colour-options-form">
                            <div className="settings-form-group">
                                <label className="settings-label" htmlFor="article-bg-color">Background</label>
                                <input 
                                    type="color"
                                    id="article-bg-color"
                                    name="articleBgColor"
                                    value={(values && values.articleBgColor) || initStyles.articleBgColor}
                                    onChange={
                                        (e) => handleInputChange('article-bg-color', false, e)
                                    }
                                />
                            </div>
                            <div className="settings-form-group">
                            <label className="settings-label" htmlFor="article-text-color">Text</label>
                            <input 
                                type="color"
                                id="article-text-color"
                                name="articleTextColor"
                                value={(values && values.articleTextColor) || initStyles.articleTextColor}
                                onChange={
                                    (e) => handleInputChange('article-text-color', false, e)
                                }
                            />
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
            {isTextModalVisible && (
                <Modal
                    modalId="font-options-modal"
                    modalSize="modal-sm"
                    modalPosition="modal-topright"
                    onModalClose={
                        () => setIsTextModalVisible(false)
                    }
                >
                    <Modal.Header>Text</Modal.Header>
                    <Modal.Body>
                        <form id="font-options-form">
                            <div className="settings-form-group">
                                <label className="settings-label" htmlFor="article-font-family">Font</label>
                                <select
                                    id="article-font-family"
                                    name="articleFontFamily"
                                    value={(values && values.articleFontFamily) || initStyles.articleFontFamily}
                                    onChange={
                                        (e) => handleInputChange('article-font-family', false, e)
                                    }
                                >
                                    <option></option>
                                    {fontOptions.map(fontOption => (
                                        <option
                                            key={fontOption.value}
                                            value={fontOption.value}
                                        >
                                            {fontOption.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="settings-form-group">
                                <label className="settings-label" htmlFor="max-font-size">Font Size</label>
                                <input 
                                    type="range"
                                    id="max-font-size"
                                    name="maxFontSize"
                                    min="14"
                                    max="40"
                                    step="1"
                                    defaultValue={(values && values.maxFontSize) || initStyles.maxFontSize}
                                    onChange={
                                        (e) => handleInputChange('max-font-size', false, e)
                                    }
                                />
                            </div>
                            <div className="settings-form-group">
                                <label className="settings-label" htmlFor="article-line-height">Line Height</label>
                                <input 
                                    type="range"
                                    id="article-line-height"
                                    name="articleLineHeight"
                                    min="1.0"
                                    max="3.0"
                                    step="0.1"
                                    defaultValue={(values && values.articleLineHeight) || initStyles.articleLineHeight}
                                    onChange={
                                        (e) => handleInputChange('article-line-height', false, e)
                                    }
                                />
                            </div>
                            <div className="settings-form-group">
                                <label className="settings-label" htmlFor="article-letter-spacing">Letter Spacing</label>
                                <input 
                                    type="range"
                                    id="article-letter-spacing"
                                    name="articleLetterSpacing"
                                    min="0"
                                    max="10"
                                    step="1"
                                    defaultValue={(values && values.articleLetterSpacing) || initStyles.articleLetterSpacing}
                                    onChange={
                                        (e) => handleInputChange('article-letter-spacing', true, e)
                                    }
                                />
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
            {isLayoutModalVisible && (
                <Modal
                    modalId="layout-options-modal"
                    modalSize="modal-sm"
                    modalPosition="modal-topright"
                    onModalClose={
                        () => setIsLayoutModalVisible(false)
                    }
                >
                    <Modal.Header>Layout</Modal.Header>
                    <Modal.Body>
                        <form id="layout-options-form">
                            <div className="settings-form-group">
                                <label className="settings-label" htmlFor="article-text-align">Alignment</label>
                                <input
                                    type="radio"
                                    id="article-text-align"
                                    name="articleTextAlignLeft"
                                    value="left"
                                    checked={values && values.articleTextAlign === 'left'}
                                    onChange={
                                        (e) => handleInputChange('article-text-align', false, e)
                                    }
                                />
                                <label
                                    className="radio-label"
                                    htmlFor="articleTextAlign"
                                >
                                    Left
                                </label>
                                <input
                                    type="radio"
                                    id="article-text-align"
                                    name="articleTextAlign"
                                    value="justify"
                                    checked={values && values.articleTextAlign === 'justify'}
                                    onChange={
                                        (e) => handleInputChange('article-text-align', false, e)
                                    }
                                />Justify
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default ReadingSettings;