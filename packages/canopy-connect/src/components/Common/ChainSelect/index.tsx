import React, { useEffect, useState } from 'react';
import { routes, useContext } from '../../CanopyConnect';

import { flattenChildren, isMobile } from '../../../utils';

import defaultTheme from '../../../constants/defaultTheme';

import styled from '../../../styles/styled';
import { css } from 'styled-components';
import { motion } from 'framer-motion';

import Tooltip from '../Tooltip';
import ChainSelectDropdown from '../ChainSelectDropdown';
import Chain from '../Chain';
import useLocales from '../../../hooks/useLocales';

import { useAccount, useSwitchChain } from 'wagmi';

const Container = styled(motion.div)``;

const SwitchChainButton = styled(motion.button)`
  --color: var(
    --ck-dropdown-button-color,
    var(--ck-button-primary-color, var(--ck-body-color))
  );
  --background: var(
    --ck-dropdown-button-background,
    var(--ck-secondary-button-background, var(--ck-body-background-secondary))
  );
  --box-shadow: var(
    --ck-dropdown-button-box-shadow,
    var(
      --ck-secondary-button-box-shadow,
      var(--ck-button-primary-box-shadow),
      none
    )
  );

  --hover-color: var(--ck-dropdown-button-hover-color, var(--color));
  --hover-background: var(
    --ck-dropdown-button-hover-background,
    var(--background)
  );
  --hover-box-shadow: var(
    --ck-dropdown-button-hover-box-shadow,
    var(--box-shadow)
  );

  --active-color: var(--ck-dropdown-button-active-color, var(--hover-color));
  --active-background: var(
    --ck-dropdown-button-active-background,
    var(--hover-background)
  );
  --active-box-shadow: var(
    --ck-dropdown-button-active-box-shadow,
    var(--hover-box-shadow)
  );

  appearance: none;
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 26px;
  width: 65.87px;
  height: 34.89px;
  padding: 2px 6px 2px 4px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transform: translateZ(0px);

  transition: 100ms ease;
  transition-property: transform, background-color, box-shadow, color;

  color: var(--color);
  background: var(--background);
  box-shadow: var(--box-shadow);

  svg {
    position: relative;
    display: block;
  }

  ${(props) =>
    props.disabled
      ? css`
          width: auto;
          padding: 3px;
          position: relative;
        `
      : css`
          cursor: pointer;

          @media only screen and (min-width: ${defaultTheme.mobileWidth +
            1}px) {
            &:hover,
            &:focus-visible {
              color: var(--hover-color);
              background: var(--hover-background);
              box-shadow: var(--hover-box-shadow);
            }
            &:active {
              color: var(--active-color);
              background: var(--active-background);
              box-shadow: var(--active-box-shadow);
            }
          }
        `}
`;

const ChevronDown = ({ ...props }) => (
  <svg
    width="12.2"
    height="7.45"
    viewBox="0 0 12.2 7.45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.1523 5.20202L10.8961 0.458275L12.2511 1.81336L6.1523 7.91219L0.0534668 1.81336L1.40855 0.458275L6.1523 5.20202Z"
      fill="currentColor"
    />
  </svg>
);

const ChainSelector: React.FC = () => {
  const context = useContext();
  const [isOpen, setIsOpen] = useState(false);
  const { chain } = useAccount();
  const { chains } = useSwitchChain();

  const locales = useLocales({
    CHAIN: chain?.name,
  });

  const mobile = isMobile() || window?.innerWidth < defaultTheme.mobileWidth;

  useEffect(() => {
    if (!context.open) setIsOpen(false);
  }, [context.open]);

  const disabled = chains.length <= 1;

  return (
    <>
      <Container>
        <ChainSelectDropdown
          offsetX={-12}
          open={!mobile && isOpen}
          onClose={() => setIsOpen(false)}
        >
          <SwitchChainButton
            aria-label={flattenChildren(locales.switchNetworks).toString()}
            disabled={disabled}
            onClick={() => {
              if (mobile) {
                context.setRoute(routes.SWITCHNETWORKS);
              } else {
                setIsOpen(!isOpen);
              }
            }}
          >
            {disabled ? (
              <Tooltip message={locales.chainNetwork} xOffset={-6} delay={0.01}>
                <Chain id={chain?.id} />
              </Tooltip>
            ) : (
              <Chain id={chain?.id} />
            )}
            {!disabled && <ChevronDown style={{ top: 0, left: -6 }} />}
          </SwitchChainButton>
        </ChainSelectDropdown>
      </Container>
    </>
  );
};

export default ChainSelector;
