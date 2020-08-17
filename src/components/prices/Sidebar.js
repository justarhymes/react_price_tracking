import _ from "lodash";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPrices } from "../../actions/priceActions";

import useInterval from "../../hooks/useInterval";

const Sidebar = () => {
  const [prices, setPrices] = useState(null);
  const [update, setUpdate] = useState(false);
  const { collection } = useSelector(state => state.prices);
  const dispatch = useDispatch();

  const buildPriceList = useCallback(setPrices);
  const buildUpdate = useCallback(setUpdate);
  const oldPrices = useRef(collection);

  useEffect(() => {
    dispatch(getPrices());
  }, [dispatch]);

  useEffect(() => {
    if (_.size(collection) && _.isEmpty(prices)) {
      const list = _.map(collection, item => {
        item.price = Math.abs(item.price);
        return item;
      });
      buildPriceList(list);
      oldPrices.current = collection;
    }
  }, [collection, prices]);

  useEffect(() => {
    if (update) {
      const list = _.map(collection, item => {
        const current = _.find(oldPrices.current, o => (o.id = item.id));
        item.price = Math.abs(item.price);
        if (current.price > item.price) {
          item.change = "plus";
        } else if (current.price < item.price) {
          item.change = "neg";
        } else {
          item.change = "none";
        }
        return item;
      });
      buildPriceList(list);
      oldPrices.current = list;
    }
  }, [update, collection, buildPriceList]);

  useInterval(() => {
    dispatch(getPrices());
    buildUpdate(true);
  }, 5000);

  const renderStatus = price => {
    switch (price.change) {
      case "plus":
        return <i>&uarr;</i>;
      case "neg":
        return <i>&darr;</i>;
      case "none":
        return <i>&harr;</i>;
    }
  };

  const renderPrices = prices => {
    return _.map(prices, price => {
      return (
        <div key={price.id} className="price">
          {price.price} {renderStatus(price)}
        </div>
      );
    });
  };

  return <div>{renderPrices(prices)}</div>;
};

export default Sidebar;
