import {
  ComponentProps,
  useContext,
  useEffect,
  useState,
  MouseEvent,
  useCallback,
} from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import clsx from 'clsx';

interface BaseArrowProps extends ComponentProps<'button'> {
  arrow: 'left' | 'right';
}

const BaseArrow = ({
  arrow,
  disabled: btnDisabled,
  onClick: btnOnClick,
  className,
  children,
  ...props
}: BaseArrowProps) => {
  const {
    isFirstItemVisible,
    isLastItemVisible,
    scrollNext,
    scrollPrev,
    visibleItemsWithoutSeparators,
  } = useContext(VisibilityContext);

  const visible = arrow === 'left' ? isFirstItemVisible : isLastItemVisible;

  const [shouldDisable, setShouldDisable] = useState(
    !visibleItemsWithoutSeparators.length && visible
  );

  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setShouldDisable(visible);
    }
  }, [visible, visibleItemsWithoutSeparators]);

  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      arrow === 'left' ? scrollPrev() : scrollNext();
      if (btnOnClick) btnOnClick(e);
    },
    [arrow, scrollPrev, scrollNext, btnOnClick]
  );

  const disabled = shouldDisable || btnDisabled;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const LeftArrow = ({
  children,
  ...props
}: Omit<BaseArrowProps, 'arrow'>) => {
  return (
    <BaseArrow arrow="left" {...props}>
      {children}
    </BaseArrow>
  );
};

export const RightArrow = ({
  children,
  ...props
}: Omit<BaseArrowProps, 'arrow'>) => {
  return (
    <BaseArrow arrow="right" {...props}>
      {children}
    </BaseArrow>
  );
};
