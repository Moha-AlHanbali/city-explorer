import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Weather from './Weather.js';
import Movies from './Movies.js';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      mapData: '',
      enteredCity: '',
      renderData: false,
      showModal: false,
      errorName: 0,
      errorData: '',
      forecast: [],
      movies: [],
    };
  }

  getLocation = async () => {

    await this.setState({
      enteredCity: event.target.city.value,
      forecast: [],
      movies: [],
      locationData: {},
      mapData: '',
    });

    let locationURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.enteredCity}&format=json`;
    let retrieveData = await axios.get(locationURL)
      .catch((error) => {
        if (error.response) {
          this.setState({
            showModal: true,
            errorCode: error.response.status,
            errorData: error.response.data,
          });
        }
      });

    if (this.state.showModal === false) {
      await this.setState({
        locationData: retrieveData.data[0],
        renderData: true,
      });


      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=18&size=600x600&format=png&maptype=%3CMapType%3E&markers=icon:small-red-blank|${this.state.locationData.lat},${this.state.locationData.lon}`;

      await this.setState({
        mapData: mapURL,
      });
    }
  }

  getWeather = async () => {

    let weatherURL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}&q=${this.state.enteredCity}`;
    // let weatherURL = `http://localhost:3001/weather?lat=47.60621&lon=-122.33207&q=${this.state.enteredCity}`;
    // console.log(weatherURL);
    let retrieveForecast = await axios.get(weatherURL)
      .catch((error) => {
        if (error.response) {
          this.setState({
            showModal: true,
            errorCode: error.response.status,
            errorData: error.response.data,
          });
        }
      });

    await this.setState({
      forecast: retrieveForecast.data,
    });
    // console.log(this.state.forecast[0].date);
  }

  getMovies = async () => {
    let moviesURL = `${process.env.REACT_APP_SERVER_URL}/movies?q=${this.state.enteredCity}`;
    // let weatherURL = `http://localhost:3001/weather?lat=47.60621&lon=-122.33207&q=${this.state.enteredCity}`;
    let retrieveMovies = await axios.get(moviesURL)
      .catch((error) => {
        if (error.response) {
          this.setState({
            showModal: true,
            errorCode: error.response.status,
            errorData: error.response.data,
          });
        }
      });

    await this.setState({
      movies: retrieveMovies.data,
    });
    console.log(this.state);
  }

  getData = async (event) => {
    event.preventDefault();

    await this.getLocation();
    await this.getWeather();
    await this.getMovies();
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }
  render() {

    return (

      <>
        <br />
        <Card style={{ textAlign: 'center', border: 'none', }}>
          <Card.Body>
            <h1 >City Explorer</h1>
          </Card.Body>
        </Card>
        <br />
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Form onSubmit={this.getData} style={{ paddingLeft: '5%' }}>
              <Form.Group className="mb-3" controlId="formHorizontalEmail">
                <Form.Control type="text" name="city" placeholder="Enter a city name here..." style={{ marginTop: '2.5%' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="dark" type="submit" style={{ width: '100%', marginTop: '2.5%' }}>Explore!</Button>
              </Form.Group>
            </Form>

            {this.state.renderData &&

              <Card style={{ marginLeft: '5%', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                <Card.Body>
                  <ul>
                    <li>City: {this.state.enteredCity}</li>
                    <br />
                    <li>Lon: {this.state.locationData.lat}</li>
                    <br />
                    <li>Lat: {this.state.locationData.lon}</li>
                  </ul>
                </Card.Body>
              </Card>
            }

          </Col>

          <Col>
            {this.state.renderData &&

              <Card style={{ width: '600px' }}>
                {this.state.renderData &&
                  <Card.Img variant="top" src={this.state.mapData} />
                }
              </Card>
            }
          </Col>

          <Col>
            {this.state.renderData &&
              <Weather forecast={this.state.forecast} enteredCity={this.state.enteredCity} />
            }
          </Col>

          <Col>
            {this.state.renderData &&
              <Movies movies={this.state.movies} enteredCity={this.state.enteredCity} />
            }
          </Col>

        </Row>


        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title> Error: {this.state.errorCode}</Modal.Title>
          </Modal.Header>
          <Modal.Body> error: {this.state.errorData.error} </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose} >
              Close
            </Button>
          </Modal.Footer>
        </Modal>


      </>

    );
  }
}

export default Main;
