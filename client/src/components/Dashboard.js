import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setLoggingOut(true);
    
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call backend logout endpoint
        await axios.post('http://localhost:5000/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.log('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Always clear local storage and call parent logout
      setLoggingOut(false);
      setShowLogoutModal(false);
      onLogout();
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };
  return (
    <div className="min-vh-100" style={{backgroundColor: '#f8f9fa'}}>
      {/* Header with Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand h1 mb-0" style={{ fontSize: '25px', fontWeight: 'bold', marginRight: '4rem' }}>
            <i className="bi bi-heart-pulse me-2"></i>
            MyHealthPlan
          </span>
          
          {/* Navigation Links */}
          <div className="navbar-nav me-auto">
            <button className="nav-menu-item nav-menu-active me-3">My Dashboard</button>
            <button className="nav-menu-item me-3">Members</button>
            <button className="nav-menu-item me-3">Tasks</button>
            <button className="nav-menu-item me-3">Providers</button>
            <button className="nav-menu-item me-3">Authorization</button>
            <button className="nav-menu-item me-3">Faxes</button>
          </div>
          
          {/* User Dropdown */}
          <div className="navbar-nav ms-auto d-flex align-items-center">
            {/* Header Icons */}
            <div className="d-flex align-items-center me-3">
              <button className="btn btn-link text-white header-icon-btn me-2" title="Notifications">
                <i className="bi bi-bell" style={{ fontSize: '18px' }}></i>
              </button>
              <button className="btn btn-link text-white header-icon-btn me-2" title="Messages">
                <i className="bi bi-envelope" style={{ fontSize: '18px' }}></i>
              </button>
              <button className="btn btn-link text-white header-icon-btn me-2" title="Settings">
                <i className="bi bi-gear" style={{ fontSize: '18px' }}></i>
              </button>
              <button className="btn btn-link text-white header-icon-btn me-2" title="Help">
                <i className="bi bi-question-circle" style={{ fontSize: '18px' }}></i>
              </button>
            </div>
            
            <div className="dropdown">
              <button 
                className="btn btn-link text-white dropdown-toggle username-btn d-flex align-items-center" 
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-2" style={{ fontSize: '20px' }}></i>
                {user.fullName}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><span className="dropdown-item-text">Logged in as: {user.email}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={handleLogoutClick}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-8">
            <h4 className="mb-4">UM Dashboard</h4>
            
            {/* Stats Cards */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card text-white" style={{backgroundColor: '#17a2b8'}}>
                  <div className="card-body text-center">
                    <h2 className="card-title">56</h2>
                    <p className="card-text">Due Today</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-dark">
                  <div className="card-body text-center">
                    <h2 className="card-title">6</h2>
                    <p className="card-text">High Priority</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h2 className="card-title">6</h2>
                    <p className="card-text">Reminder for Today</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h2 className="card-title">18</h2>
                    <p className="card-text">Start this Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="card">
              <div className="card-header">
                <h5>Inpatient Tasks - Due Today (56)</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Priority</th>
                        <th>Authorization #</th>
                        <th>Received Date</th>
                        <th>Diagnosis</th>
                        <th>Member Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="badge bg-danger">High</span></td>
                        <td>2025OP000389</td>
                        <td>04/28/2025 03:47:01 AM</td>
                        <td>DKA</td>
                        <td>Abbott, Robert</td>
                        <td><span className="badge bg-warning">Pending</span></td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-danger">High</span></td>
                        <td>2025OP000387</td>
                        <td>04/28/2025 04:35:02 AM</td>
                        <td>CHF</td>
                        <td>Perry, Samuel</td>
                        <td><span className="badge bg-warning">Pending</span></td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-warning">Medium</span></td>
                        <td>2025OP000152</td>
                        <td>04/27/2025 02:34:07 PM</td>
                        <td>Cellulitis</td>
                        <td>Oliver, James</td>
                        <td><span className="badge bg-info">In Review</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="text-end mb-3">
              <h5>Monday, April 28</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <div 
        className={`modal fade ${showLogoutModal ? 'show' : ''}`} 
        style={{ display: showLogoutModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="logoutModalLabel"
        aria-hidden={!showLogoutModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                <i className="bi bi-box-arrow-right me-2"></i>
                Confirm Logout
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleLogoutCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout?</p>
              <div className="d-flex align-items-center">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0d6efd&color=fff&size=40`} 
                  alt="User Avatar" 
                  className="rounded-circle me-3"
                />
                <div>
                  <strong>{user.fullName}</strong><br/>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleLogoutCancel}
                disabled={loggingOut}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleLogoutConfirm}
                disabled={loggingOut}
              >
                {loggingOut ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging out...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showLogoutModal && (
        <div 
          className="modal-backdrop fade show" 
          onClick={handleLogoutCancel}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
