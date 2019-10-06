import { Switch, Route } from 'react-router-dom';
// Pages
import Hello from './Hello';
import There from './There';

export default () => {
  return (
    <Switch>
      <Route path={'/there'} component={There} />
      <Route path={'/'} component={Hello} />
    </Switch>
  );
}
