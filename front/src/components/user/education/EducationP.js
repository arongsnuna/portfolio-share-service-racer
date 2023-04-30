import { Button } from 'react-bootstrap';

function EducationP({ pSendFunction, isFlag, item }) {
    const { handleEdit } = pSendFunction;
    const { isEditable } = isFlag;

    return (
        <div>
            <p>
                {item.eduSchool}
                <br />
                {item.eduMajor}
                <br />
                {item.eduEnterDate}
                <br />
                {item.eduGraduateDate}
                <br />
                {item.eduDegree}
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

export default EducationP;
