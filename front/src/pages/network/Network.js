import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from '../../components/user/UserCard';
import { UserStateContext } from '../../App';

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);
    // useState 훅을 통해 userImageUrl 상태를 생성함.

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }
        try {
            // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
            Api.get('user/userlist').then((res) => setUsers(res.data));
        } catch (err) {
            if (err.response.status === 400) {
                alert('err.response.data.error');
            }
            console.log('유저 목록을 불러오는데 실패하였습니다.', err);
        }
    }, [userState, navigate]);

    return (
        <Container fluid>
            <Row xs='auto' className='jusify-content-center'>
                {users.map((user) => (
                    <React.Fragment key={user._id}>
                        {user.userImage ? (
                            <UserCard user={user} isNetwork userImageUrl={user.userImage.imageUri} />
                        ) : (
                            <UserCard user={user} isNetwork userImageUrl={'http://placekitten.com/200/200'} />
                        )}
                    </React.Fragment>
                ))}
            </Row>
        </Container>
    );
}

export default Network;
