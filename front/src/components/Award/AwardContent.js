import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AwardContent() {
  const [inputItems, setInputItems] = useState([]);
  const [inputAddId, setInputAddId] = useState(0);
  const [originItems, setOriginItems] = useState([]);

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

  const handleEdit = (index) => {
    const newItem = { ...inputItems[index], isEdit: true };
    const newItems = [...inputItems];
    newItems.splice(index, 1, newItem);
    setInputItems(newItems);
    setOriginItems(inputItems);
  };

  const handleCancle = (id, index) => {
    if (!inputItems[index].isEdit) {
      const newItems = inputItems.filter((item) => item.id !== id);
      setInputItems(newItems);
    } else {
      setInputItems(originItems);
    }
  };

  const handleDelete = (id) => {
    const newItems = inputItems.filter((item) => item.id !== id);
    setInputItems(newItems);
  };

  return (
    <div>
      {inputItems.map((item, index) => (
        <div key={item.id}>
          {item.isSubmit && item.isEdit === false ? (
            <div>
              <p>
                {item.awardName}
                <br />
                {item.awardDate}
                <br />
                {item.awardInstitution}
                <br />
                {item.awardDescription}
                <br />
                <div className="mb-3 text-center">
                  <Button variant="link" onClick={() => handleEdit(index)}>
                    편집
                  </Button>{" "}
                  <Button variant="link" onClick={() => handleDelete(item.id)}>
                    삭제
                  </Button>
                </div>
              </p>
            </div>
          ) : (
            <div>
              <Form.Group className="mb-2">
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

              <Form.Group className="mb-2">
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

              <Form.Group className="mb-2">
                <Form.Control
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="수상기관"
                  value={item.awardInstitution}
                  onChange={(e) =>
                    setInputItems((prevInputItems) =>
                      prevInputItems.map((prevItem) =>
                        prevItem.id === item.id
                          ? { ...prevItem, awardInstitution: e.target.value }
                          : prevItem
                      )
                    )
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="수여내용"
                  value={item.awardDescription}
                  onChange={(e) =>
                    setInputItems((prevInputItems) =>
                      prevInputItems.map((prevItem) =>
                        prevItem.id === item.id
                          ? { ...prevItem, awardDescription: e.target.value }
                          : prevItem
                      )
                    )
                  }
                />
              </Form.Group>
              <div className="mb-3 text-center">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit(index)}
                >
                  확인
                </Button>{" "}
                <Button
                  variant="secondary"
                  type="delete"
                  onClick={() => handleCancle(item.id, index)}
                >
                  취소
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mb-3 text-center">
        <Button variant="primary" onClick={AddInput}>
          +
        </Button>
      </div>
    </div>
  );
}

export default AwardContent;
