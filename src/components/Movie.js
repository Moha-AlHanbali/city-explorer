import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            {/* <h4>City: {this.props.enteredCity}</h4> */}
            <h5>As seen in:</h5>
            <br />
            {
              this.props.movies.map((element) => {
                console.log(typeof (element.poster));
                let posterImage = 'https://image.tmdb.org/t/p/w500' + element.poster;
                return (
                  <ul>
                    <li>Title: {element.title}</li>
                    <ul>
                      <li>Release Date: {element.date}</li>
                      <li> Description: {element.overview}</li>
                      <li>
                        <Card.Img variant="top" src={posterImage} />
                      </li>
                    </ul>
                  </ul>
                );
              })
            }
          </Card.Body>
        </Card>
      </>
    );
  }

}

export default Movie;
