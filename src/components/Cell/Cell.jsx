import { CellContainer } from "./Cell.styles";

export const Cell = ({ value }) => {
  const displayValue = value || "";
  return <CellContainer value={value}>{displayValue}</CellContainer>;
};
