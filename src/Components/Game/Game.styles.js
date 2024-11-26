import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 28rem;
  margin-bottom: 1rem;
`;

export const NewGameButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
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
