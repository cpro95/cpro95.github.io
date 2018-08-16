import Link from "next/link";
import styled from 'styled-components';

const Container = styled.div`
  margin: 0,
  padding: 0,
  display: flex,
`;

const Layout = props => (
  <Container>
    <nav>
      <ul>
        <li>Home</li>
        <li>Works</li>
        <li>Family</li>
        <li>About</li>
      </ul>
    </nav>
        {props.children}
  </Container>
);

export default Layout;
