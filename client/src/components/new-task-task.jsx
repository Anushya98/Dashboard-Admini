import { Button } from "@/components/ui/button";

const CreateNewTaskButton = ({ onClick }) => (
  <Button
    variant="primary"
    className="bg-white text-darkBlue rounded-3xl border border-blue-500"
    onClick={onClick}
  >
    + Create New Task
  </Button>
);

export default CreateNewTaskButton;
