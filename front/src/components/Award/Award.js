import React, { useState } from "react";
import { Card, Row, Form, Button } from "react-bootstrap";

function Award() {
  const [inputItems, setInputItems] = useState([]);
  const [inputAddId, setInputAddId] = useState(0);

  const AddInput = () => {
    const input = {
      id: inputAddId,
      awardName: "",
      awardDate: "",
      awardInstitution: "",
      awardDescription: "",
      isSubmit: false,
      isEdit: false,
    };

    setInputItems((prevInputItems) => [...prevInputItems, input]);
    setInputAddId((prevInputAddId) => prevInputAddId + 1);
  };

  const handleSubmit = (index) => {
    const newItem = { ...inputItems[index], isSubmit: true, isEdit: false };
    const newItems = [...inputItems];
    newItems.splice(index, 1, newItem);
    setInputItems(newItems);
  };

  return (
    <div>
      <Card style={{ width: "100%" }}>
        <h2 className="ms-3">수상 이력</h2>
        {inputItems.map((item, index) => (
          <Card.Body key={item.id}>
            <Row>
              <div>
                {item.isSubmit === false ? (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Control
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="수상명"
                        value={item.awardName}
                        onChange={(e) =>
                          setInputItems((prevInputItems) =>
                            prevInputItems.map((prevItem) =>
                              prevItem.id === item.id
                                ? { ...prevItem, awardName: e.target.value }
                                : prevItem
                            )
                          )
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        style={{ width: "100%" }}
                        type="Date"
                        placeholder="수상연도"
                        value={item.awardDate}
                        onChange={(e) =>
                          setInputItems((prevInputItems) =>
                            prevInputItems.map((prevItem) =>
                              prevItem.id === item.id
                                ? { ...prevItem, awardDate: e.target.value }
                                : prevItem
                            )
                          )
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="수상기관"
                        value={item.awardInstitution}
                        onChange={(e) =>
                          setInputItems((prevInputItems) =>
                            prevInputItems.map((prevItem) =>
                              prevItem.id === item.id
                                ? {
                                    ...prevItem,
                                    awardInstitution: e.target.value,
                                  }
                                : prevItem
                            )
                          )
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="수여내용"
                        value={item.awardDescription}
                        onChange={(e) =>
                          setInputItems((prevInputItems) =>
                            prevInputItems.map((prevItem) =>
                              prevItem.id === item.id
                                ? {
                                    ...prevItem,
                                    awardDescription: e.target.value,
                                  }
                                : prevItem
                            )
                          )
                        }
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => handleSubmit(index)}
                      >
                        확인
                      </Button>{" "}
                      <Button variant="primary" type="delete">
                        취소
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>
                      {item.awardName}
                      <br />
                      {item.awardDate}
                      <br />
                      {item.awardInstitution}
                      <br />
                      {item.awardDescription}
                    </p>
                  </div>
                )}
              </div>
            </Row>
          </Card.Body>
        ))}
        <div className="mb-3 text-center">
          <Button variant="primary" onClick={AddInput}>
            +
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Award;
