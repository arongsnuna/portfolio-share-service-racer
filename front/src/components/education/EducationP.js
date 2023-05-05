import { Button, Table } from 'react-bootstrap';

// EducationItem -> 컴포넌트 명을 보고 어떤 컴포넌트인지 파악하기 쉽게
function EducationP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <div>
            <Table bordered className='container-fluid'>
                <tbody>
                    <tr>
                        <td className='col-1'>학교이름</td>
                        <td className='col-3'>{item.eduSchool}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>전공</td>
                        <td className='col-3'>{item.eduMajor}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>입학일자</td>
                        <td className='col-3'>{item.eduEnterDate}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>졸업일자</td>
                        <td className='col-3'>{item.eduGraduateDate ? item.eduGraduateDate : '없음'}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>학위</td>
                        <td className='col-3'>{item.eduDegree}</td>
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

export default EducationP;
