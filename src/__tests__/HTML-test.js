import React from 'react';
import HTML from '../HTML';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<HTML html="<span>Hello world</span>" />).toJSON();
    expect(tree).toMatchSnapshot();
});
