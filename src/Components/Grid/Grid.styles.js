import styled from "styled-components";
import { GRID_SIZE } from "../Game/constants";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_SIZE}, 1fr);
  gap: 1rem;
`;
