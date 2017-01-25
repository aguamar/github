import React from 'react';
import {autobind} from 'core-decorators';

import {RemotePropType} from '../prop-types';
import ObserveModel from '../decorators/observe-model';
import GithubLoginView from '../views/github-login-view';

@ObserveModel({
  getModel: props => props.loginModel,
  fetchData: async (loginModel, {instance}) => {
    return {
      token: await loginModel.getToken(instance),
    };
  },
})
export default class RemotePrController extends React.Component {
  static propTypes = {
    loginModel: React.PropTypes.object.isRequired,
    instance: React.PropTypes.string, // string that identifies the instance, e.g. 'github.com'
    endpoint: React.PropTypes.string, // fully qualified URI to the API endpoint, e.g. 'https://api.github.com/'
    remote: RemotePropType.isRequired,
    token: React.PropTypes.string,
    currentBranch: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    instance: 'github.com',
    endpoint: 'https://api.github.com/',
    token: null,
  }

  render() {
    return (
      <div className="github-RemotePrController">
        {this.props.token && <span>you gots a token! {this.props.token}</span>}
        {!this.props.token && <GithubLoginView onLogin={this.handleLogin} />}
      </div>
    );
  }

  @autobind
  handleLogin(token) {
    this.props.loginModel.setToken(this.props.instance, token);
  }
}