import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';

const adminMenuItems = (
  <>
    <MenuItem icon="users" to="/admin/user-management">
      User management
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);
export const AdminMenu = ({ showOpenAPI }) => (
  <NavDropdown icon="users-cog" name="Administration" id="admin-menu" data-cy="adminMenu">
    {adminMenuItems}
  </NavDropdown>
);

export default AdminMenu;
