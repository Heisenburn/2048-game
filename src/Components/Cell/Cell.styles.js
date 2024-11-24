import styled from "styled-components";

const getCellColor = (number) => {
  const colors = {
    0: "#e5e7eb",
    2: "#f3f4f6",
    4: "#fef3c7",
    8: "#fed7aa",
    16: "#fdba74",
    32: "#fb923c",
    64: "#f97316",
    128: "#fde047",
    256: "#facc15",
    512: "#eab308",
    1024: "#ca8a04",
    2048: "#a16207",
  };
  return colors[number] || "#854d0e";
};
export const CellContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: ${(props) => getCellColor(props.value)};
  color: ${(props) => (props.value >= 64 ? "white" : "#1f2937")};
  border-radius: 0.5rem;
  transition: background-color 0.1s;
`;
