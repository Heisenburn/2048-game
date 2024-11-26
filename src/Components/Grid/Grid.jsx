import { Cell } from "../Cell";
import { GridContainer } from "./Grid.styles";
export const Grid = ({ grid }) => {
  return (
    <GridContainer data-testid="grid-container">
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Cell key={`${rowIndex}-${columnIndex}`} value={cell} />
        ))
      )}
    </GridContainer>
  );
};
