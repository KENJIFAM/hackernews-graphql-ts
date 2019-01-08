import * as React from 'react';
import LinkItem from './LinkItem';
import { Query } from 'react-apollo';
import { QUERY } from '../queries/query';
import { Link, Vote, Data, SubscriptionData } from '../types';
import { DataProxy } from 'apollo-cache';
import { SubscribeToMoreOptions, OperationVariables } from 'apollo-client';
import { SUBSCRIPTION } from '../queries/Subscription';

interface Props {

}

class LinkList extends React.Component<Props, {}> {
  _updateCacheAfterVote = (store: DataProxy, createdVote: Vote, linkId: string) => {
    const data = store.readQuery({ query: QUERY.FEED }) as Data;
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createdVote.link.votes;
    store.writeQuery({ query: QUERY.FEED, data });
  };

  _subscribeToNewLinks = async (subscribeToMore:
    <TSubscriptionData>(options:
      SubscribeToMoreOptions<any, OperationVariables, TSubscriptionData>
    ) => () => void
  ) => {
    subscribeToMore({
      document: SUBSCRIPTION.NEW_LINK,
      updateQuery: (prev: Data, { subscriptionData }: SubscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink.node;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        });
      }
    });
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
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error!</div>;
          this._subscribeToNewLinks(subscribeToMore);
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