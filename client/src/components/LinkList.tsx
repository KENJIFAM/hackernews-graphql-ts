import * as React from 'react';
import { Link } from '../types';
import LinkItem from './LinkItem';
import { Query } from 'react-apollo';
import { QUERY } from '../queries/query';

interface Props {

}

class LinkList extends React.Component<Props, {}> {
  renderLink(links: Link[]) {
    return links.map(link => <LinkItem key={link.id} link={link} />);
  }

  render() {
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
}

export default LinkList;