import React from 'react';

class App extends React.Component {
  render() {
      /* Check whether current route is login or register using regex */
      let re = /(login|register)/;
      let isAuth = re.test(this.props.location.pathname);

      return (
          <div>
              {isAuth ? undefined : <Header/>}
              { this.props.children }
          </div>
      );
  }
}

export default App;
