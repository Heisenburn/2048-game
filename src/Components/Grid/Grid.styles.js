import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 80px);
  grid-template-rows: repeat(6, 80px);
  gap: 8px;
  border-radius: 30px;
  background-color: #bbada0;
  padding: 15px;
`;
