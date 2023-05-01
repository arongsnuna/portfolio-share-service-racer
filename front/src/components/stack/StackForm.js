import React from "react";
import { Button, Form } from "react-bootstrap";

function StackForm({ formSendFunction, currentData, item }) {
  const { handleSubmit, handleCancel, handleDelete, onChangeName, onChangeDescription } = formSendFunction;
  const { stackName, stackDescription, currentEditId } = currentData;

  return (
    <div>
      <div>
        <div className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="기술 이름"
            value={stackName}
            onChange={onChangeName}
          />
        </div>
        <div className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="date"
            placeholder="기술 설명"
            value={stackDescription}
            onChange={onChangeDescription}
          />
        </div>
        <div className="mb-3 text-center">
          {currentEditId !== item._id ? (
            <React.Fragment>
              <Button className="me-3" variant="primary" onClick={() => handleSubmit(item._id)}>
                확인
              </Button>
              <Button variant="secondary" onClick={() => handleCancel()}>
                취소
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button className="me-3" variant="primary" onClick={() => handleSubmit(item._id)}>
                확인
              </Button>
              <Button className="me-3" variant="danger" onClick={() => handleDelete(item._id)}>
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
