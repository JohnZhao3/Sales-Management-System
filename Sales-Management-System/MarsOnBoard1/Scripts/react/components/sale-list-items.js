import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label, Dropdown } from 'semantic-ui-react';

class SaleListItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productSoldList: [],
            customerNameList: [],
            productNameList: [],
            storeNameList: [],
            customerId: this.props.item.CustomerId,
            productId: this.props.item.ProductId,
            storeId: this.props.item.StoreId,
            dateSold: this.props.item.DateSold
        };

        this.update = this.update.bind(this);

        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    update() {
        var data = {
            CustomerId: this.state.customerId,
            ProductId: this.state.productId,
            StoreId: this.state.storeId,
            DateSold: this.state.dateSold,
            Id: this.props.item.Id
        };

        $.ajax({
            type: 'POST',
            url: '/ProductSold/UpdateSales',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.Success === true) {
                    window.location.reload();
                } else {
                    console.log("No but good");
                }
            }
        });
    }

    handleCustomerChange(event, data) {
        this.setState({
            customerId: data.value
        });
    }

    handleProductChange(event, data) {
        this.setState({
            productId: data.value
        });
    }

    handleStoreChange(event, data) {
        this.setState({
            storeId: data.value
        });
    }

    handleDateChange(event, data) {
        this.setState({
            dateSold: event.target.value
        });
    }

    render() {
        const Id = this.props.item.Id;
        const { CustomerName, ProductName, StoreName, DateSold } = this.props.item;
        const key = this.props.key;
        const date = moment(DateSold, 'DD-MM-YYYY').format("YYYY-MM-DD");
        return (
            <tr key={key}>
                <td>{Id}</td>
                <td>{CustomerName}</td>
                <td>{ProductName}</td>
                <td>{StoreName}</td>
                <td>{date}</td>
                <td>

                    <Modal id="modal" trigger={<button className="ui blue basic button">Edit</button>}>
                        <Modal.Header >Add a new sale</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={() => this.update()} ref="form" method="POST">
                                <Form.Field>
                                    <label>Customer Name</label>
                                    <Menu compact>
                                        <Dropdown value={this.state.customerId} options={this.props.fillDropDown(this.props.customerNameList)} onChange={(event, data) => this.handleCustomerChange(event, data)} selection fluid />
                                    </Menu>
                                </Form.Field>
                                <Form.Field>
                                    <label>Product Name</label>
                                    <Menu compact>
                                        <Dropdown value={this.state.productId} options={this.props.fillDropDown(this.props.productNameList)} onChange={(event, data) => this.handleProductChange(event, data)} selection fluid item />
                                    </Menu>
                                </Form.Field>
                                <Form.Field>
                                    <label>Store Name</label>
                                    <Menu compact>
                                        <Dropdown value={this.state.storeId} options={this.props.fillDropDown(this.props.storeNameList)} onChange={(event, data) => this.handleStoreChange(event, data)} selection fluid item />
                                    </Menu>
                                </Form.Field>
                                <Form.Field>
                                    <label>Date</label>
                                    <input type="date" defaultValue={date} onChange={(event, data) => this.handleDateChange(event, data)} /><br />
                                </Form.Field>
                                <Button type='submit'><Icon name="save" />Save</Button>
                            </Form>
                        </Modal.Content>
                    </Modal>

                    <button className="ui red basic button" onClick={() => this.props.delete(Id)}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default SaleListItems;