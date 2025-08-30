import React, { useState, useEffect } from "react";
import { getAllProducts, newProduct, updateProduct } from "../../services/product/product";
import { getAllProductCategory } from "../../services/product/productCategory";
import { getAllProductTypes } from "../../services/product/productType";
import { getAllUnits } from "../../services/product/units";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    PlusCircle,
} from "react-feather";
import ProductForm from "../../core/modals/products/productFormModel";



const ProductPage = () => {
    const [listData, setListData] = useState([]);
    const [CategoryListData, setCategoryListData] = useState([]);
    const [typeListData, setTypeListData] = useState([]);
    const [unitListData, setUnitListData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModel, setModelShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getAllProducts();
            setListData(data);
            const type = await getAllProductCategory();
            setCategoryListData(type);
            const category = await getAllProductTypes();
            setTypeListData(category);
            const unit = await getAllUnits();
            setUnitListData(unit);
        } catch (err) {
            console.error("Failed to load addresses:", err.message);
        }
    };

    const filteredData = listData.filter((item) =>
        Object.values(item).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleShow = () => {
        setSelectedData(null);
        setModelShow(true)
    };

    const handleClose = () => setModelShow(false);
    const handleAddProduct = async (data) => {
        console.log("Data : ", data);
        try {
            if (data.POS_ProductID) {
                await updateProduct(data);
            }
            else {
                await newProduct(data);
            }
            await fetchRecords();
            setModelShow(false);
        } catch (err) {
            console.error("Error creating user:", err.message);
        }
    };

    const handleEditProduct = (record) => {
        setSelectedData(record);
        setModelShow(true);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Categories</h4>
                            <h6>Manage Your Category</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <Button variant="none" className="btn btn-added" onClick={handleShow}>
                            <PlusCircle className="me-2" />
                            Add New Category
                        </Button>
                    </div>
                </div>
                <div className="card table-list-card">
                    <div className="card-body">
                        <div className="table-top">
                            <div className="search-set">
                                <div className="search-input">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="form-control"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Link to className="btn btn-searchset">
                                        <i data-feather="search" className="feather-search" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Product Type</th>
                                        <th>Unit</th>
                                        <th>Default Unit</th>
                                        <th>Category</th>
                                        <th>Is Stock Tracked</th>
                                        <th>SKU</th>
                                        <th>Barcode</th>
                                        <th>QrCode</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.ProductName || "N/A"}</td>
                                                <td>{item.Description || "N/A"}</td>
                                                <td>{item.ProductType || "N/A"}</td>
                                                <td>{item.Unit || "N/A"}</td>
                                                <td>{item.DefaultUnit || "N/A"}</td>
                                                <td>{item.ProductCategory || "N/A"}</td>
                                                <td>{item.IsStockTracked ? "Yes" : "No"}</td>
                                                <td>{item.SKU || "N/A"}</td>
                                                <td>{item.Barcode || "N/A"}</td>
                                                <td>{item.QrCode || "N/A"}</td>
                                                <td>
                                                    <button type='button'
                                                        onClick={() => handleEditProduct(item)}
                                                        className="btn btn-sm btn-primary me-2">
                                                        <i className="feather-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="11" className="text-center">
                                                No records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ProductForm
                onSubmit={handleAddProduct}
                showModel={showModel}
                handleClose={handleClose}
                data={selectedData}
                categoryList={CategoryListData}
                typeList={typeListData}
                unitList={unitListData}
            />
        </div>
    );
};


export default ProductPage;
