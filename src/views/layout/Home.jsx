import {
  ContactsOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  let navigate = useNavigate();

  return (
    <Fragment>
      <Row className="container-home-buttons">
        <Col span={8}>
          <Button className="home-button home-login-button">
            <span>
              <UserOutlined /> <br />
              Login
            </span>
          </Button>
        </Col>
        <Col span={8}>
          <Button
            className="home-button home-anonimo-button"
            onClick={() => {
              navigate("/game");
            }}
          >
            <span>
              <RightCircleOutlined /> <br />
              Play Anonimo
            </span>
          </Button>
        </Col>
        <Col span={8}>
          <Button className="home-button home-contact-button">
            <span>
              <ContactsOutlined /> <br />
              Contact me
            </span>
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
