import React, {Component} from 'react'
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

    for (const listID in lists) {
      listArr.push(lists[listID]);
    }

    return (
      <Container>
        <Row>
          <Col className="mt-4">
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvGroup>
                <Label for="title">New List</Label>
                <AvInput type='text' name="title" id="title" maxLength={20} minLength={3} required />
                <AvFeedback>List title must contain 3-20 characters.</AvFeedback>
              </AvGroup>
              <AvGroup className="d-flex justify-content-end">
                <Button color="success">+</Button>
              </AvGroup>
            </AvForm>
            <hr />
            {
              !!listArr.length && <p>Available lists</p>
            }
            {
              !!listArr.length
                ? listArr.map(l => <ListItem key={l.id} list={l} />)
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