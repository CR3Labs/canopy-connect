import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useContext } from '../../../CanopyConnect';

import useMeasure from 'react-use-measure';

import Portal from '../../Portal';
import { ResetContainer } from '../../../../styles';
import { DropdownWindow, DropdownOverlay, DropdownContainer } from './styles';

import { AnimatePresence } from 'framer-motion';
import { useThemeContext } from '../../../CanopyConnectThemeProvider/CanopyConnectThemeProvider';
import FocusTrap from '../../../../hooks/useFocusTrap';
import useLockBodyScroll from '../../../../hooks/useLockBodyScroll';
import { WalletProps } from '../../../../wallets/useWallets';
import useIsMounted from '../../../../hooks/useIsMounted';
import useIsMobile from '../../../../hooks/useIsMobile';
import ConnectorList from '..';

const MobileConnectorListDropdown: React.FC<{
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  walletsToDisplay: WalletProps[];
  offsetX?: number;
  offsetY?: number;
}> = ({
  children,
  open,
  onClose,
  offsetX = 0,
  offsetY = 8,
  walletsToDisplay,
}) => {
  const context = useContext();
  const themeContext = useThemeContext();
  const mounted = useIsMounted();

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useLockBodyScroll(open);

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!contentRef.current) return;
        e.preventDefault();

        const focusableEls: any = contentRef.current?.querySelectorAll(`
            a[href]:not(:disabled),
            button:not(:disabled),
            textarea:not(:disabled),
            input[type="text"]:not(:disabled),
            input[type="radio"]:not(:disabled),
            input[type="checkbox"]:not(:disabled),
            select:not(:disabled)
          `),
          firstFocusableEl: any = focusableEls[0],
          lastFocusableEl: any = focusableEls[focusableEls.length - 1];

        if (e.key === 'ArrowUp') {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
          } else {
            let focusItem: any = document?.activeElement?.previousSibling;
            if (!focusItem) focusItem = lastFocusableEl;
            while (focusItem.disabled) focusItem = focusItem.previousSibling;
            focusItem.focus();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
          } else {
            let focusItem: any = document?.activeElement?.nextSibling;
            if (!focusItem) focusItem = firstFocusableEl;
            while (focusItem.disabled) focusItem = focusItem.nextSibling;
            focusItem.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [open]);

  const targetRef = useRef<any>(null);
  const innerRef = useCallback(
    (node: any) => {
      if (!node) return;
      targetRef.current = node;
      refresh();
    },
    [open]
  );
  const [ref, bounds] = useMeasure({
    debounce: 300, // waits until modal transition has finished before measuring
    offsetSize: true,
    scroll: true,
  });

  const refresh = () => {
    if (
      !targetRef.current ||
      bounds.top +
        bounds.bottom +
        bounds.left +
        bounds.right +
        bounds.height +
        bounds.width ===
        0
    ) {
      return;
    }

    let x = bounds.left + offsetX;
    let y = bounds.top + bounds.height + offsetY;

    targetRef.current.style.left = `${x}px`;
    targetRef.current.style.top = `${y}px`;

    // const contentRect = targetRef.current.getBoundingClientRect();

    // const w = contentRect.width;
    // const h = contentRect.height;

    // if (x + w > window.innerWidth) {
    //   x = bounds.left + bounds.width - contentRect.width - offsetX;
    // }
    // if (y + h > window.innerHeight - 24) {
    //   y = bounds.top - contentRect.height - offsetY;
    // }

    // setOffset({
    //   x: x,
    //   y: y,
    // });
  };

  const useIsomorphicLayoutEffect = mounted ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(refresh, [targetRef.current, bounds, open]);

  useEffect(refresh, [open, targetRef.current]);

  const onScroll = onClose;
  const onResize = onClose;

  useEffect(() => {
    refresh();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <div ref={ref}>{children}</div>
      <AnimatePresence>
        {open && (
          <Portal>
            <ResetContainer
              $useTheme={themeContext.theme ?? context.theme}
              $useMode={themeContext.mode ?? context.mode}
              $customTheme={themeContext.customTheme ?? context.customTheme}
              $primaryColor={themeContext.primaryColor ?? context.primaryColor}
            >
              <FocusTrap>
                <DropdownWindow ref={contentRef}>
                  <DropdownOverlay onClick={onClose} />
                  <DropdownContainer
                    ref={innerRef}
                    style={{
                      left: offset.x,
                      top: offset.y,
                    }}
                    initial={'collapsed'}
                    animate={'open'}
                    exit={'collapsed'}
                    variants={{
                      collapsed: {
                        transformOrigin: '0 0',
                        opacity: 0,
                        scale: 0.96,
                        z: 0.01,
                        y: -4,
                        x: 0,
                        transition: {
                          duration: 0.1,
                        },
                      },
                      open: {
                        transformOrigin: '0 0',
                        willChange: 'opacity,transform',
                        opacity: 1,
                        scale: 1,
                        z: 0.01,
                        y: 0,
                        x: 0,
                        transition: {
                          ease: [0.76, 0, 0.24, 1],
                          duration: 0.15,
                        },
                      },
                    }}
                  >
                    <div
                      style={{
                        width: `${bounds.width - 30}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                      onClick={onClose}
                    >
                      <ConnectorList
                        height={250}
                        walletsToDisplay={walletsToDisplay}
                      />
                    </div>
                  </DropdownContainer>
                </DropdownWindow>
              </FocusTrap>
            </ResetContainer>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileConnectorListDropdown;
