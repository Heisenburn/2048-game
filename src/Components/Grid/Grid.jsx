import { Fragment as Row } from "react";
import { Cell } from "../Cell";
import { GridContainer } from "./Grid.styles";

export const Grid = ({ board, setBoard }) => {
  return (
    <GridContainer>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cellValue, cellIndex) => (
            <Cell key={cellIndex} value={cellValue} />
          ))}
        </Row>
      ))}
    </GridContainer>
  );
};
