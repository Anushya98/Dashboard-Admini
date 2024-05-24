import { Button } from "@/components/ui/button";

const CreateNewUserButton = ({ onClick }) => (
  <Button
    variant="primary"
    className="bg-white text-darkBlue rounded-3xl border border-blue-500"
    onClick={onClick}
  >
    + Create New User
  </Button>
);

export default CreateNewUserButton;
