import _ from "lodash";
import React, { useEffect } from "react";
import formatMoney from "accounting-js/lib/formatMoney.js";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

//icons
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RemoveIcon from "@material-ui/icons/Remove";

//hooks
import { useCookies } from "react-cookie";

const Item = ({ price, faves, setFave }) => {
  const [cookies] = useCookies(["oldPrices", "favorites"]);

  const renderIcon = () => {
    const storedPrice = cookies?.oldPrices?.[price.id];
    if (storedPrice.price < price.price) {
      return <ArrowUpwardIcon />;
    } else if (storedPrice.price > price.price) {
      return <ArrowDownwardIcon />;
    }
    return <RemoveIcon />;
  };

  const renderText = () => {
    return `${price.name} ${formatMoney(price.price)}`;
  };

  console.log("price   ", price);
  console.log("faves   ", faves);

  return (
    <ListItem className="price">
      <ListItemIcon>
        <IconButton onClick={() => setFave(price.id)}>
          {faves?.[price.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={renderText()} />
      <ListItemSecondaryAction>
        <Icon edge="end">{renderIcon(price)}</Icon>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Item;
