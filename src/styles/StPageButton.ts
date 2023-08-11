import styled from "styled-components";

export const PageLists = styled.div`
  height: 40px;
  margin-bottom: 50px;

  .pagination {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border-radius: 6px;
    margin: 0 4px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: rgba(221, 221, 221, 0.685);
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: ${props => props.theme.mainNavyColor};
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #fff;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;