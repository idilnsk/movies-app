import styled from "styled-components";
import Link from "next/link";

export default function Navigation() {
  return (
    <StyledNavigation>
      <Link href="/"> Movies </Link>
      <Link href="/Quiz"> Quiz </Link>
      <Link href="/Forum"> Forum </Link>
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
