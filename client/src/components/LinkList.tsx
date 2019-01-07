import * as React from 'react';
import LinkItem from './LinkItem';
import { Query } from 'react-apollo';
import { QUERY } from '../queries/query';
import { Link, Vote, Data } from '../types';
import { DataProxy } from 'apollo-cache';

interface Props {

}

class LinkList extends React.Component<Props, {}> {
  _updateCacheAfterVote = (store: DataProxy, createdVote: Vote, linkId: string) => {
    const data = store.readQuery({ query: QUERY.FEED }) as Data;
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createdVote.link.votes;
    store.writeQuery({ query: QUERY.FEED, data });
  };

  renderLink(links: Link[]) {
    return links.map((link, index) => (
      <LinkItem
        key={link.id}
        index={index}
        link={link}
        updateStoreAfterVote={this._updateCacheAfterVote}
      />
    ));
  }

  renderList() {
    return (
      <Query query={QUERY.FEED}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error!</div>;
          return (
            <div>
              {this.renderLink(data.feed.links)}
            </div>
          );
        }}
      </Query>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

export default LinkList;