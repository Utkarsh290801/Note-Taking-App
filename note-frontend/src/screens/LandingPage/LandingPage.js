import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <h1 className="title">Note-Taking</h1>
              <p className="subtitle" style={{fontSize:"15px",color:"black" , fontWeight:"bold"}}>Organize your thoughts and ideas with ease.</p>
            
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
