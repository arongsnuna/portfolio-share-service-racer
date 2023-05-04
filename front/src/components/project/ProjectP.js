import { Button } from 'react-bootstrap';

function ProjectP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable, isToggle, isEdit } = isFlag;

    return (
        <div>
            <p>
                {item.projectName}
                <br />
                {item.projectStartDate}
                <br />
                {item.projectEndDate}
                <br />
                {item.projectDescription}
                <br />
                <a href={`https://${item.projectGitLink}`}>{item.projectGitLink}</a>
            </p>
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
