import { CSSProperties, ReactNode } from 'react';
import {
  TransitionGroup,
  Transition as ReactTransition,
  TransitionStatus,
} from 'react-transition-group';

type TransitionKind<RC> = {
  children: RC;
  location: string;
};

const TIMEOUT: number = 500;

const getTransitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateY(50px)`,
  },
  entered: {
    transition: `transform 1s, height 0.5s, opacity 0.5s`,
    opacity: 1,
    transform: 'none',
    animation: '3s ease-in 1s reverse both running slidein',
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
  exited: {},
  unmounted: {},
};

const Transition: React.FC<TransitionKind<ReactNode>> = ({
  children,
  location,
}) => {
  return (
    <TransitionGroup style={{ position: 'relative' }} component={'div'}>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};
export default Transition;
