import React from 'react';
import Movie from './Movie.js';

class Movies extends React.Component {

  render() {
    return (
      <>
        <Movie movies={this.props.movies} />
      </>
    );
  }

}

export default Movies;
