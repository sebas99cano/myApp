import { UserOutlined } from "@ant-design/icons";
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
            <UserOutlined /> <br />
            Login
          </Button>
        </Col>
        <Col span={8}>
          <Button
            className="home-button home-anonimo-button"
            onClick={() => {
              navigate("/game");
            }}
          >
            <UserOutlined /> <br />
            Play Anonimo
          </Button>
        </Col>
        <Col span={8}>
          <Button className="home-button home-contact-button">
            <UserOutlined /> <br />
            Contact me
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
