import React, { useState, useEffect } from "react";
import { getAllCountry } from "../../../services/entityData/country";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    PlusCircle,
} from "react-feather";

const EntityDataCountries = () => {
    const [addressList, setAddressList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const data = await getAllCountry();
            console.log("Countries", data);
            setAddressList(data);
        } catch (err) {
            console.error("Failed to load addresses:", err.message);
        }
    };

    const filteredData = addressList.filter((item) =>
        Object.values(item).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Countries List</h4>
                            <h6>Manage Your Country</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <Button variant="none" className="btn btn-added">
                            <PlusCircle className="me-2" />
                            Add New Country
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
                                        <th>Native Name</th>
                                        <th>Official Name</th>
                                        <th>ISO2 Code</th>
                                        <th>ISO3 Code</th>
                                        <th>Primary Language Code</th>
                                        <th>Numeric Code</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.CountryName}</td>
                                                <td>{item.NativeName}</td>
                                                <td>{item.OfficialName}</td>
                                                <td>{item.ISO2Code}</td>
                                                <td>{item.ISO3Code}</td>
                                                <td>{item.PrimaryLanguageCode}</td>
                                                <td>{item.NumericCode}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-2">
                                                        <i className="feather-edit"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
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
        </div>
    );
};

export default EntityDataCountries;
