import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect } from 'react';
import { getUserNumbers, lockNumber, setAlarmState, unlockNumber } from 'app/modules/account/number/number.reducer';
import { connect } from 'react-redux';

export interface NumberControllerProps extends StateProps, DispatchProps, RouteComponentProps<any> {}

export const NumberControllerPage = (props: NumberControllerProps) => {
  useEffect(() => {
    props.getUserNumbers();
  }, []);

  const handleLockedSwitch = n => (n.locked ? props.unlockNumber(n.number) : props.lockNumber(n.number));

  const handleAlarmSwitch = n =>
    props.setAlarmState({
      number: n.number,
      enabled: !n.alarmEnabled,
    });

  return (
    <div>
      {props.numbers.length === 0 ? <h2>You have no numbers assigned</h2> : null}
      {props.numbers.map(n => (
        <div key={n.number}>
          <h3>My number {n.number}</h3>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="lockSwitch"
              checked={n.locked}
              onChange={() => handleLockedSwitch(n)}
              readOnly
            />
            <label className="custom-control-label" htmlFor="lockSwitch">
              Number Locked
            </label>
          </div>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="alarmSwitch"
              checked={n.alarmEnabled}
              onChange={() => handleAlarmSwitch(n)}
              readOnly
            />
            <label className="custom-control-label" htmlFor="alarmSwitch">
              Alarm Enabled
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ numbers }: IRootState) => ({
  number: numbers.number,
  numbers: numbers.numbers,
});

const mapDispatchToProps = { getUserNumbers, lockNumber, unlockNumber, setAlarmState };

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NumberControllerPage);
