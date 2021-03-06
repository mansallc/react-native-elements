import React from 'react';
import { BottomSheet } from '../BottomSheet';
import { Modal, View } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ListItem from '../../list/ListItem';
import toJson from 'enzyme-to-json';

/** Renders a React Component with specified layout using onLayout callback */
const renderWithLayout = (component, layout) => {
  // create the component with renderer
  component = renderer.create(component);

  // create a nativeEvent with desired dimensions
  const mockNativeEvent = {
    nativeEvent: {
      layout: layout,
    },
  };

  // manually trigger onLayout with mocked nativeEvent
  component.toJSON().props.onLayout(mockNativeEvent);

  // re-render
  return component.toJSON();
};

describe('BottomSheet Component', () => {
  it('renders correctly', () => {
    const list = [{ title: 'test' }, { title: 'test2' }];
    const tree = renderer
      .create(
        <BottomSheet isVisible>
          {list.map((l, i) => (
            <ListItem key={i}>
              <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows when isVisible is true', () => {
    const list = [{ title: 'test' }, { title: 'test2' }];
    const component = shallow(
      <BottomSheet isVisible>
        {list.map((l, i) => (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
    expect(component.find(Modal).props().visible).toBeTruthy();
  });

  it('not show when isVisible is false', () => {
    const list = [{ title: 'test' }, { title: 'test2' }];
    const component = shallow(
      <BottomSheet>
        {list.map((l, i) => (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
    expect(component.find(Modal).props().visible).toBeFalsy();
  });

  it('should render with the provided containerStyle', () => {
    const component = shallow(
      <BottomSheet
        isVisible={true}
        containerStyle={{ backgroundColor: 'rgba(1, 0.5, 0.25, 1.0)' }}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
