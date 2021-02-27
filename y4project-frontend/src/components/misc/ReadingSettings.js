import React from 'react';

export default function ReadingSettings() {
    return (
        <aside>
            <div className="colors">
                <h6>Colors</h6>
                <form className="reading-settings">
                    <div className="form-group">
                        <label htmlFor="bg-color">Background Color</label>
                        <input 
                            type="color"
                            id="bg-color"
                            value="#FAFAFA"
                        />
                    </div>
                </form>
            </div>
        </aside>
    );
}