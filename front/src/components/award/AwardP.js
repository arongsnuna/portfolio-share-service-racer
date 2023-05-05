import { Button, Table } from 'react-bootstrap';

function AwardP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <div>
            <Table bordered className='container-fluid'>
                <tbody>
                    <tr>
                        <td className='col-1'>수상명</td>
                        <td className='col-3'>{item.awardName}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>수상일자</td>
                        <td className='col-3'>{item.awardDate}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>수상기관</td>
                        <td className='col-3'>{item.awardInstitution}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>수여내용</td>
                        <td className='col-3'>{item.awardDescription}</td>
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

export default AwardP;
