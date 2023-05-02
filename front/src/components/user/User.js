import React, { useState, useEffect } from 'react';
import UserEditForm from './UserEditForm';
import UserCard from './UserCard';
import * as Api from '../../api';

function User({ portfolioOwnerId, isEditable }) {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [user, setUser] = useState(null);
    // useState 훅을 통해 userImageUrl 상태를 생성함.
    const [userImageUrl, setUserImageUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
            const res = await Api.get('users', portfolioOwnerId);
            setUser(res.data.userInfo);
            setUserImageUrl(res.data.imagePath);
        }
        fetchData();
    }, [portfolioOwnerId]);

    return (
        <>
            {isEditing ? (
                <UserEditForm user={user} setIsEditing={setIsEditing} setUser={setUser} />
            ) : (
                <UserCard user={user} setIsEditing={setIsEditing} isEditable={isEditable} userImageUrl={userImageUrl} />
            )}
        </>
    );
}

export default User;
