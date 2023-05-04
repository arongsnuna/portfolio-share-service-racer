import React from "react";
import { Button, Form } from "react-bootstrap";

function AwardForm({ formSendFunction, currentData, item }) {
  const {
    handleSubmit,
    handleCancel,
    handleDelete,
    onChangeName,
    onChangeDate,
    onChangeInstitution,
    onChangeDescription,
  } = formSendFunction;
  const { awardName, awardDate, awardInstitution, awardDescription, currentEditId } = currentData;

  return (
    <div>
      <div>
        <div className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="수상명"
            value={awardName}
            onChange={onChangeName}
          />
        </div>
        <div className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="date"
            placeholder="수상일자"
            value={awardDate}
            onChange={onChangeDate}
          />
        </div>
        <div className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="수상기관"
            value={awardInstitution}
            onChange={onChangeInstitution}
          />
        </div>
        <div className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="수여내용"
            value={awardDescription}
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

export default AwardForm;
