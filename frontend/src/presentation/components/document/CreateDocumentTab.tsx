import addIcon from "../../../assets/icons/add-icon.svg";
interface CreateDocumentTabProps {
  onClick: () => void;
}

function CreateDocumentTab(props: CreateDocumentTabProps) {
  return (
    <div
      onClick={props.onClick}
      className="border-1 border-gray-400 bg-gray-50 rounded w-40 h-40 flex flex-col justify-center items-center cursor-pointer"
    >
      <img src={addIcon} alt="Add icon" className="w-16 h-16 text-gray-600" />
      <p>Add document</p>
    </div>
  );
}

export default CreateDocumentTab;
