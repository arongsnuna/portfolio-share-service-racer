import React from 'react';
import { Card, Row } from 'react-bootstrap';
import ProjectDetail from './ProjectDetail';

function ProjectCreate({ portfolioOwnerId, isEditable }) {
    return (
        <Card className='mb-2 ms-3 mr-5' style={{ width: '100%' }}>
            <Card.Title className='ms-3 mt-3'>프로젝트</Card.Title>
            <Card.Body>
                <Row>
                    <div>
                        <ProjectDetail portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ProjectCreate;
