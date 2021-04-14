import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { createNumber } from 'app/modules/account/number/number.reducer';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export interface CreateRoomProps extends StateProps, DispatchProps {}

class CreateNumberPage extends Component<CreateRoomProps, any> {
  constructor(props: Readonly<CreateRoomProps> | CreateRoomProps) {
    super(props);

    this.state = {
      number: '',
      level: '',
      price: 0,
    };
  }

  numberChange = event => {
    this.setState({
      number: event.target.value,
    });
  };

  levelChange = event => {
    this.setState({
      level: event.target.value,
    });
  };

  priceChange = event => {
    this.setState({
      price: event.target.value,
    });
  };

  createNumber = e => {
    this.props.createNumber(this.state.number, this.state.level, this.state.price);
    e.preventDefault();
  };

  render() {
    return (
      <AvForm id="password-form" onValidSubmit={this.createNumber}>
        <div>
          <AvField
            name="number"
            label="Room number"
            placeholder={'Room number'}
            type="text"
            data-cy="number"
            onChange={this.numberChange}
          />
          <AvField name="level" label="Number class" placeholder={'Number class'} type="text" data-cy="level" onChange={this.levelChange} />
          <AvField name="price" label="Price" placeholder={'Price'} type="number" data-cy="price" onChange={this.priceChange} />
          <Button disabled={this.props.loading} color="success" type="submit" data-cy="submit">
            Save
          </Button>
        </div>
      </AvForm>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.numbers.loading,
});

const mapDispatchToProps = { createNumber };

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(CreateNumberPage);
