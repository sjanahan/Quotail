// ... imports

var AuthenticatedComponent = function(ComposedComponent){
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
      if (!LoginStore.isLoggedIn()) {
        transition.redirect(‘/login’);
      }
    }

    constructor() {
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      };
    }

    // Here, we’re subscribing to changes in the LoginStore we created before. Remember that the LoginStore is an EventEmmiter.
    componentDidMount() {
      LoginStore.addChangeListener(this._onChange.bind(this));
    }

    // After any change, we update the component’s state so that it’s rendered again.
    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        jwt={this.state.jwt}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};


module.exports = AuthenticatedComponent;