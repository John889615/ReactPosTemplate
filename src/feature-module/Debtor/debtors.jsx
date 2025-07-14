import React, { useState, useEffect } from "react";
import { getAllDebtors, getAllBranches, getAllDepartments, getAllDebtorTypes, newDebtor, updateDebtor } from "../../services/debtors/debtors";
import { getAllStatus } from "../../services/entityData/status";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    PlusCircle,
} from "react-feather";
import DebtorForm from "../../core/modals/debtors/debtorFormModel";



const Debtors = () => {
    const [listData, setListData] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [debtorTypeList, setDebtorType] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModel, setModelShow] = useState(false);
    const [selectedDebtor, setSelectedDebtor] = useState(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getAllDebtors();
            setListData(data);
            const dep = await getAllDepartments();
            setDepartmentList(dep);
            const branch = await getAllBranches();
            setBranchList(branch);
            const type = await getAllDebtorTypes();
            setDebtorType(type);
            const status = await getAllStatus();
            setStatusList(status);
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

    const handleShow = () => setModelShow(true);
    const handleClose = () => setModelShow(false);
    const handleAddDebtor = async (data) => {
        console.log("Debtor Data", data);
        try {
            if (data.DebtorID) {
                await updateDebtor(data);
            }
            else {
                await newDebtor(data);
            }
            await fetchRecords();
            setModelShow(false);
        } catch (err) {
            console.error("Error creating user:", err.message);
        }
    };

    const handleEditDebtor = (record) => {
        console.log("User Data", record);
        setSelectedDebtor(record);
        setModelShow(true);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="add-item d-flex">
                        <div className="page-title">
                            <h4>Debtors</h4>
                            <h6>Manage Your Debtor</h6>
                        </div>
                    </div>
                    <div className="page-btn">
                        <Button variant="none" className="btn btn-added" onClick={handleShow}>
                            <PlusCircle className="me-2" />
                            Add New Debtor
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
                                        <th>Short Code</th>
                                        <th>Name</th>
                                        <th>Master Debtor</th>
                                        <th>Is Master Debtor</th>
                                        <th>Debtor Type</th>
                                        <th>Branch</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.ShortCode || "N/A"}</td>
                                                <td>{item.Name || "N/A"}</td>
                                                <td>{item.MasterDebtor || "N/A"}</td>
                                                <td>{item.IsMasterDebtor ? "Yes" : "No"}</td>
                                                <td>{item.DebtorType || "N/A"}</td>
                                                <td>{item.Branch || "N/A"}</td>
                                                <td>{item.Department || "N/A"}</td>
                                                <td>{item.Status || "N/A"}</td>
                                                <td>
                                                    <button type='button'
                                                        onClick={() => handleEditDebtor(item)}
                                                        className="btn btn-sm btn-primary me-2">
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
            <DebtorForm branchList={branchList}
                onSubmitDebtor={handleAddDebtor}
                showModel={showModel}
                handleClose={handleClose}
                debtorData={selectedDebtor}
                debtorTypeList={debtorTypeList}
                departmentList={departmentList}
                statusList={statusList}
                debtorList={listData}
            />
        </div>
    );
};


export default Debtors;
