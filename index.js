const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOKED = "ICE_CREAM_RESTOKED";

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

function restokeIceCream(qty = 1) {
  return {
    type: ICE_CREAM_RESTOKED,
    payload: qty,
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

const initialCakeState = {
  numberOfCakes: 10,
};
const initialIceCreamState = {
  numberOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
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
    default:
      return state;
  }
};
const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - action.payload,
      };
    case ICE_CREAM_RESTOKED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// 1. Create a store

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: IceCreamReducer,
});

const store = createStore(rootReducer);
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
  { orderCake, restockCake, orderIceCream, restokeIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIceCream();

actions.restockCake(3);
actions.restokeIceCream(1);
// 6.unsubscribe to the changes.

unsubscribe();
store.dispatch(orderCake());
