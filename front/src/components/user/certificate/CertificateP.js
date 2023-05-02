import { Button } from 'react-bootstrap';

function CertificateP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable } = isFlag;

    return (
        <div>
            <p>
                {item.certName}
                <br />
                {item.certAcDate}
                <br />
            </p>
            <br />
            {isEditable && (
                <Button
                    className='position-absolute top-60 start-50 translate-middle'
                    variant='outline-info'
                    onClick={() => handleEdit(item._id)}>
                    편집
                </Button>
            )}
            <br />
            <hr className='one' />
        </div>
    );
}

export default CertificateP;
