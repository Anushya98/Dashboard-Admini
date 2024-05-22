import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

export default function PreviewForm({ isOpen, setIsOpen }) {
    const { handleSubmit, formState } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className="p-0 border-none min-w-[500px]" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="p-4 bg-darkBlue rounded-md rounded-b-none">
                    <h3 className="text-white font-medium">Personal Information Preview</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4">
                    <div className="flex justify-evenly">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-8">
                                <p className="font-semibold">Name:</p>
                                <p>Anu</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Phone Number:</p>
                                <p>+919696854879</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">WhatsApp Number:</p>
                                <p>+919696854879</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Department:</p>
                                <p>Quality</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Designation:</p>
                                <p>Full Day</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Blood Group:</p>
                                <p>Pending</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Personal Email:</p>
                                <p>Pending</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Official Email:</p>
                                <p>Pending</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Address:</p>
                                <p>Pending</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Employee ID:</p>
                                <p>Pending</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Date Of Joining:</p>
                                <p>Pending</p>
                            </div>
                            <div className="flex gap-8">
                                <p className="font-semibold">Qualification:</p>
                                <p>Pending</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-md bg-gray-300 flex items-center justify-center mb-4">
                                <img src="profile.jpg" alt="Profile" className="w-20 h-20 rounded-md" />
                            </div>
                            <div>
                                <p className="font-semibold text-center">Name: John Doe</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-8 mt-4">
                        <Button type="submit" className="bg-darkBlue text-white hover:bg-transparent hover:border-darkBlue hover:text-darkBlue rounded-3xl" variant="outline" disabled={!formState.isValid}>
                            Save
                        </Button>
                        <Button type="button" className="border-darkBlue text-darkBlue hover:bg-darkBlue hover:text-white rounded-3xl" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
