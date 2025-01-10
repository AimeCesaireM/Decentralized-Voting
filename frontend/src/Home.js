import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home({ isMember, becomeMember }) {


  return (
    <div>
      <div className="hero-section">
        <Container fluid className="hero-container">
          <Row className="text-center hero-content">
            <Col>
              <h1 className="display-4">Welcome to Mammoth Rumble</h1>
              <p className="lead fs-3">
                A Decentralized Polling Platform Powered by the Ethereum
                Blockchain and Smart Contracts.
              </p>
              <p className="lead fs-3">
                Create, participate, and vote in tamper-proof polls with ease.
              </p>
              {/* Conditionally render the "Join the Election Platform" button */}

              {!isMember && (
                <div>
                  <p className="mt-3 lead fs-5">
                    To join the platform, you must have a wallet extension
                    (e.g.,{" "}
                    <a
                      href="https://metamask.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ffa500" }}
                    >
                      MetaMask
                    </a>
                    ) installed in your browser. Once you click the "Join the
                    Election Platform" button, please check your wallet for a
                    join transaction and approve it to complete the process.
                  </p>
                  <Button
                    variant="success"
                    onClick={becomeMember}
                    className="mt-3"
                  >
                    Join the Election Platform
                  </Button>
                </div>
              )}
              {isMember && (
                <div>
                  <p className="mt-3 lead fs-5">
                    You are a member of the platform!
                  </p>
                  <Button variant="primary" className="mt-3 mx-5">
                    <Link
                      to="/create-vote"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Create a Poll
                    </Link>
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="features-section">
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Card className="mb-4 bg-light shadow-lg">
              <Card.Body>
                <h3>Create Polls</h3>
                <p>
                  Easily create a new decentralized poll and specify options.
                  Choose the next leader of your organization, and the next
                  flick for movie night.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="mb-4 bg-light shadow-lg">
              <Card.Body>
                <h3>Participate</h3>
                <p>
                  Join polls of interest and cast your vote securely, knowing
                  that the results are immutable. No fear of repercussions as
                  your vote is anonymous.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="mb-4 bg-light shadow-lg">
              <Card.Body>
                <h3>Transparency</h3>
                <p>
                  View the results of your poll instantly, with real-time
                  updates and full transparency. Not even the creator of the
                  poll can manipulate the results.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid className="cta-section lead">
        <Row className="text-center">
          <Col>
            <h2>Ready to Get Started?</h2>
            <p>
              Create your first poll or explore existing ones. Join Mammoth
              Rumble today and have your voice heard!
            </p>
            <Button variant="primary" size="lg">
              <Link
                to="/create-vote"
                style={{ color: "white", textDecoration: "none" }}
              >
                Create Your Poll
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
