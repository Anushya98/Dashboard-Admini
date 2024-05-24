import { Button } from "@/components/ui/button";

const CsvButtons = ({ onTemplateClick, onUploadClick }) => (
  <div className="flex gap-4">
    <Button
      variant="primary"
      className="bg-white text-darkBlue rounded-3xl border border-blue-500"
      onClick={onTemplateClick}
    >
      CSV Template
    </Button>
    <Button
      variant="primary"
      className="bg-white text-darkBlue rounded-3xl border border-blue-500"
      onClick={onUploadClick}
    >
      CSV Upload
    </Button>
  </div>
);

export default CsvButtons;
