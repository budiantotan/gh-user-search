import { useEffect, useState } from 'react';
import { Switch, Route, matchPath, useLocation } from 'react-router-dom';
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
  const [initialProps, setInitialProps] = useState(props.initialProps || {})

  useEffect(() => {
    const { pathname } = location;
    const route = Routes.find(route => matchPath(pathname, route));
    if (!(initialProps && initialProps[route.id])) {
      const getInitialProps = async () => {
        const props = await (route && route.component && route.component.getInitialProps && route.component.getInitialProps());
        const initialPropsResult = route && props && {
          [route.id]: props
        };
        setInitialProps({ ...initialProps, ...initialPropsResult });
      }
      getInitialProps();
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
