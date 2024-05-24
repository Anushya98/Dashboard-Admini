import { Button } from "@/components/ui/button";

const CreateNewRequestButton = ({ onClick }) => (
  <Button
    variant="primary"
    className="bg-white text-darkBlue rounded-3xl border border-blue-500"
    onClick={onClick}
  >
    + Create New Request
  </Button>
);

export default CreateNewRequestButton;
