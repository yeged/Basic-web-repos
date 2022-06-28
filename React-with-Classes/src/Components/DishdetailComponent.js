import React, {Component} from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Media, Breadcrumb, BreadcrumbItem, Button, FormGroup, Row, Col, Label, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { Link } from "react-router-dom"
import { Control, LocalForm, Errors } from "react-redux-form"

class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(values) {
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal()
    }


    render() {

        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        return (
            <div>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="">
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12} >Your Name</Label>
                                <Col md={{ size: 12, offset: 0.5 }}>
                                    <Control.text model=".author" id="author" name="author"
                                        className="form-control"
                                        placeholder="Your Name"
                                        validators={{
                                            maxLength: maxLength(15), minLength: minLength(3)
                                        }}
                                    />
                                </Col>
                                <Col md={{ size: 12, offset: 0.5 }}>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6" />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

const RenderDish = ({ dish }) => {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}


const RenderComments = ({ comments }) => {
    if (comments != null) {
        return (
            <div>
                <Media tag="li">
                    <Media body>
                        <h4>Comments</h4>
                        {comments.map(comment => {
                            return (
                                <div>
                                    <div>
                                        <p>{comment.comment}</p>
                                    </div>
                                    <p>-- {comment.author},  {new Date(comment.date).toUTCString()}</p>
                                </div>
                            )
                        })}
                    </Media>
                </Media>
                <CommentForm />
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}



const Dishdetail = (props) => {


    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3> {props.dish.name} </h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    )


}



export default Dishdetail; 