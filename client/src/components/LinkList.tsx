import * as React from 'react';
import LinkItem from './LinkItem';
import { Query } from 'react-apollo';
import { QUERY } from '../queries/query';
import { Link } from '../types';

interface Props {

}

class LinkList extends React.Component<Props, {}> {
  componentDidMount() {
    this.renderList();
  }

  renderLink(links: Link[]) {
    return links.map((link, i) => <LinkItem key={link.id} index={i} link={link} />);
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