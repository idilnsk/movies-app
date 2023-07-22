import styled from "styled-components";
import Link from "next/link";


export default function Navigation() {
  return (
    <StyledNavigation>
      <Link href="/"> Movies </Link>
      <Link href="/quiz"> Quiz </Link>
      <Link href="/forum"> Forum </Link>
      <Link href="Form"> Contact Us </Link>
    </StyledNavigation>
  );
}
const StyledNavigation = styled.nav`
  display: flex;
  justify-content: center;
  a {
    flex: 1;
    text-align: center;
    margin: 0 10px;
  }
`;
