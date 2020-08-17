import _ from "lodash";
import { prices } from "../actions/types";

const INITIAL_STATE = {
  collection: {},
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case prices.loading:
      return {
        ...state,
        loading: action.payload
      };
    case prices.fetch:
      return {
        ...state,
        collection: _.mapKeys(action.payload, "id")
      };
    default:
      return state;
  }
};
