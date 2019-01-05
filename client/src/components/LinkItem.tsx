import * as React from 'react';

interface PropsLinkItem {
  link: {
    id: string,
    description: string,
    url: string
  };
}

class LinkItem extends React.Component<PropsLinkItem, {}> {
  render() {
    return (
      <div>
        <div>
          {this.props.link.description} ({this.props.link.url})
        </div>
      </div>
    );
  }
}

export default LinkItem;