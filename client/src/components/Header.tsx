import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { AUTH_TOKEN } from '../constants';

class Header extends React.Component<RouteComponentProps> {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className='flex pal justify-between nowrap orange items-center'>
        <div className='flex flex-fixed black items-center'>
          <Link to='/' className='logo flex mr1'>
            <img src='/logo.png' />
          </Link>
          <div className='flex flex-wrap mv2'>
            <Link to='/' className='fw7 mr2 no-underline black'>Hacker News</Link>
            <div className='flex flex-nowrap'>
              <Link to='/' className='no-underline black'>new</Link>
              <div className='ml1'>|</div>
              <Link to='/top' className='ml1 no-underline black'>
                top
              </Link>
              <div className='ml1'>|</div>
              <Link to='/search' className='ml1 no-underline black'>search</Link>
              {authToken && (
                <div className='flex'>
                  <div className='ml1'>|</div>
                  <Link to='/create' className='ml1 mr5 no-underline black'>submit</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-fixed'>
          {authToken ? (
            <div
              className='ml1 mr3 pointer black'
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push('/');
              }}
            >
              logout
            </div>
          ) : (
            <Link to='/login' className='ml1 no-underline black'>login</Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter<RouteComponentProps>(Header);