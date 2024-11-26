import styled from "styled-components";
import { CELL_COLORS } from "../../constants";

const getCellColor = (number) => {
  const fallbackColor = "#854d0e";
  return CELL_COLORS[number] || fallbackColor;
};
export const CellContainer = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: ${({ value }) => getCellColor(value)};
  color: ${({ value }) => (value >= 512 ? "white" : "#1f2937")};
  border-radius: 0.5rem;
  transition: background-color 0.1s;
`;
