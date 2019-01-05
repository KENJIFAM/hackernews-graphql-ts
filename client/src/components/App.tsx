import * as React from 'react';
import LinkList from './LinkList';
import LinkCreate from './LinkCreate';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' component={LinkList} />
            <Route exact path='/create' component={LinkCreate} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;