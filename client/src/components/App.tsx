import * as React from 'react';
import LinkList from './LinkList';
import LinkCreate from './LinkCreate';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <div className='center w-90-m w-80-l mv2-ns f6'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path='/create' component={LinkCreate} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;