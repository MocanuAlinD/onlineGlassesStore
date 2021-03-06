import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  transition: var(--transition);
  width: fit-content;
  font-family: var(--font-family-poppins);
  font-weight: 400;
`;

export const Arrow_1 = styled.div`
  animation: anim1 2s infinite ease-in-out;
  animation-delay: 0.6s;
  @keyframes anim1 {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-20%);
    }
  }
`;

export const Arrow_2 = styled.div`
  animation: anim1 2s infinite ease-in-out;
  animation-delay: 0.3s;
  @keyframes anim1 {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-20%);
    }
  }
`;

export const Arrow_3 = styled.div`
  animation: anim1 2s infinite ease-in-out;
  @keyframes anim1 {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-20%);
    }
  }
`;
