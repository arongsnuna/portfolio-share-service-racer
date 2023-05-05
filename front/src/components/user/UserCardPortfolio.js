import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';

function UserCardPortfolio({ user, setIsEditing, isEditable, isNetwork, userImageUrl }) {
    const navigate = useNavigate();

    if (userImageUrl === undefined) {
        userImageUrl = 'http://placekitten.com/200/200';
    }

    return (
        <Row>
            <Col xs={2}>
                <Card.Img
                    style={{ width: '10rem', height: '8rem', borderRadius: '70%', overflow: 'hidden' }}
                    className='mb-3'
                    // src='http://placekitten.com/200/200'
                    src={userImageUrl}
                    alt='랜덤 고양이 사진 (http://placekitten.com API 사용)'
                />
            </Col>
            <Col xs={7} className='d-flex flex-column justify-content-center'>
                <Row className='justify-content-left'>
                    <Col xs={2}>
                        <Card.Title>{user?.name}</Card.Title>
                    </Col>
                    <Col xs={2}>
                        <Card.Subtitle className='mt-1 text-muted'>{user?.email}</Card.Subtitle>
                    </Col>
                </Row>
                <Row>
                    <Card.Text className='mb-2 text-muted'>{user?.description}</Card.Text>
                </Row>
            </Col>
            <Col className='mt-3 text-center text-info'>
                {(!user?.gitLink || user?.gitLink !== 'undefined') && (
                    <Button style={{ backgroundColor: '#2a3741', border: 'none', width: '80px' }}>GitLink</Button>
                )}
                {isEditable && (
                    <Col>
                        <Row className='mt-3 text-center text-info'>
                            <Col>
                                <Button
                                    style={{ backgroundColor: '#2a3741', border: 'none', width: '80px' }}
                                    onClick={() => setIsEditing(true)}>
                                    편집
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                )}

                {isNetwork && (
                    <Row>
                        <Card.Link className='mt-3' href='#' onClick={() => navigate(`/user/${user._id}`)}>
                            포트폴리오
                        </Card.Link>
                    </Row>
                )}
            </Col>
        </Row>
    );
}

export default UserCardPortfolio;
