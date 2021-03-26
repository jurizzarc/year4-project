import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import NewLineText from './components/elements/NewLineText';

it('renders without crashing', () => {
    shallow(<App />);
});

const newLineTextProps = {
    detectedText: ['This is a handwritten text.'],
    detectionType: 'hndwrtng-img',
    hasHandWritingSystem: false
};
describe('', () => {
    it('accepts newLineText props', () => {
        const wrapper = mount(<NewLineText detections={newLineTextProps.detectedText} detectionType={newLineTextProps.detectionType} hasHandWritingSystem={newLineTextProps.hasHandWritingSystem} />);
        expect(wrapper.props().detections).toEqual(newLineTextProps.detectedText);
        expect(wrapper.props().detectionType).toEqual(newLineTextProps.detectionType);
        expect(wrapper.props().hasHandWritingSystem).toEqual(newLineTextProps.hasHandWritingSystem);
    });
});

it("renders correctly", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
});