import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface NaviBarProps {
  onPageChange: (page: string) => void;
}

const NaviBar: React.FC<NaviBarProps> = ({onPageChange}) => {
    const handleLinkClick = (page: string) => {
      onPageChange(page);
    };
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={()=>handleLinkClick('0')}>Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#"  onClick={()=>handleLinkClick('1')}>Regex</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={()=>handleLinkClick('2')}>Simulador de gramatica</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"  onClick={()=>handleLinkClick('3')}>Automatos Finitos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
};

export default NaviBar;
