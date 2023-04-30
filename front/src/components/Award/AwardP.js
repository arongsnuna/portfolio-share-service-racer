import { Button } from "react-bootstrap";

function AwardP({ pSendFunction, isFlag, item }) {
  const { handleEdit } = pSendFunction;
  const { isEditable } = isFlag;

  return (
    <div>
      <p>
        {item.awardName}
        <br />
        {item.awardDate}
        <br />
        {item.awardInstitution}
        <br />
        {item.awardDescription}
        <br />
      </p>
      <br />
      {isEditable && (
        <Button
          className="position-absolute end-0 translate-middle"
          variant="outline-info"
          onClick={() => handleEdit(item._id)}
        >
          편집
        </Button>
      )}
      <br />
      <hr className="one" />
    </div>
  );
}

export default AwardP;
