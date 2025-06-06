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
        <div className="d-flex justify-content-between align-items-center dashboard-header">
          <h2 className="mb-0 fw-bold">UM Dashboard</h2>
          <h5 className="mb-0 text-muted fw-normal">Monday, April 28</h5>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#">My Tasks</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Cases</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Risk Stratification</a>
            </li>
          </ul>
        </div>
        
        {/* Stats Cards Row */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card text-white summary-card due-today-card">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-calendar-check" style={{fontSize: '2.5rem'}}></i>
                </div>
                <div>
                  <h2 className="card-title mb-1">56</h2>
                  <p className="card-text mb-0">Due Today</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card text-white summary-card high-priority-card">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-exclamation-triangle" style={{fontSize: '2.5rem'}}></i>
                </div>
                <div>
                  <h2 className="card-title mb-1">6</h2>
                  <p className="card-text mb-0">High Priority</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card summary-card bg-light">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-bell text-muted" style={{fontSize: '2.5rem'}}></i>
                </div>
                <div>
                  <h2 className="card-title mb-1 text-dark">6</h2>
                  <p className="card-text mb-0 text-muted">Reminder for Today</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card summary-card bg-light">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-calendar-week text-muted" style={{fontSize: '2.5rem'}}></i>
                </div>
                <div>
                  <h2 className="card-title mb-1 text-dark">18</h2>
                  <p className="card-text mb-0 text-muted">Start this Week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Table Section */}
        <div className="card dashboard-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-2">Inpatient Tasks - Due Today (56)</h5>
              <i className="bi bi-box-arrow-up-right text-muted"></i>
            </div>
            <small className="text-muted">Last Updated: 1 min ago <i className="bi bi-arrow-clockwise text-success"></i></small>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{width: '40px'}}></th>
                    <th>Priority <i className="bi bi-caret-down-fill small"></i></th>
                    <th>Authorization #</th>
                    <th>Received Date</th>
                    <th>Admission Date</th>
                    <th>Diagnosis</th>
                    <th>DRG</th>
                    <th>POS</th>
                    <th>Type</th>
                    <th>Member Name</th>
                    <th>Approved Days</th>
                    <th>Next Review Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="selected">
                    <td><i className="bi bi-play-fill text-primary"></i></td>
                    <td className="priority-cell priority-high"><span className="badge badge-priority-high">High</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000389</a></td>
                    <td><small>04/28/2025 03:47:01 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>DKA</span></td>
                    <td>637</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Silvermine</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Initial Review</span></td>
                    <td>Abbott, Robert</td>
                    <td>3</td>
                    <td><small>04/28/2025 10:00 AM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-high"><span className="badge badge-priority-high">High</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000387</a></td>
                    <td><small>04/28/2025 04:35:02 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>CHF</span></td>
                    <td>291</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Evernorth</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Initial Review</span></td>
                    <td>Perry, Samuel</td>
                    <td>3</td>
                    <td><small>04/28/2025 10:30 AM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-high"><span className="badge badge-priority-high">High</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000928</a></td>
                    <td><small>04/28/2025 05:02:03 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>CKD</span></td>
                    <td>687</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Cascade I</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Concurrent Review</span></td>
                    <td>Sawyer, Kate</td>
                    <td>3</td>
                    <td><small>04/28/2025 11:30 AM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-high"><span className="badge badge-priority-high">High</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000278</a></td>
                    <td><small>04/28/2025 05:47:04 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>CKD</span></td>
                    <td>688-</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Palicade R</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Initial Review</span></td>
                    <td>Smith, Laura</td>
                    <td>3</td>
                    <td><small>04/28/2025 12:00 PM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-high"><span className="badge badge-priority-high">High</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000378</a></td>
                    <td><small>04/28/2025 06:14:05 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>DKA</span></td>
                    <td>637</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Trinity Oal</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Initial Review</span></td>
                    <td>Rutherford, Renee</td>
                    <td>3</td>
                    <td><small>04/28/2025 12:30 PM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-high"><span className="badge badge-priority-high">High</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000312</a></td>
                    <td><small>04/27/2025 05:38:06 PM</small></td>
                    <td><small>04/27/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>DKA</span></td>
                    <td>638</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>LumenPoi</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Concurrent Review</span></td>
                    <td>Andrews, Mike</td>
                    <td>3</td>
                    <td><small>04/28/2025 1:00 PM</small></td>
                    <td><span className="badge badge-status-appeal">APPEAL</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-medium"><span className="badge badge-priority-medium">Medium</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000152</a></td>
                    <td><small>04/27/2025 02:34:07 PM</small></td>
                    <td><small>04/27/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>Cellulitis</span></td>
                    <td>602</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>St. Aureliu</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Concurrent Review</span></td>
                    <td>Oliver, James</td>
                    <td>3</td>
                    <td><small>04/28/2025 2:00 PM</small></td>
                    <td><span className="badge badge-status-review">In Review</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-medium"><span className="badge badge-priority-medium">Medium</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000369</a></td>
                    <td><small>04/28/2025 07:33:08 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>COPD</span></td>
                    <td>191</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Cobalt Bay</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Initial Review</span></td>
                    <td>Emerson, John</td>
                    <td>3</td>
                    <td><small>04/28/2025 2:30 PM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-medium"><span className="badge badge-priority-medium">Medium</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000189</a></td>
                    <td><small>04/28/2025 08:16:09 AM</small></td>
                    <td><small>04/28/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>UTI</span></td>
                    <td>690</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>Trinity Oal</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Concurrent Review</span></td>
                    <td>Perry, Samuel</td>
                    <td>3</td>
                    <td><small>04/28/2025 3:00 PM</small></td>
                    <td><span className="badge badge-status-pending">Pending</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="priority-cell priority-medium"><span className="badge badge-priority-medium">Medium</span></td>
                    <td><a href="#" className="text-decoration-none">2025OP000390</a></td>
                    <td><small>04/27/2025 04:16:10 PM</small></td>
                    <td><small>04/27/2025</small></td>
                    <td><span className="badge" style={{backgroundColor: '#28a745', color: 'white'}}>DKA</span></td>
                    <td>637</td>
                    <td><span className="badge" style={{backgroundColor: '#17a2b8', color: 'white'}}>St. Aureliu</span></td>
                    <td><span className="badge" style={{backgroundColor: '#6c757d', color: 'white'}}>Initial Review</span></td>
                    <td>Smith, Laura</td>
                    <td>3</td>
                    <td><small>04/28/2025 3:30 PM</small></td>
                    <td><span className="badge badge-status-review">In Review</span></td>
                    <td><i className="bi bi-three-dots action-dots"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center p-3 border-top">
              <div className="d-flex align-items-center">
                <select className="form-select form-select-sm" style={{width: 'auto'}}>
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#"><i className="bi bi-chevron-left"></i></a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item disabled">
                    <a className="page-link" href="#">...</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">8</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">9</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#"><i className="bi bi-chevron-right"></i></a>
                  </li>
                </ul>
              </nav>
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
