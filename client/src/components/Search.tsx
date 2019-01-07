import * as React from 'react';
import { Link, Data } from '../types';
import LinkItem from './LinkItem';
import { withApollo } from 'react-apollo';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { QUERY } from '../queries/query';

interface State {
  links: Link[];
  filter: string;
}

interface Props {
  client: ApolloClient<any>;
}

class Search extends React.Component<Props, State> {
  state: State = {
    links: [],
    filter: ''
  };

  _executeSearch = async () => {
    const { filter } = this.state;
    const result: ApolloQueryResult<Data> = await this.props.client.query({
      query: QUERY.FEED_SEARCH,
      variables: { filter }
    });
    const links = result.data.feed.links;
    this.setState({ links });
  };

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <LinkItem key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }
}

export default withApollo(Search);