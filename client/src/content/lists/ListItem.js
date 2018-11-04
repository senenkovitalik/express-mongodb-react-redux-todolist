import React, {Component} from 'react'
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/index";
import {Button, Card, CardBody, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    };

    this.togglePopover = this.togglePopover.bind(this);
  }


  togglePopover(e) {
    e.stopPropagation();
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  render() {
    return (
      <Card className="task w-100"
            onClick={() => this.props.history.push(`/lists/${this.props.list._id}`)}>
        <CardBody>
          <div className="form-check">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-column">
                <span>{this.props.list.title}</span>
                <span className="text-dark"><small>{this.props.list.created_at}</small></span>
              </div>
              <div>
                <Button onClick={this.togglePopover}
                        color='danger'
                        id={`id_${this.props.list._id}`}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
                <Popover placement="left"
                         isOpen={this.state.popoverOpen}
                         toggle={this.togglePopover}
                         target={`id_${this.props.list._id}`}>
                  <PopoverHeader>Are you really want to delete this list?</PopoverHeader>
                  <PopoverBody className="d-flex justify-content-center">
                    <Button color="danger"
                            className="mr-1"
                            onClick={() => this.props.deleteList(this.props.list._id)}
                    >Delete</Button>
                    <Button color="primary"
                            className="ml-1"
                            onClick={this.togglePopover}
                    >Cancel</Button>
                  </PopoverBody>
                </Popover>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }
}