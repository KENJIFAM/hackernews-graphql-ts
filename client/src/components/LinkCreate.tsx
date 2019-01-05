import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { MUTATION } from '../queries/Mutation';

interface Props {

}

interface State {
  description: string;
  url: string;
}

class LinkCreate extends React.Component<Props, {}> {
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
        <Mutation mutation={MUTATION.POST} variables={{ description, url }}>
          {(postMutation) => <button onClick={() => postMutation()}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default LinkCreate;