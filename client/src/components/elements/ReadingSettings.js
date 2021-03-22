import React, { useState, useEffect } from 'react';

const ReadingSettings = () => {
    const INITIAL_STATE = {
        articleBgColor: '#FAFAFA',
        articleTextColor: '#161616',
        maxFontSize: '20',
        articleLineHeight: '1.5',
        articleLetterSpacing: '0'
    };
    const [values, setValues] = useState(INITIAL_STATE);

    useEffect(() => {
        const articleBgColor = localStorage.getItem('article-bg-color');
        const articleTextColor = localStorage.getItem('article-text-color');
        const maxFontSize = localStorage.getItem('max-font-size');
        const articleLineHeight = localStorage.getItem('article-line-height');
        const articleLetterSpacing = localStorage.getItem('article-letter-spacing');

        articleBgColor && setValueFromLocalStorage('article-bg-color');
        articleTextColor && setValueFromLocalStorage('article-text-color');
        maxFontSize && setValueFromLocalStorage('max-font-size');
        articleLineHeight && setValueFromLocalStorage('article-line-height');
        articleLetterSpacing && setValueFromLocalStorage('article-letter-spacing'); 
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
        input.value = value.replace('px', '');
    };

    document.addEventListener('DOMContentLoaded', () => {
        setValueFromLocalStorage('article-bg-color');
        setValueFromLocalStorage('article-text-color');
        setValueFromLocalStorage('max-font-size');
        setValueFromLocalStorage('article-line-height');
        setValueFromLocalStorage('article-letter-spacing'); 
    });

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
        <aside>
            <strong>Reading Customisation</strong>
            <div className="settings-group">
                <p>Color</p>
                <form>
                    <div className="settings-form-group">
                        <label className="settings-label" htmlFor="article-bg-color">Background Color</label>
                        <input 
                            type="color"
                            id="article-bg-color"
                            name="articleBgColor"
                            value={values.articleBgColor}
                            onChange={
                                (e) => handleInputChange('article-bg-color', false, e)
                            }
                        />
                    </div>
                    <div className="settings-form-group">
                        <label className="settings-label" htmlFor="article-text-color">Text Color</label>
                        <input 
                            type="color"
                            id="article-text-color"
                            name="articleTextColor"
                            value={values.articleTextColor}
                            onChange={
                                (e) => handleInputChange('article-text-color', false, e)
                            }
                        />
                    </div>
                </form>
            </div>
            <div className="settings-group">
                <p>Font</p>
                <form>
                    <div className="settings-form-group">
                        <label className="settings-label" htmlFor="max-font-size">Font Size</label>
                        <input 
                            type="range"
                            id="max-font-size"
                            name="maxFontSize"
                            min="14"
                            max="30"
                            step="1"
                            defaultValue={values.articleTextColor}
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
                            defaultValue={values.articleLineHeight}
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
                            defaultValue={values.articleLetterSpacing}
                            onChange={
                                (e) => handleInputChange('article-letter-spacing', true, e)
                            }
                        />
                    </div>
                </form>
            </div>
        </aside>
    )
}

export default ReadingSettings;