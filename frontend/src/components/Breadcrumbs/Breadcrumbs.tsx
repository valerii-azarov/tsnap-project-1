import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

interface BreadcrumbCrumb {
  path?: string;
  name: string;
}

interface BreadcrumbsProps {
  crumbs: BreadcrumbCrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <div className="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {crumb.path ? (
            <Link to={crumb.path}>
              {crumb.name}
            </Link>
          ) : (
            <span className="breadcrumbs__current">
              {crumb.name}
            </span>
          )}
          {index !== crumbs.length - 1 && <span className="breadcrumbs__divider"></span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
