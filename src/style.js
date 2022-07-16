import styled from "@emotion/styled";

export const Nav = styled.div`
  position: relative;
  display: flex;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  padding-bottom: 20px;
`;

export const Item = styled.li`
  color: ${({isSelectedStyle}) => isSelectedStyle ? '#77a6d5' : '#333'};
  cursor: pointer;
  list-style: none;

  &:hover {
    color: #77a6d5;
  }
`;

export const UnderLine = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({leftPos}) => `${leftPos}px`};
  width: ${({width}) => `${width}px`};
  border-top: 1px solid #333;
  transition: all ease-in-out 0.3s;
`;