import React, { useState, useEffect } from 'react';

const ReadingSettings = () => {
    const INITIAL_STATE = {
        articleBgColor: '#FAFAFA',
        articleTextColor: '#161616',
        articleMaxFontSize: '20px',
        articleLineHeight: '1.5',
        articleLetterSpacing: '0px'
    };
    const [values, setValues] = useState(INITIAL_STATE);

    const setValueFromLocalStorage = (readingProp) => {
        let value = window.localStorage.getItem(readingProp);
        document.documentElement.style.setProperty(
            `--${readingProp}`,
            value
        );
        const input = document.querySelector(`#${readingProp}`);
        input.value = value.replace('px', '');
    }

    useEffect(() => {
        setValueFromLocalStorage('article-bg-color');
        setValueFromLocalStorage('article-text-color');
        setValueFromLocalStorage('article-max-font-size');
        setValueFromLocalStorage('article-line-height');
        setValueFromLocalStorage('article-letter-spacing'); 
    });

    // document.addEventListener('DOMContentLoaded', () => {
        
    // });

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
                        <label className="settings-label" htmlFor="article-max-font-size">Font Size</label>
                        <input 
                            type="range"
                            id="article-max-font-size"
                            name="articleMaxFontSize"
                            min="14"
                            max="30"
                            step="1"
                            defaultValue={values.articleTextColor}
                            onChange={
                                (e) => handleInputChange('article-max-font-size', true, e)
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