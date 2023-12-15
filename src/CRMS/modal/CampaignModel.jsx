const CampaignModel = ({}) => {
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
              Campaign
            </h5>
            <div className="row">
              <div className="form-floating mb-3 col-md-12">
                <label htmlFor="floatingInput">Campaign Name*</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Organization Name"
                  name="campaign_name"
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
                <label htmlFor="floatingSelect">Campaign Type</label>
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
                  <option value="Brand">Brand</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Event">Event</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingInput">Brand</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="floatingInput"
                  placeholder="Title"
                  name="brand"
                  // value={companydata.title || ""}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     title: ev.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  rows="3"
                  name="start_date"
                  // value={companydata.date_to_remember || ""}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     date_to_remember: ev.target.value,
                  //   }))
                  // }
                />
              </div>
              <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  rows="3"
                  name="end_date"
                  // value={companydata.date_to_remember || ""}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     date_to_remember: ev.target.value,
                  //   }))
                  // }
                />
                <div className="form-floating mb-3 col-md-12">
                  <label htmlFor="floatingSelect">Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="description"
                    name="notes"
                    // value={companydata.description || ""}
                    // onChange={(ev) =>
                    //   setCompanyData((prevCompanyData) => ({
                    //     ...prevCompanyData,
                    //     description: ev.target.value,
                    //   }))
                    // }
                  ></textarea>
                </div>
                <div className="form-floating mb-3 col-md-6">
                <label htmlFor="floatingSelect">Status</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  name="status"
                  // value={companydata.organization || " "}
                  // onChange={(ev) =>
                  //   setCompanyData((prevCompanyData) => ({
                  //     ...prevCompanyData,
                  //     organization: ev.target.value,
                  //   }))
                  // }
                >
                  <option value="Planned">Planned</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
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
};
export default CampaignModel;
