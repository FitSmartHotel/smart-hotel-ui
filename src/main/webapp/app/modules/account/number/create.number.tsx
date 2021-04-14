import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { createNumber } from 'app/modules/account/number/number.reducer';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface CreateRoomProps extends StateProps, DispatchProps {}

export const CreateNumberPage = (props: CreateRoomProps) => {
  const createNumberHandler = (event, values) => {
    props.createNumber(values.number, values.level, values.price);
  };

  return (
    <AvForm id="password-form" onValidSubmit={createNumberHandler}>
      <div>
        <AvField name="number" label="Room number" placeholder={'Room number'} type="text" data-cy="number" />
        <AvField name="level" label="Number class" placeholder={'Number class'} type="text" data-cy="level" />
        <AvField name="price" label="Price" placeholder={'Price'} type="number" data-cy="price" />
        <Button tag={Link} to="/admin/numbers" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button disabled={props.loading} color="success" type="submit" data-cy="submit">
          Save
        </Button>
      </div>
    </AvForm>
  );
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.numbers.loading,
});

const mapDispatchToProps = { createNumber };

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CreateNumberPage);
