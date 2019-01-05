import * as React from 'react';

interface Props {
  link: {
    id: string,
    description: string,
    url: string
  };
}

class LinkItem extends React.Component<Props, {}> {
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