import { RouteComponentProps } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { assignNumber, deleteNumber, getNumber } from 'app/modules/account/number/number.reducer';
import { connect } from 'react-redux';
import { getUsersAsAdmin } from 'app/modules/administration/user-management/user-management.reducer';

export interface NumberAssignDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ number: string }> {}

export const NumberAssignDialog = (props: NumberAssignDialogProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    props.getNumber(props.match.params.number);
    props.getUsersAsAdmin();
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/numbers');
  };

  const assingUser = event => {
    props.assignNumber({
      number: props.number.number,
      userId: selectedUser,
    });
    handleClose(event);
  };

  const handleDropdownChange = userId => {
    setSelectedUser(userId);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Assing operation</ModalHeader>
      <ModalFooter>
        <ModalBody>Choose user to assing the room to: </ModalBody>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Users</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Users</DropdownItem>
            {props.users.map(u => (
              <DropdownItem onClick={() => handleDropdownChange(u.id)} key={u.id}>
                {u.firstName + ' ' + u.lastName}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button color="success" onClick={assingUser} disabled={selectedUser == null}>
          <FontAwesomeIcon icon="thumbtack" />
          &nbsp; Assing
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  number: storeState.numbers.number,
  users: storeState.userManagement.users,
});

const mapDispatchToProps = { assignNumber, getNumber, getUsersAsAdmin };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NumberAssignDialog);
