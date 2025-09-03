import { useState } from "react";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";
import type { DocumentCreate } from "../../../domain/model/document-model";

interface CreateDocumentDialogProps {
  saveDocument: (documentData: DocumentCreate) => void;
}

function CreateDocumentDialog(props: CreateDocumentDialogProps) {
  const [documentName, setDocumentName] = useState("");
  const [content, setContent] = useState("");
  //   const { createDocument } = useDocument();

  const onSave = () => {
    // createDocument({ name: documentName, content: content });
    props.saveDocument({ name: documentName, content: content });
    setDocumentName("");
    setContent("");
  };

  return (
    <div className="shadow px-10 py-5 mt-10 bg-white mr-10 rounded flex flex-col">
      <InputField
        value={documentName}
        onValueChange={setDocumentName}
        placeholder="Enter a document name"
        label="Document name"
        width="w-1/2"
        paddingY="py-3"
        paddingX="px-3"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-1/2 mt-10 border-2 border-gray-200 rounded px-3 py-3 h-50"
        placeholder="Enter your document content"
      ></textarea>
      <div className="flex justify-end w-1/2 mt-5">
        <PrimaryButton
          text="Save"
          onClick={onSave}
          width="w-50"
          height="h-10"
        />
      </div>
    </div>
  );
}

export default CreateDocumentDialog;
