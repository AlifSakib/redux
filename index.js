const CAKE_ORDERED = "CAKE_ORDERED";

function orderCake() {
  {
    type: CAKE_ORDERED;
    quantity: 1;
  }
}

// (previousState, action) => newState

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
