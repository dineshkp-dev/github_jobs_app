import App from '../App';
import renderer from 'react-test-renderer';

describe('app snapshot test', () => {
  it('renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
