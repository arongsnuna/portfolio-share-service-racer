import { Button } from 'react-bootstrap';

function ProjectP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable } = isFlag;

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

export default ProjectP;
