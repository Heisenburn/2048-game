import { CellContainer } from "./Cell.styles";

export const Cell = ({ value }) => {
  return <CellContainer value={value}>{value}</CellContainer>;
};
