import { Button } from "react-bootstrap";

function StackP({ pSendFunction, isFlag, item }) {
  const { handleEdit } = pSendFunction;
  const { isEditable } = isFlag;

  return (
    <div>
      <p>
        {item.stackName}
        <br />
        {item.stackDescription}
        <br />
      </p>
      <br />
      {isEditable && (
        <Button
          className="position-absolute end-0 translate-middle"
          variant="outline-primary"
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

export default StackP;
