import * as React from "react";

import * as T from "../types";
import "./personal-info.less";
import actions from "../actions/index";
import { connect } from "react-redux";
import { store2Props } from "../selectors";

type IPersonalInfoProps = T.IProps & T.IPersonalInfoProps;

@connect(
  store2Props,
  actions
)
class PersonalInfo extends React.Component<
  IPersonalInfoProps,
  T.IPersonalInfoState
> {
  constructor(props: IPersonalInfoProps) {
    super(props);
  }

  render() {
    return (
      <div className="personalInfo">
        personalInfo
      </div>
    );
  }
}

export default PersonalInfo as any;
