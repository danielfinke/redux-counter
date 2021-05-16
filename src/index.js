import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import './styles.scss';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case INCREMENT:
    case DECREMENT:
      return {
        ...state,
        count: state.count + (type === INCREMENT ? 1 : -1),
      };
    default:
      return state;
  }
};

const incrementAction = { type: INCREMENT };
const decrementAction = { type: DECREMENT };

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, increment, decrement } = this.props;

    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button>Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ count }) => ({ count });
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(incrementAction),
  decrement: () => dispatch(decrementAction),
});

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  document.getElementById('root'),
);
