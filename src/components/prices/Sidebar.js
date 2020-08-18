// core
import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// templating
import List from "@material-ui/core/List";

// actions
import { getPrices, getFaves, favePrice } from "../../actions/priceActions";

// hooks
import { useCookies } from "react-cookie";
import useInterval from "../../hooks/useInterval";

// components
import Faves from "./Faves";
import Item from "./Item";

const Sidebar = () => {
  const [cookies, setCookie] = useCookies(["oldPrices", "favorites"]);
  const { collection: prices, faves } = useSelector(state => state.prices);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaves(cookies?.favorites || []));
    if (!cookies.favorites) setCookie("favorites", []);
  }, [dispatch]);

  useInterval(() => {
    dispatch(getPrices());
    if (_.isEmpty(cookies.oldPrices)) {
      setCookie("oldPrices", prices);
    }
  }, 5000);

  const setFave = id => {
    const { favorites } = cookies;
    if (favorites.includes(id)) {
      favorites.splice(id, 1);
    } else {
      favorites.push(id);
    }
    setCookie("favorites", favorites);
    favePrice(id);
  };

  return (
    <List>
      {_.size(faves) ? <Faves faves={faves} setFave={setFave} /> : ""}
      {_.size(prices) ? (
        <>
          {_.map(prices, price => (
            <Item
              key={`${price.name}_${price.id}`}
              price={price}
              setFave={setFave}
              faves={faves}
            />
          ))}
        </>
      ) : (
        ""
      )}
    </List>
  );
};

export default Sidebar;
