const Table = () => {
  return (
    <>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>
        <div className="d-flex justify-content-between mb-3">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Task
            </button>
            <ul className="dropdown-menu" aria-labelledby="taskDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Completed
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Pending
                </a>
              </li>
            </ul>
          </div>
          <button className="btn btn-info btn-rounded">Add New</button>
        </div>
        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <table className="table">
              <tbody>
                <div className="row">
                  <tr className="col-md-8">
                    <td className="border-0 campaign-font">Record ID</td>
                    <td className="border-0">124192692</td>
                  </tr>
                  <tr className="col-md-4">
                    <td className="border-0 campaign-font">Name</td>
                    <td className="border-0">John Doe</td>
                  </tr>
                  <tr className="col-md-3">
                    <td className="border-0 campaign-font">Company</td>
                    <td className="border-0">Solemen</td>
                  </tr>
                  <tr className="col-md-3">
                    <td className="border-0 campaign-font">Title</td>
                    <td className="border-0">Phone Enquiry</td>
                  </tr>
                  <tr className="col-md-3">
                    <td className="border-0 campaign-font">Title</td>
                    <td className="border-0">Phone Enquiry</td>
                  </tr>
                  <tr className="col-md-3">
                    <td className="border-0 campaign-font">Title</td>
                    <td className="border-0">Phone Enquiry</td>
                  </tr>
                  <tr className="col-md-12">
                    <td className="border-0 campaign-font">Title</td>
                    <td className="border-0">shbj asjdnkjn kasndkj</td>
                  </tr>
                  <div className="d-flex justify-content-end">
                    <div>
                      <button className="btn btn-success float-right ms-3">
                        Button
                      </button>
                    </div>
                    <div>
                      <button className="btn btn-info float-right ms-3">
                        Button
                      </button>
                    </div>
                    <div>
                      <button className="btn btn-primary float-right ms-3">
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Table;
