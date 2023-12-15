const ActivityModal=()=>{

  return (
    <>
      <Modal
        show={showCompanyModal}
        onHide={handleCompanyClose}
        size="lg"
        style={{ padding: "0px" }}
      >
        <Modal.Header>
          <Modal.Title>
            {companyId ? "Update Company" : "Add Company"}
          </Modal.Title>
          <ImCross onClick={handleCompanyClose} />
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={oncompanySubmit}>
            <h5 className="font-weight-bold bg-light text-dark">
              Activity
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-12">
                <label htmlFor="floatingInput">Customer Name*</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Organization Name"
                  name="customer_name"
                  // value={companydata.organization_name || ""}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     organization_name: ev.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Company</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="campaign_type"
                  // value={companydata.organization || " "}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     organization: ev.target.value,
                  //   }))
                  // }
                >
                  <option value="1">Select</option>
                  <option value="2">Select</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Description</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="campaign_type"
                  // value={companydata.organization || " "}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     organization: ev.target.value,
                  //   }))
                  // }
                >
                  <option value="1">Select</option>
                  <option value="2">Select</option>
                </select>
              </div>
              
            </div>

            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" onClick={handleCompanyClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ActivityModal;