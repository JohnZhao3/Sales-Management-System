import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Header, Image, Container, Divider, Grid, Menu, Segment, Icon, Popup, Form, Table, Label, Dropdown } from 'semantic-ui-react';
import SaleListItems from './Sale-List-Items';

class ProductSoldList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            productSoldList: [],
            customerNameList: [],
            productNameList: [],
            storeNameList: [],
            customerId: 8,
            productId: 4,
            storeId: 10,
            dateSold: null
        }

        this.fillDropDown = this.fillDropDown.bind(this);

        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.addSales = this.addSales.bind(this);
        this.deleteSales = this.deleteSales.bind(this);
    }

    componentDidMount() {
        this.getProductSoldList();
        this.getCustomerForDropDown();
        this.getProductForDropDown();
        this.getStoreForDropDown();
    }

    getProductSoldList() {
        let self = this;
        $.ajax({
            type: 'GET',
            url: '/ProductSold/ProductSoldList',
            success: function (data) {
                self.setState({
                    productSoldList: data,
                })
                console.log("data");
                console.log(data);
            }
        })
    }

    getCustomerForDropDown() {
        var self = this;
        $.ajax({
            type: 'get',
            url: '/ProductSold/DropDownCustomerName',
            success: function (result) {
                self.setState({
                    customerNameList: result
                })

            }
        })
    }

    getProductForDropDown() {
        var self = this;
        $.ajax({
            type: 'get',
            url: '/ProductSold/DropDownProductName',
            success: function (result) {
                self.setState({
                    productNameList: result
                })
                console.log("array");
                console.log(result);
            }
        })
    }

    getStoreForDropDown() {
        var self = this;
        $.ajax({
            type: 'get',
            url: '/ProductSold/DropDownStoretName',
            success: function (result) {
                self.setState({
                    storeNameList: result
                })
            }
        })
    }

    //fillDropDown(list) {
    //    let result = [];
    //    for (var key in list) {
    //        result.push({ value: list[key]["Id"], text: list[key]["Name"], })
    //    }
    //    return result;
    //    console.log("hehe result");
    //    console.log(result);
    //}

    fillDropDown(list) {
        let result = list.map(({ Name: text, Id: value }) => ({ text, value }));
        return result;
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
        console.log("event awdwa")
        this.setState({
            storeId: data.value
        });
    }

    handleDateChange(event, data) {
        console.log("event date yyyo");
        console.log(event.target.value);
        this.setState({
            dateSold: event.target.value
        });
    }

    addSales() {
        var data = {
            CustomerId: this.state.customerId,
            ProductId: this.state.productId,
            StoreId: this.state.storeId,
            DateSold: this.state.dateSold
        };
        $.ajax({
            type: 'POST',
            url: '/ProductSold/AddProductSold',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {
                if (result.Success === true) {
                    window.location.reload();
                } else {
                    console.log('no!');
                }

            }
        });
    }

    deleteSales(Id) {
        console.log("Delete");
        $.ajax({
            type: 'POST',
            url: '/ProductSold/DeleteSale/' + Id,
            success: function (result) {
                if (result.success === true) {
                    window.location.reload();
                }
            }
        });
    }

    render() {
        return (
            <div>
                <br />
                <h1 className="ui header">Sales List</h1>

                <Modal id="modal" trigger={<button className="ui green basic button">Create</button>}>
                    <Modal.Header >Add a new sale</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.addSales} ref="form" method="POST">
                            <Form.Field>
                                <label>Customer Name</label>
                                <Menu compact>
                                    <Dropdown placeholder='Select a Customer' options={this.fillDropDown(this.state.customerNameList)} onChange={(event, data) => this.handleCustomerChange(event, data)} selection fluid />
                                </Menu>
                            </Form.Field>
                            <Form.Field>
                                <label>Product Name</label>
                                <Menu compact>
                                    <Dropdown placeholder='Select a Product' options={this.fillDropDown(this.state.productNameList)} onChange={(event, data) => this.handleProductChange(event, data)} selection fluid item />
                                </Menu>
                            </Form.Field>
                            <Form.Field>
                                <label>Store Name</label>
                                <Menu compact>
                                    <Dropdown placeholder='Select a Store' options={this.fillDropDown(this.state.storeNameList)} onChange={(event, data) => this.handleStoreChange(event, data)} selection fluid item />
                                </Menu>
                            </Form.Field>
                            <Form.Field>
                                <label>Date</label>
                                <input type="date" onChange={(event, data) => this.handleDateChange(event, data)} /><br />
                            </Form.Field>
                            <Button type='submit'><Icon name="save" />Save</Button>
                        </Form>
                    </Modal.Content>
                </Modal>

                <table className="ui celled striped table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //Iterate over each item in customerList and pass them as props for CustomerListItems to show customer list.
                            this.state.productSoldList.map((item, key) =>
                                <SaleListItems key={key} item={item} delete={this.deleteSales} fillDropDown={this.fillDropDown} customerNameList={this.state.customerNameList}
                                    productNameList={this.state.productNameList} storeNameList={this.state.storeNameList} handleCustomerChange={this.handleCustomerChange} handleProductChange={this.handleProductChange} handleStoreChange={this.handleStoreChange} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductSoldList;