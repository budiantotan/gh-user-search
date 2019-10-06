import { useEffect, useState } from 'react';
import { useStore } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom';
import { getComponentInitialProps } from '../utils/initialProps';
// Pages
import Home from './Home';
import User from './User';

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
    <Switch>
      {Routes.map(route => (
        <Route
          key={route.id}
          path={route.path}
          exact
          render={(props) => (
            <route.component {...(initialProps && initialProps[route.id])} {...props} />
          )}
        />
      ))}
      <Route component={() => <div>404 Not found!</div>} />
    </Switch>
  );
}
