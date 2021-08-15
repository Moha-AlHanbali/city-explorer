import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

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
    }
  }

  getLocation = async (event) => {
    event.preventDefault();

    await this.setState({ enteredCity: event.target.city.value })

    let locationURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.enteredCity}&format=json`;
    let retrieveData = await axios.get(locationURL)
      .catch((error) => {
        if (error.response) {

          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          this.setState({
            showModal: true,
            errorCode: error.response.status,
            errorData: error.response.data,
          })
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });

    if (this.state.showModal === false) {
      await this.setState({
        locationData: retrieveData.data[0],
        renderData: true,
      })


      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=18&size=600x600&format=png&maptype=%3CMapType%3E&markers=icon:small-red-blank|${this.state.locationData.lat},${this.state.locationData.lon}`;

      await this.setState({
        mapData: mapURL,
      })
    }
  }


  handleClose = () => {
    this.setState({ showModal: false })
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
            <Form onSubmit={this.getLocation} style={{ paddingLeft: '5%' }}>
              <Form.Group className="mb-3" controlId="formHorizontalEmail">
                <Form.Control type="text" name="city" placeholder="Enter a city name here..." style={{ marginTop: '2.5%' }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="dark" type="submit" style={{ width: '100%', marginTop: '2.5%' }}>Explore!</Button>
              </Form.Group>
            </Form>
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

          </Col>

          <Col>
            {this.state.renderData &&

              <Card style={{ width: '600px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                <Card.Body> City: {this.state.enteredCity}
                  <br />
                  Lon: {this.state.locationData.lat}
                  <br />
                  Lat: {this.state.locationData.lon}</Card.Body>

              </Card>
            }
          </Col>

        </Row>

      </>

    )
  }
}

export default Main;