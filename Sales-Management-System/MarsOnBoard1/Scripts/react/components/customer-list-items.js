import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Icon, Form, } from 'semantic-ui-react';

class CustomerListItems extends Component {
    constructor(props) {
        super(props);

        //ues state to set the want to edit value of Name and Address as item.Name, item was passed by props as an 
        //atrribute of CustomerListItems in customer-list, 
        this.state = {
            editedName: this.props.item.Name,
            editedAddress: this.props.item.Address
        };

        //Must bind otherwise setState is not a function error will occur.
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    //set editedName value as the typed value
    handleNameChange(event) {
        this.setState({ editedName: event.target.value });
    }
    //set editedAddress value as the typed value
    handleAddressChange(event) {
        this.setState({ editedAddress: event.target.value });
    }

    Update() {
        var data = {
            Name: this.state.editedName,
            Address: this.state.editedAddress,
            Id: this.props.item.Id
        };
        $.ajax({
            type: 'POST',
            url: '/Customer/EditCustomer',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.success === true) {
                    window.location.reload();
                } else {
                    console.log("No");
                }
            }
        });
    }

    render() {
        //ES6 syntax, Object destruction
        //item and key passed by props as attributes in called CustomerListItems in customer-list.
        const { Id, Name, Address } = this.props.item;
        const key = this.props.key;
        return (
            <tr key={key}>
                <td>{Id}</td>
                <td>{Name}</td>
                <td>{Address}</td>
                <td>
                    <Modal id="modal" trigger={<button className="ui blue basic button">Edit</button>}>
                        <Modal.Header >Edit a new customer</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={() => this.Update()}  ref="form" method="POST">
                                <Form.Field>
                                    <label>Name</label><br />
                                    <input value={this.state.editedName} onChange={(e) => this.handleNameChange(e)} required maxLength="20" /><br />
                                </Form.Field>
                                <Form.Field>
                                    <label>Address</label><br />
                                    <input value={this.state.editedAddress} onChange={(e) => this.handleAddressChange(e)} required /><br />
                                </Form.Field>
                                <Button type='submit'><Icon name="save" />Save</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                    
                    <button onClick={() => this.props.deleteCustomer(Id)} className="ui red basic button">Delete</button>
                </td>
            </tr>
        )
        //
    }
}

export default CustomerListItems;