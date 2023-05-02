import { Button } from 'react-bootstrap';

// EducationItem -> 컴포넌트 명을 보고 어떤 컴포넌트인지 파악하기 쉽게
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

export default EducationP;
