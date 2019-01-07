import * as React from 'react';
import { AUTH_TOKEN } from '../constants';
import { Link, Vote } from '../types';
import { timeDifferenceForDate } from '../utils';
import { Mutation } from 'react-apollo';
import { MUTATION } from '../queries/Mutation';
import { DataProxy } from 'apollo-cache';

interface Props {
  link: Link;
  index: number;
  updateStoreAfterVote(store: DataProxy, vote: Vote, linkId: string): void;
}

class LinkItem extends React.Component<Props, {}> {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className='flex mt2 item-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={MUTATION.VOTE}
              variables={{ linkId: this.props.link.id }}
              update={(store, { data: { vote } }) =>
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }
            >
              {voteMutation => (
                <div className='ml1 gray f11' onClick={() => voteMutation()}>
                  ▲
                </div>
              )}
            </Mutation>
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