import React, { useState, useEffect } from "react";
import { getAllMenu, newMenu, updateMenu } from "../../services/menu/menuService";


import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    PlusCircle,
} from "react-feather";
import MenuForm from "../../core/modals/menu/menuFormModel";
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
    const [listData, setListData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModel, setModelShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getAllMenu();
            setListData(data);
        } catch (err) {
            console.error("Failed to load:", err.message);
        }
    }

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
            if (data.POS_MenuID) {
                await updateMenu(data);
            }
            else {
                await newMenu(data);
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


    const handleMenuClick = (menuId) => {
        navigate(`/menu-tree/${menuId}`);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>All Menu</h4>
                            <h6>Manage Your Menu</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <Button variant="none" className="btn btn-added" onClick={handleShow}>
                            <PlusCircle className="me-2" />
                            Add New Menu
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
                                        <th>Menu Name</th>
                                        <th>Is Active</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={() => handleMenuClick(item.POS_MenuID)}
                                                >
                                                    {item.MenuName || "N/A"}
                                                </td>
                                                <td>{item.IsActive ? "Yes" : "No"}</td>
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
                                            <td colSpan="3" className="text-center">
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
            <MenuForm
                onSubmit={handleAddProduct}
                showModel={showModel}
                handleClose={handleClose}
                data={selectedData}
            />
        </div>
    );
};


export default MenuPage;
