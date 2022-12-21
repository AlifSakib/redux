const redux = require("redux");
const createStore = redux.createStore;

const CAKE_ORDERED = "CAKE_ORDERED";

// 3. define action and action creators.

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

// (previousState, action) => newState

// declare the initial state and the reducer

const initialState = {
  numberOfCakes: 10,
  anotherProperty: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    default:
      return state;
  }
};

// 1. Create a store

const store = createStore(reducer);
console.log("Initial state", store.getState());

// 4. Subscribe to the store.

const unsubscribe = store.subscribe(() =>
  console.log("UpdatedStore", store.getState())
);

// 5. dispatch action to update the store.
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// 6.unsubscribe to the changes.
unsubscribe();
store.dispatch(orderCake());
