import { Switch, Route } from 'react-router-dom';
// Pages
import Home from './Home';
import User from './User';

export default () => {
  return (
    <Switch>
      <Route path={'/user/:username'} exact component={User} />
      <Route path={'/'} exact component={Home} />
      <Route component={() => <div>404 Not found!</div>} />
    </Switch>
  );
}
