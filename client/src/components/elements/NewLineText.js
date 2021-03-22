import React from 'react';
import { Markup } from 'interweave';

const NewLineText = (props) => {
    const detectionType = props.detectionType;
    const detections = props.detections;
    const detectionsArray = detections.map(detection => detection.text);
    let extractedText = detectionsArray.join('');

    if (detectionType !== 'hndwrtng-img') {
        const newText = extractedText.split('\n').map((value, index) => {
            return (
                <p key={index}>
                    {value}
                </p>
            )
        });

        return newText;
    } else {
        // Pre Clean
        let cleanText = extractedText;
        ['[h]', '[s]', '[p]', '[b]', '[i]'].forEach((item, i) => {
            cleanText = cleanText.split(item).join('\n' + item.toUpperCase());
            cleanText = cleanText.split(item.toUpperCase()).join('\n' + item.toUpperCase());
        });
        cleanText = cleanText.split('\n\n').join('\n');

        let lines = cleanText.split('\n');
        let resultHtml = '';
        lines.forEach((line, i) => {
            let temp = line.substring(3);
            if (line.toUpperCase().includes('[H]')) {
                resultHtml = resultHtml + '<h1>' + temp + '</h1>';
            } else if (line.toUpperCase().includes('[S]')) {
                resultHtml = resultHtml + '<h2>' + temp + '</h2>';
            } else if (line.toUpperCase().includes('[P]')) {
                resultHtml = resultHtml + '<p>' + temp + '</p>';
            } else if (line.toUpperCase().includes('[B]')) {
                resultHtml = resultHtml + '<p><strong>' + temp + '</strong></p>';
            } else if (line.toUpperCase().includes('[I]')) {
                resultHtml = resultHtml + '<p><em>' + temp + '</em></p>'
            }
        });
        
        console.log(resultHtml);
        return <Markup content={resultHtml} />;
    }
}

export default NewLineText;