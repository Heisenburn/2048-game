import styled from "styled-components";

const getCellBackground = (value) => {
  const colors = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#9c0",
    1024: "#33b5e5",
    2048: "#09c",
  };
  return colors[value] || "white";
};

export const CellContainer = styled.div`
  background-color: ${({ value }) => getCellBackground(value)};
  color: ${({ value }) => (value <= 4 ? "#776e65" : "#f9f6f2")};
  font-size: 2rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: background-color 0.15s ease, transform 0.5s ease;
`;
