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
                <Button className='position-absolute end-0 translate-middle' variant='outline-primary' onClick={() => handleEdit(item._id)}>
                    Edit
                </Button>
            )}
            <br />
            <hr className='one' />
        </div>
    );
}

export default CertificateP;
