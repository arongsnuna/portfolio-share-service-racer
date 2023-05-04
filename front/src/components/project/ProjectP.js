import { Button, Table } from 'react-bootstrap';

function ProjectP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <div>
            <Table bordered className='container-fluid'>
                <tbody>
                    <tr>
                        <td className='col-1'>프로젝트 명</td>
                        <td className='col-3'>{item.projectName}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>프로젝트 시작일자</td>
                        <td className='col-3'>{item.projectStartDate}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>프로젝트 종료일자</td>
                        <td className='col-3'>{item.projectEndDate}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>프로젝트 설명</td>
                        <td className='col-3'>{item.projectDescription}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>프로젝트 GitLink</td>
                        <td className='col-3'>
                            <a href={`https://${item.projectGitLink}`}>{item.projectGitLink}</a>
                        </td>
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

export default ProjectP;
