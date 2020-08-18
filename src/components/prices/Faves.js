import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// templating
import Divider from "@material-ui/core/Divider";

//components
import Item from "./Item";

const Faves = ({ faves, setFave }) => {
  return (
    <>
      {_.map(faves, fave => {
        return (
          <Item
            key={`${fave.name}_${fave.id}`}
            price={fave}
            faves={faves}
            setFave={setFave}
          />
        );
      })}

      <Divider />
    </>
  );
};

export default Faves;
