import { Button, Table } from 'react-bootstrap';

function CertificateP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <div>
            <Table bordered className='container-fluid'>
                <tbody>
                    <tr>
                        <td className='col-1'>자격증 명</td>
                        <td className='col-3'>{item.certName}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>취득일자</td>
                        <td className='col-3'>{item.certAcDate}</td>
                    </tr>
                </tbody>
            </Table>
            <br />
            {isEditable && (
                <Button
                    className='position-absolute top-60 start-50 translate-middle'
                    variant='outline-info'
                    onClick={() => handleEdit(item._id)}
                    disabled={isToggle || isEdit ? true : false}>
                    편집
                </Button>
            )}
            <br />
            <hr className='one' />
        </div>
    );
}

export default CertificateP;
