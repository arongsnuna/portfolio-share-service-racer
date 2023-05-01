import React from "react";
import { Form, Button } from "react-bootstrap";

function StackForm({ formSendFunction, currentData, item }) {
  const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDescription } = formSendFunction;
  const { stackName, stackDescription, editCurrentId } = currentData;

  return (
    <div>
      <div>
        <Form.Group className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="기술 이름"
            value={stackName}
            onChange={onChangeName}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="기술 설명"
            value={stackDescription}
            onChange={onChangeDescription}
          />
        </Form.Group>

        <div className="mb-3 text-center">
          {editCurrentId !== item.id ? (
            <React.Fragment>
              <Button variant="pimary" onClick={() => handleSubmit(item._id)}>
                확인
              </Button>
              <Button variant="secondary" onClick={() => handleCancel()}>
                취소
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button variant="primary" onClick={() => handleSubmit(item._id)}>
                확인
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item._id)}>
                삭제
              </Button>
              <Button variant="secondary" onClick={() => handleCancel()}>
                취소
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default StackForm;
