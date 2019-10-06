import { useEffect, useState } from 'react';
import { useStore } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, useLocation } from 'react-router-dom';
import { css } from '@emotion/core'
import { getComponentInitialProps } from '../utils/initialProps';
// Pages
import Home from './Home';
import User from './User';

const style = css`
  @media (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
  }

  &.fade-enter {
    opacity: 0;
    z-index: 1;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
`;

const Container = (props) => {
  return (
    <div css={style}>
      {props.children}
    </div>
  )
}


export const Routes = [
  {
    id: 'User',
    path: '/user/:username',
    component: User,
  },
  {
    id: 'Home',
    path: '/',
    component: Home,
  }
];

export default (props) => {
  const location = useLocation();
  const store = useStore();
  const [initialProps, setInitialProps] = useState(props.initialProps || {})

  useEffect(() => {
    const { pathname } = location;
    const { params, getInitialProps, routeId } = getComponentInitialProps(pathname);

    if (typeof getInitialProps === 'function') {
      const runInitialProps = async () => {
        const result = await getInitialProps({ params, store });
        setInitialProps({
          ...initialProps,
          ...(result && { [routeId]: result }),
        });
      }
      runInitialProps();
    }
  }, [location.pathname])

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Switch>
          {Routes.map(route => (
            <Route
              key={route.id}
              path={route.path}
              exact
              render={(props) => (
                <Container><route.component {...(initialProps && initialProps[route.id])} {...props} /></Container>
              )}
            />
          ))}
          <Route component={() => <div>404 Not found!</div>} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}
