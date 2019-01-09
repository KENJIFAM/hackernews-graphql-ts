import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { MUTATION } from '../queries/Mutation';
import { RouteComponentProps } from 'react-router';
import { QUERY } from '../queries/query';
import { Data } from '../types';
import { LINKS_PER_PAGE } from '../constants';

interface State {
  description: string;
  url: string;
}

class LinkCreate extends React.Component<RouteComponentProps, State> {
  state: State = {
    description: '',
    url: ''
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type='text'
            placeholder='A URL for the link'
          />
        </div>
        <Mutation
          mutation={MUTATION.POST}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push('/new/1')}
          update={(store, { data: { post } }) => {
            console.log(store);
            const first = LINKS_PER_PAGE;
            const skip = 0;
            const orderBy = 'createdAt_DESC';
            const data: Data = store.readQuery({
              query: QUERY.FEED,
              variables: { first, skip, orderBy }
            });
            data.feed.links.unshift(post);
            store.writeQuery({
              query: QUERY.FEED,
              data,
              variables: { first, skip, orderBy }
            });
          }}
        >
          {(postMutation) => <button onClick={() => postMutation()}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default LinkCreate;