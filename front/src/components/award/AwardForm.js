import React from "react";
import { Form, Button } from "react-bootstrap";

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
  const { awardName, awardDate, awardInstitution, awardDescription } =
    currentData;

  return (
    <div>
      <div>
        <Form.Group className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="수상명"
            value={awardName}
            onChange={onChangeName}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="Date"
            placeholder="수상일자"
            value={awardDate}
            onChange={onChangeDate}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="수상기관"
            value={awardInstitution}
            onChange={onChangeInstitution}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            style={{ width: "100%" }}
            type="text"
            placeholder="수여내용"
            value={awardDescription}
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

export default AwardForm;
