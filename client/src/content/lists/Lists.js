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
    const { lists } = this.props;
    const listArr = [];

    for (const list_id in lists) {
      if (lists.hasOwnProperty(list_id)) {
        console.log(lists[list_id]);
        listArr.push(lists[list_id]);
      }
    }

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
              !!listArr.length && <p>Available lists</p>
            }
            {
              !!listArr.length
                ? listArr.map(l => <ListItem key={l._id}
                                             list={l}
                                             deleteList={this.props.deleteList}
                                             history={this.props.history}/>)
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