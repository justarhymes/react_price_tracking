import _ from "lodash";
import { prices } from "../actions/types";

const INITIAL_STATE = {
  collection: {},
  faveIDs: null,
  faves: null,
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
      const fetchNorm =
        action.payload.filter(item => !state.faveIDs.includes(item.id)) || [];
      const fetchFaves =
        action.payload.filter(item => state.faveIDs.includes(item.id)) || [];
      const resNorm = fetchNorm.map(item => {
        item.price = Math.abs(item.price);
        return item;
      });
      const resFaves = fetchFaves.map(item => {
        item.price = Math.abs(item.price);
        return item;
      });
      return {
        ...state,
        collection: resNorm ? _.mapKeys(resNorm, "id") : {},
        faves: resFaves ? _.mapKeys(resFaves, "id") : {}
      };
    case prices.faves:
      return {
        ...state,
        faveIDs: action.payload || []
      };
    case prices.favorite:
      const { faveIDs } = state;
      if (faveIDs.includes(action.payload)) {
        faveIDs.splice(action.payload, 1);
      } else {
        faveIDs.push(action.payload);
      }
      return {
        ...state,
        faveIDs
      };
    default:
      return state;
  }
};
