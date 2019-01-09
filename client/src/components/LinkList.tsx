import * as React from 'react';
import LinkItem from './LinkItem';
import { Query } from 'react-apollo';
import { QUERY } from '../queries/query';
import { Link, Vote, Data, SubscriptionData } from '../types';
import { DataProxy } from 'apollo-cache';
import { SubscribeToMoreOptions, OperationVariables } from 'apollo-client';
import { SUBSCRIPTION } from '../queries/Subscription';
import { RouteComponentProps } from 'react-router';
import { LINKS_PER_PAGE } from '../constants';

interface Params {
  page: string;
}

class LinkList extends React.Component<RouteComponentProps<Params>, {}> {
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
        if (!subscriptionData.data.newLink) return prev;
        const newLink = subscriptionData.data.newLink;

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

  _subscribeToNewVotes = (subscribeToMore:
    <TSubscriptionData>(options:
      SubscribeToMoreOptions<any, OperationVariables, TSubscriptionData>
    ) => () => void
  ) => {
    subscribeToMore({
      document: SUBSCRIPTION.NEW_VOTE
    });
  }

  _getQueryVariables = () => {
    const isNewPage: boolean = this.props.location.pathname.includes('new');
    const page: number = parseInt(this.props.match.params.page, 10);

    const skip: number = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first: number = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy: string = isNewPage ? 'createdAt_DESC' : undefined;
    return { first, skip, orderBy };
  };

  renderLink(links: Link[]) {
    console.log(links);
    return links.map((link, index) => link ? (
      <LinkItem
        key={link.id}
        index={index}
        link={link}
        updateStoreAfterVote={this._updateCacheAfterVote}
      />
    ) : '');
  }

  renderList() {
    return (
      <Query query={QUERY.FEED} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error!</div>;
          this._subscribeToNewLinks(subscribeToMore);
          this._subscribeToNewVotes(subscribeToMore);
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