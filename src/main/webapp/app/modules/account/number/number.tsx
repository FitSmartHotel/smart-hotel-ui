import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getNumbers } from 'app/modules/account/number/number.reducer';
import { IRootState } from 'app/shared/reducers';
import { Button, Col, Label, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';

export interface NumberProps extends StateProps, DispatchProps, RouteComponentProps<any> {}

class NumberPage extends Component<NumberProps, any> {
  constructor(props: Readonly<NumberProps> | NumberProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      numbers: this.props.getNumbers(),
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <div className="d-flex justify-content-end">
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> Create new number
          </Link>
        </div>
        <Table responsive striped>
          <thead>
            <tr>
              <th className="hand">Room Number</th>
              <th className="hand">Level</th>
              <th className="hand">Price</th>
              <th className="hand">Users Amount</th>
              <th className="hand">Door Locked</th>
              <th className="hand">Alarm Enabled</th>
              <th className="hand">Registered</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.numbers.map(number => (
              <tr id={number.number} key={number.number}>
                <td>
                  <Button tag={Link} to={`${match.url}/404`} color="link" size="sm">
                    {number.number}
                  </Button>
                </td>
                <td>{number.level}</td>
                <td>{number.price}</td>
                <td>{number.usersAmount}</td>
                <td>
                  <img
                    className="table-image"
                    src={number.doorLocked ? 'content/images/green_check_mark.svg' : 'content/images/yellow_cross.svg'}
                  />
                </td>
                <td>
                  <img
                    className="table-image"
                    src={number.alarmEnabled ? 'content/images/green_check_mark.svg' : 'content/images/yellow_cross.svg'}
                  />
                </td>
                <td>
                  <img
                    className="table-image"
                    src={number.registered ? 'content/images/green_check_mark.svg' : 'content/images/yellow_cross.svg'}
                  />
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/404`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/404`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${number.number}/delete`} color="danger" size="sm">
                      <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ numbers }: IRootState) => ({
  loading: numbers.loading,
  numbers: numbers.numbers,
});

const mapDispatchToProps = { getNumbers };

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NumberPage);