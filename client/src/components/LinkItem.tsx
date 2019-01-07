import * as React from 'react';
import { AUTH_TOKEN } from '../constants';
import { Link } from '../types';
import { timeDifferenceForDate } from '../utils';

interface Props {
  link: Link;
  index: number;
}

class LinkItem extends React.Component<Props, {}> {
  _voteForLink() {

  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className='flex mt2 item-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {authToken && (
            <div className='ml1 gray f11' onClick={() => this._voteForLink()}>
              ▲
            </div>
          )}
        </div>
        <div className='ml1'>
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className='f6 lh-copy gray'>
            {this.props.link.votes ? this.props.link.votes.length : 0} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default LinkItem;