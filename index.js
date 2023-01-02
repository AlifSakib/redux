const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";

// 3. define action and action creators.

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function orderIceCream() {
  return {
    type: ICE_CREAM_ORDERED,
    payload: 1,
  };
}

// (previousState, action) => newState

// declare the initial state and the reducer

function restockCake(qty = 1) {
  return {
    type: "CAKE_RESTOCKED",
    payload: qty,
  };
}

const initialState = {
  numberOfCakes: 10,
  numberOfIceCreams: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };

    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - action.payload,
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
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreator(
  { orderCake, restockCake, orderIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIceCream();
actions.restockCake(3);
// 6.unsubscribe to the changes.

unsubscribe();
store.dispatch(orderCake());
