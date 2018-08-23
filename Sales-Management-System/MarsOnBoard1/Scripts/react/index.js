import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CustomerList from './components/customer-list';
import ProductSoldList from './components/productSoldList';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';

class App extends Component {

    render() {
        //let test = <Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new customer</Button>}  >
        //    <Modal.Header >Add a new customer</Modal.Header>
        //    <Modal.Content>
        //        <Form ref="form" method="POST">
        //            <Form.Field>
        //                <label>Name</label><br />s
        //                <input type="text" placeholder="Type a name" name="name" required
        //                    minlength="3" maxlength="20" /><br />
        //            </Form.Field>
        //            <Form.Field>
        //                <label>Address</label><br />
        //                <input placeholder="Type an address" name="address" required /><br />
        //            </Form.Field>
        //            <Button type='submit'><Icon name="save" />save</Button>
        //        </Form>
        //    </Modal.Content>
        //</Modal>

        //<Modal id="modal" trigger={<Button color="blue" id="buttonModal">Add a new customer</Button>}>
        //    <Modal.Header >Add a new customer</Modal.Header>
        //    <Modal.Content>
        //        <Form onSubmit={this.addCustomer} ref="form" method="POST">
        //            <Form.Field>
        //                <label>Name</label><br />
        //                <input placeholder="Type a name" name="Name" required maxlength="20" /><br />
        //            </Form.Field>
        //            <Form.Field>
        //                <label>Address</label><br />
        //                <input placeholder="Type an address" name="Address" required /><br />
        //            </Form.Field>
        //            <Button type='submit'><Icon name="save" />Save</Button>
        //        </Form>
        //    </Modal.Content>
        //</Modal>

        return (
            <div>
                <div>
                    <CustomerList />
                    <ProductSoldList />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));