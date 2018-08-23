import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label } from 'semantic-ui-react';
import CustomerListItems from './customer-list-items';

class CustomerList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customerList: [],
            Id: null,
            Name: null,
            Address: null
        };

        //this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    componentDidMount() {
        this.getCustomerList();
    }
    
    getCustomerList() {
        let self = this;
        $.ajax({
            type: 'get',
            url: '/Customer/CustomerList',
            success: function (data) {
                self.setState({ customerList: data });
            }
        });
    }

    addCustomer() {
        var data = {
            Name: this.state.Name,
            Address: this.state.Address
        };
        $.ajax({
            url: '/Customer/AddCustomer',
            //header: {
            //    'Content-Type': 'application/json',
            //},
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                window.location.reload();
            }
        });
    }

    handleNameChange(event) {
        this.setState({
            Name: event.target.value
        });
    }

    handleAddressChange(event) {
        this.setState({
            Address: event.target.value
        });
    }

    deleteCustomer(a) {
        $.ajax({
            type: 'POST',
            url: '/Customer/DeleteCustomer/' + a,
            success: function (result) {
                if (result.success) {
                    window.location.reload();
                }
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <br />
                    <h1 className="ui header">Customer List</h1>
                    <Modal id="modal" trigger={<button className="ui green basic button">Create</button>}>
                        <Modal.Header >Add a new customer</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.addCustomer} ref="form" method="POST">
                                <Form.Field>
                                    <label>Name</label><br />
                                    <input placeholder="Type a name" onChange={(event) => this.handleNameChange(event)} required maxLength="20" /><br />
                                </Form.Field>
                                <Form.Field>
                                    <label>Address</label><br />
                                    <input placeholder="Type an address" onChange={(event) => this.handleAddressChange(event)} required /><br />
                                </Form.Field>
                                <Button type='submit'><Icon name="save" />Save</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>
                    <div>
                        <table className="ui celled striped table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer Name</th>
                                    <th>Address</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //Iterate over each item in customerList and pass them as props for CustomerListItems to show customer list.
                                    this.state.customerList.map((item, key) =>
                                        <CustomerListItems key={key} item={item} deleteCustomer={this.deleteCustomer} />
                                       )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CustomerList;