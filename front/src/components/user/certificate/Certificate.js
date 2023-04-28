import React from 'react';
import { Card, Row } from 'react-bootstrap';
import CertificateDetail from './CertificateDetail';

function CertificateCreate({ portfolioOwnerId }) {
    return (
        <Card className='ms-3' style={{ width: '100%' }}>
            <Card.Title className='ms-3 mt-3'>자격증</Card.Title>
            <Card.Body>
                <Row>
                    <div>
                        <CertificateDetail portfolioOwnerId={portfolioOwnerId} />
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default CertificateCreate;
