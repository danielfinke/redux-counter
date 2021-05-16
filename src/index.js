import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import './styles.scss';

const INCREMENT = 'INCREMENT';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

const incrementAction = { type: INCREMENT };

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, increment } = this.props;

    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button>Decrement</button>
          <button>Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ count }) => ({ count });
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(incrementAction),
});

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  document.getElementById('root'),
);
