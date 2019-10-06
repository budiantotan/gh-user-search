import { matchPath } from 'react-router-dom';
import { Routes } from '../pages/AppRoutes';

export const getComponentInitialProps = (path) => {
  let params;
  const route = Routes.find(route => {
    const match = matchPath(path, route);
    if (match) {
      params = match.params;
      return match;
    }
  });
  const getInitialProps = route && route.component && route.component.getInitialProps && route.component.getInitialProps;
  return {
    routeId: route && route.id,
    params,
    getInitialProps,
  }
}
