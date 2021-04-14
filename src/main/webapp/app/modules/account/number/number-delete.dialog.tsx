import React, { useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { deleteNumber, getNumber } from 'app/modules/account/number/number.reducer';
import { RouteComponentProps } from 'react-router-dom';

export interface NumberDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ number: string }> {}

export const NumberDeleteDialog = (props: NumberDeleteDialogProps) => {
  useEffect(() => {
    props.getNumber(props.match.params.number);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/numbers');
  };

  const confirmDelete = event => {
    props.deleteNumber(props.match.params.number);
    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody>Are you sure you want to delete this Room Number?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  number: storeState.numbers.number,
});

const mapDispatchToProps = { deleteNumber, getNumber };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NumberDeleteDialog);
