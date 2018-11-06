import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Label,
} from 'reactstrap';
import ListItem from "./ListItem";
import {
  AvForm,
  AvInput,
  AvFeedback,
  AvGroup
} from 'availity-reactstrap-validation';

export default class Lists extends Component {
  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleValidSubmit(event, values) {
    this.props.createList(values.title);
  }

  render() {

    const arr = Object.keys(this.props.lists).map(listID =>
      <ListItem key={listID}
                list={this.props.lists[listID]}
                deleteList={this.props.deleteList}
                history={this.props.history} />
    );

    return (
      <Container>
        <Row>
          <Col className="mt-4">
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvGroup>
                <Label for="title">New List</Label>
                <AvInput type='text' name="title" id="title" maxLength={20} minLength={3} required/>
                <AvFeedback>List title must contain 3-20 characters.</AvFeedback>
              </AvGroup>
              <AvGroup className="d-flex justify-content-end">
                <Button color="success">+</Button>
              </AvGroup>
            </AvForm>
            <hr/>
            {
              !!arr.length && <p>Available lists</p>
            }
            {
              !!arr.length
                ? arr
                : <p>You don't have lists yet)</p>
            }
          </Col>
        </Row>
      </Container>
    )
  }

  componentDidMount() {
    this.props.fetchLists();
  }
}