import React from "react";
import { Card, Row } from "react-bootstrap";
import StackDetail from "./StackDetail";

function Stack({ portfolioOwnerId, isEditable }) {
  return (
    <Card className="ms-3" style={{ width: "100%" }}>
      <Card.Title className="ms-3 mt-3">기술 스택</Card.Title>
      <Card.Body>
        <Row>
          <div>
            <StackDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Stack;
