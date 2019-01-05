import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

class Header extends React.Component<RouteComponentProps> {
  render() {
    return (
      <div className='flex pal justify-between nowrap orange'>
        <div className='flex flex-fixed black'>
          <div className='fw7 mr1'>Hacker News</div>
          <Link to='/' className='ml1 no-underline black'>new</Link>
          <div className='ml1'>|</div>
          <Link to='Create' className='ml1 no-underline black'>submit</Link>
        </div>
      </div>
    );
  }
}

export default withRouter<RouteComponentProps>(Header);