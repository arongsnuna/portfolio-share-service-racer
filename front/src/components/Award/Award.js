import React from "react";
import { Card, Row } from "react-bootstrap";
import AwardContent from "./AwardContent";

function Award() {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Title className="ms-3 mt-3"> 수상 이력 </Card.Title>
      <Card.Body>
        <Row>
          <AwardContent />
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Award;
