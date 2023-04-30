import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import AwardForm from "./AwardForm";
import AwardP from "./AwardP";

function AwardDetail({ portfolioOwnerId, isEditable }) {
  const [dbItem, setDbItem] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editCurrentId, setEditCurrentId] = useState("");

  const [awardName, setAwardName] = useState("");
  const [awardDate, setAwardDate] = useState("");
  const [awardInstitution, setAwardInstitution] = useState("");
  const [awardDescription, setAwardDescription] = useState("");

  const onChangeName = (e) => {
    setAwardName(e.target.value);
  };

  const onChangeDate = (e) => {
    setAwardDate(e.target.value);
  };

  const onChangeInstitution = (e) => {
    setAwardInstitution(e.target.value);
  };

  const onChangeDescription = (e) => {
    setAwardDescription(e.target.value);
  };

  const AddInput = () => {
    setIsToggle(true);

    setAwardName("");
    setAwardDate("");
    setAwardInstitution("");
    setAwardDescription("");
  };

  const fetchCert = async () => {
    try {
      const res = await Api.get("awards");
      const ownerData = res.data;
      setDbItem(ownerData);
    } catch (err) {
      console.log("사용자 데이터 불러오기에 실패하였습니다.", err);
    }
  };

  const userId = portfolioOwnerId;

  const handleSubmit = async (id) => {
    const item = dbItem.filter((item) => item._id === id)[0];

    if (item === undefined || item.isSave === false) {
      try {
        await Api.post(`award/`, {
          awardName,
          awardDate,
          awardInstitution,
          awardDescription,
        });

        setIsToggle(false);
        setIsEdit(false);

        fetchCert({ userId });

        setAwardName("");
        setAwardDate("");
        setAwardInstitution("");
        setAwardDescription("");
      } catch (err) {
        console.log("수상이력 추가에 실패하였습니다.", err);
      }
    } else {
      try {
        await Api.put(`award/${item._id}`, {
          awardName,
          awardDate,
          awardInstitution,
          awardDescription,
        });

        setIsToggle(false);
        setIsEdit(false);

        fetchCert({ userId });
      } catch (err) {
        console.log("수상이력 수정에 실패하였습니다.", err);
      }
    }
  };

  const handleEdit = (id) => {
    setDbItem((prevItems) => {
      return prevItems.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            isEdit: true,
          };
        } else {
          return item;
        }
      });
    });

    const item = dbItem.filter((item) => item._id === id)[0];
    setAwardName(item.awardName);
    setAwardDate(item.awardDate);
    setAwardInstitution(item.awardInstitution);
    setAwardDescription(item.awardDescription);

    setEditCurrentId(item.id);
    setIsEdit(true);
  };

  const handleCancel = () => {
    fetchCert({ userId });
    setIsToggle(false);
    setIsEdit(false);
  };

  const handleDelete = async (id) => {
    try {
      await Api.delete(`award/${id}`);

      fetchCert({ userId });
      setIsToggle(false);
      setIsEdit(false);
    } catch (err) {
      console.log("수상이력 삭제에 실패하였습니다.", err);
    }
  };

  useEffect(() => {
    fetchCert({ userId });
  }, [userId]);

  const formSendFunction = {
    handleSubmit,
    handleCancel,
    handleDelete,
    onChangeName,
    onChangeDate,
    onChangeInstitution,
    onChangeDescription,
  };
  const formSendcurrentData = {
    awardName,
    awardDate,
    awardInstitution,
    awardDescription,
    editCurrentId,
  };
  const pSendFunction = { handleEdit };
  const pSendIsFlag = { isEditable };

  return (
    <div>
      {dbItem.map((item) => (
        <div key={item._id}>
          {item.isSave === true && item.isEdit === false ? (
            <AwardP
              pSendFunction={pSendFunction}
              isFlag={pSendIsFlag}
              item={item}
            />
          ) : (
            <AwardForm
              formSendFunction={formSendFunction}
              currentData={formSendcurrentData}
              item={item}
            />
          )}
        </div>
      ))}

      {isToggle === true ? (
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
              type="date"
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
            <React.Fragment>
              <Button variant="primary" onClick={() => handleSubmit()}>
                확인
              </Button>
              <Button variant="secondary" onClick={() => handleCancel()}>
                취소
              </Button>
            </React.Fragment>
          </div>
        </div>
      ) : (
        ""
      )}

      {isEditable && (
        <div className="mb-3 text-center">
          <Button
            variant="primary"
            onClick={AddInput}
            disabled={isToggle || isEdit ? true : false}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default AwardDetail;
