import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, ListGroup, Button } from "react-bootstrap";

import * as Api from "../../api";
import { UserStateContext } from "../../App";

const CommentCount = ({ wantedId }) => {
  const [count, setCount] = useState(0);
  const fetchWantedCommentLength = useCallback(async () => {
    const res = await Api.get(`comment/${wantedId}`);
    const commentLength = res.data.length;
    setCount(commentLength);
  }, [wantedId]);

  useEffect(() => {
    fetchWantedCommentLength();
  }, [fetchWantedCommentLength]);
  return <>{count}</>;
};

function Wanted() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [wantedList, setWantedList] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "wantedlist" 엔드포인트로 GET 요청을 하고, wantedList response의 data로 세팅함.
    Api.get("wanted").then((res) => setWantedList(res.data));
  }, [userState, navigate]);
  console.log(wantedList);
  return (
    <Container>
      <Row>
        <Col className="text-left">
          <h3>팀원 구하기</h3>
          <p>
            팀원 모집을 확인하고 프로젝트에 참여해보세요.
            <br />
            원하는 프로젝트가 없을 경우 직접 팀원을 모집할 수 있어요.
          </p>
        </Col>
        <Col className="position-relative">
          <Button
            className="m-3 position-absolute bottom-0 end-0"
            variant="primary"
            onClick={() => navigate("/wanted/create")}
          >
            게시글 작성
          </Button>
        </Col>
      </Row>
      <Row>
        <ListGroup>
          {wantedList.map((item) => (
            <ListGroup.Item
              key={item._id}
              as="li"
              className="d-flex justify-content-between align-items-start"
              onClick={() =>
                navigate("/wanted/read", { state: { wanted: item } })
              }
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.wantedTitle}</div>
                {item.wantedContent}
              </div>
              <Badge bg="primary" pill>
                <CommentCount wantedId={item._id} />
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
}

export default Wanted;
