import styled from 'styled-components'
import { cursorPointer, flexCenter } from '../../style/common'
import colors from '../../style/colors'

export const Button = styled.a`
  border: none;
  color: ${colors.grayLight};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 600;
  width: 90px;
  height: 26px;
  padding: 1rem 1.25rem;
  gap: 0.625rem;
  border-radius: 8px;
  background: ${colors.purpleBlueToSkyBlue};
  text-decoration-line: none;
  ${cursorPointer};

  ${flexCenter}
`
