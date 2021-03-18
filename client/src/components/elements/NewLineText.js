import React from 'react';

const NewLineText = (props) => {
    const detections = props.detections;
    const detectionsArray = detections.map(detection => detection.text);
    const extractedText = detectionsArray.join('');
    const newText = extractedText.split('\n').map((value, index) => {
        return (
            <p key={index}>
                {value}
            </p>
        )
    });

    return newText;
}

export default NewLineText;