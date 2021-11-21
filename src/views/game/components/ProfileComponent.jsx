import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Form } from "antd";
import {
  DribbbleOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ProfileComponent = () => {
  const data = useSelector((state) => state.GameReducer);

  return (
    <Fragment>
      <h1 className={"question-title"}>PROFILE</h1>
      <Form className={"profile-container"} shape={"round"}>
        <h2>
          Username <UserOutlined /> :
        </h2>
        <h3>Anonimo</h3>
        <h2>
          Points <TrophyOutlined /> :
        </h2>
        <h3>{data.points}</h3>
        <h2>
          Max score <DribbbleOutlined /> :
        </h2>
        <h3>16589895</h3>
      </Form>
    </Fragment>
  );
};

export default ProfileComponent;
