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
    // eslint-disable-next-line no-console
    console.log('Assinging user');
    // eslint-disable-next-line no-console
    console.log(props.users);

    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Assing operation</ModalHeader>
      <ModalBody>Choose user to assing the room to: </ModalBody>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Users</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Users</DropdownItem>
          <DropdownItem>Header</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button color="danger" onClick={assingUser}>
          <FontAwesomeIcon icon="trash" />
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
