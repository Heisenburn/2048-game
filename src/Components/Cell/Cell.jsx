import { CellContainer } from "./Cell.styles";

export const Cell = ({ value }) => {
  return <CellContainer value={value}>{value !== 0 && value}</CellContainer>;
};
