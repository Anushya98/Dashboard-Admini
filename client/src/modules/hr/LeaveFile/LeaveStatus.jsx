import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

export default function LeaveStatus({ isOpen, setIsOpen }) {
    const { handleSubmit, formState } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} >
            <DialogContent className="p-0 border-none" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="p-4 bg-darkBlue rounded-lg rounded-b-none">
                    <h3 className="text-white font-medium">Leave Application Status</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4 ">
                    <div className="flex items-center justify-center gap-4">
                        {/* Profile Picture */}
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <img src="profile.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                        </div>
                        {/* Name and Position */}
                        <div>
                            <p className="font-semibold">Name: John Doe</p>
                            <p className="font-normal"> Developer</p>
                            <p className="font-normal"> John Doe has 10 leaves reamining</p>
                        </div>
                    </div>
                    {/* Leave Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-4">
                            <p className="font-semibold">Leave Type:</p>
                            <p>Casual Leave</p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">Days:</p>
                            <p>2024-05-20 to 2024-05-22</p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">Reason:</p>
                            <p>Family function</p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">Leave Type:</p>
                            <p>Casual Leave</p>
                        </div>
                        <div className="flex gap-4">
                            <p className="font-semibold">Type:</p>
                            <p>Full Day</p>
                        </div>

                        <div className="flex gap-4">
                            <p className="font-semibold">Status:</p>
                            <p>Pending</p>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-center gap-8">
                        <Button type="submit" className="bg-darkBlue hover:bg-blue-600" disabled={!formState.isValid}>
                            Approve
                        </Button>
                        <Button type="button" className="border-darkBlue text-darkBlue" variant="outline" onClick={() => setIsOpen(false)}>
                            Reject
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
