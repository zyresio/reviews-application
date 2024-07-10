import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface ProjectLinkProps {
  href: string;
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ href, children }) => {
  const location = useLocation();

  // Extracting the first "element" of the path
  const basePath = location.pathname.split('/')[1];

  // Constructing the new path by appending the href prop to the base path
  const newPath = `/${basePath}${href.startsWith('/') ? '' : '/'}${href}`;

  return <Link to={newPath}>{children}</Link>;
};
