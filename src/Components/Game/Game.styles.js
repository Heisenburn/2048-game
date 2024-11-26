import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const NewGameButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1e4889;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1461d9;
  }
`;

export const GameBoard = styled.div`
  background-color: #d1d5db;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const GameStatus = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #dc2626;
`;
