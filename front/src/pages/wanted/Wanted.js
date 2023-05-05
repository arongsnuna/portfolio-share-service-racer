import React, { useEffect, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Badge, ListGroup, Button } from "react-bootstrap";

import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { Typography } from "@material-ui/core";

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

  const maxContentLength = 50; // 리스트에 표시할 최대 글자수

  // 게시글의 프리뷰를 보여주는 함수
  function getPreview(content) {
    if (content.length > maxContentLength) {
      return content.substring(0, maxContentLength) + "..."; // maxContentLength 길이만큼만 자르고 "..." 문자열 추가
    }
    return content; // maxContentLength보다 짧은 경우 그대로 반환
  }

  //페이지 경로에 따라 배경색이 달라짐
  useEffect(() => {
    const { pathname } = window.location;
    if (pathname === "/" || pathname === "/network" || pathname === "/wanted") {
      document.body.classList.add("portfolio");
    } else {
      document.body.classList.remove("portfolio");
    }
    // cleanup 함수
    return () => {
      document.body.classList.remove("portfolio");
    };
  }, [window.location]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    try {
      // "wantedlist" 엔드포인트로 GET 요청을 하고, wantedList response의 data로 세팅함.
      Api.get("wanted").then((res) => setWantedList(res.data));
    } catch (err) {
      if (err.response.status === 400) {
        alert(err.response.data.error);
      }
      console.log("wantedList를 불러오는데 실패했습니다.", err);
    }
  }, [userState, navigate]);

  return (
    <Container>
      <Row>
        <Col xs={12} className="text-left text-center">
          <h3 className="mt-5" style={{ color: "white" }}>
            Check the <span style={{ backgroundColor: "#8FC382" }}>“wanted”</span> board and join the project.
            <br />
            Or you can recruit your own team members.
          </h3>
          <p className="mb-5" style={{ color: "white" }}>
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
              action
              key={item._id}
              as="li"
              className="d-flex justify-content-between align-items-start"
              onClick={() => navigate("/wanted/read", { state: { wanted: item } })}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.wantedTitle}</div>
                {getPreview(item.wantedContent)}
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
