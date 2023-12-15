import { useEffect } from "react";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import { HiBars3 } from "react-icons/hi2";

const Sidebar = () => {
 
  return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            CRMS
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Interface</div>

        

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Addons</div>

       
        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">
            <i className="fas fa-fw fa-table"></i>
            <span>Tasks</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contacts">
            <i className="fas fa-fw fa-table"></i>
            <span>Contacts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/companies">
            <i className="fas fa-fw fa-table"></i>
            <span>Companies</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/leads">
            <i className="fas fa-fw fa-table"></i>
            <span>Leads</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/deals">
            <i className="fas fa-fw fa-table"></i>
            <span>Deals</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/projects">
            <i className="fas fa-fw fa-table"></i>
            <span>Projects</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/table">
            <i className="fas fa-fw fa-table"></i>
            <span>Tables</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
       

        {/* <!-- Sidebar Message --> */}
      </ul>
    
  );
};
export default Sidebar;
