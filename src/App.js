import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './views/search'
import Showcase from './views/showcase'

class App extends Component {
  state = {
    __cache: {},    
  }

  _updateCache = (id, data) => {

    this.setState({
      __cache: {
        ...this.state.__cache,
        [id]: data
      }
    })
  }

  _checkInCache = id => this.state.__cache[id]
  
  getMovieInfo = async(id, callback) => {
    let movieInfo = this._checkInCache(id)

    if(!movieInfo) {
      movieInfo = await callback()
      this._updateCache(id, movieInfo)
    }

    return movieInfo
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Search}/>
          <Route 
            path="/showcase/:id"
            render={routeProps => 
              <Showcase 
                getMovieInfo={this.getMovieInfo} 
                {...routeProps} 
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
