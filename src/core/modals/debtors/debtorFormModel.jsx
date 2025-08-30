import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";

const DebtorForm = ({ branchList,
    onSubmitDebtor,
    showModel,
    handleClose,
    debtorData,
    departmentList,
    debtorTypeList,
    statusList,
    debtorList
}) => {
    const formRef = useRef(null);

    useEffect(() => {
        if (showModel && formRef.current) {
            formRef.current.reset(); // Reset form each time modal opens
        }
    }, [showModel]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const FK_MasterDebtorID = form.FK_MasterDebtorID.value || null;

        const data = {
            ShortCode: form.ShortCode.value.trim(),
            Name: form.Name.value.trim(),
            IsMasterDebtor: !FK_MasterDebtorID,
            FK_MasterDebtorID: FK_MasterDebtorID ? parseInt(FK_MasterDebtorID) : null,
            FK_DebtorTypeID: form.FK_DebtorTypeID.value ? parseInt(form.FK_DebtorTypeID.value) : null,
            FK_BranchID: form.FK_BranchID.value ? parseInt(form.FK_BranchID.value) : null,
            FK_DepartmentID: form.FK_DepartmentID.value ? parseInt(form.FK_DepartmentID.value) : null,
            FK_StatusID: form.FK_StatusID.value ? parseInt(form.FK_StatusID.value) : null,
        };

        if (debtorData?.DebtorID) {
            data.DebtorID = debtorData.DebtorID;
        }

        if (onSubmitDebtor) {
            onSubmitDebtor(data);
        }
    };



    return (
        <Modal show={showModel} onHide={handleClose} centered dialogClassName="custom-modal-two">
            <form onSubmit={handleSubmit} ref={formRef}>
                <Modal.Header closeButton className="custom-modal-header border-0">
                    <Modal.Title>Debtor</Modal.Title>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Short Code</label>
                                <input name="ShortCode" required type="text" defaultValue={debtorData?.ShortCode} className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Name</label>
                                <input name="Name" type="text" defaultValue={debtorData?.Name} className="form-control" required />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Master Debtor</label>
                                <select name="FK_MasterDebtorID" className="form-select" defaultValue={debtorData?.FK_MasterDebtorID}>
                                    <option value="">Please select..</option>
                                    {debtorList.map((item, index) => (
                                        <option key={index} value={item.DebtorID}>
                                            {item.Name + " / " + item.ShortCode}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Debtor Type</label>
                                <select name="FK_DebtorTypeID" className="form-select" required defaultValue={debtorData?.FK_DebtorTypeID}>
                                    <option value="">Please select..</option>
                                    {debtorTypeList.map((role, index) => (
                                        <option key={index} value={role.DebtorTypeID}>
                                            {role.Type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Branch</label>
                                <select name="FK_BranchID" className="form-select" defaultValue={debtorData?.FK_BranchID}>
                                    <option value="">Please select..</option>
                                    {branchList.map((role, index) => (
                                        <option key={index} value={role.BranchID}>
                                            {role.ShortCode + " / " + role.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Department</label>
                                <select name="FK_DepartmentID" className="form-select" defaultValue={debtorData?.FK_DepartmentID}>
                                    <option value="">Please select..</option>
                                    {departmentList.map((role, index) => (
                                        <option key={index} value={role.DepartmentID}>
                                            {role.ShortCode + " / " + role.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-blocks">
                                <label>Status</label>
                                <select name="FK_StatusID" required className="form-select" defaultValue={debtorData?.FK_StatusID}>
                                    <option value="">Please select..</option>
                                    {statusList.map((role, index) => (
                                        <option key={index} value={role.StatusID}>
                                            {role.DisplayName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer-btn">
                    <button
                        type="button"
                        className="btn btn-cancel me-2"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-submit">
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default DebtorForm;


DebtorForm.propTypes = {
    debtorData: PropTypes.object,
    branchList: PropTypes.array.isRequired,
    departmentList: PropTypes.array.isRequired,
    debtorTypeList: PropTypes.array.isRequired,
    statusList: PropTypes.array.isRequired,
    debtorList: PropTypes.array.isRequired,
    onSubmitDebtor: PropTypes.func.isRequired,
    showModel: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
