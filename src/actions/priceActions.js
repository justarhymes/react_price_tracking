import client from "../api/priceApi";

import { prices } from "./types";

// Pass data to reducers
const setPrices = (obj, type, args) => {
  return {
    type: type,
    payload: obj,
    ...args
  };
};

export const getPrices = () => async dispatch => {
  dispatch(setPrices(true, prices.loading));
  const res = await client.get("commodity_prices");

  dispatch(setPrices(res.data, prices.fetch));
  dispatch(setPrices(false, prices.loading));
};
