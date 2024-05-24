import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function ApprovalExpandForm({ rowData, onOk }) {
    const { handleSubmit, formState } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here
        onOk(); // Call the onOk callback to go back to the approval form
    };

    return (
        <section className="border bg-white rounded-2xl" style={{ alignSelf: "center" }}>
            <div className="p-4 bg-darkBlue rounded-2xl rounded-b-none ">
                <h3 className="text-white font-medium">Add Detail</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-4">
                <div className="flex justify-evenly">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-8">
                            <p className="font-semibold">Reminder Name:</p>
                            <p>{rowData.complaint_id}</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="font-semibold">Type:</p>
                            <p>{rowData.name}</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="font-semibold">From Person:</p>
                            <p>{rowData.department}</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="font-semibold">To Person:</p>
                            <p>{rowData.complaint_details}</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="font-semibold">Time:</p>
                            <p>{rowData.time}</p>
                        </div>
                        <div className="flex gap-8">
                            <p className="font-semibold">Status:</p>
                            <p>{rowData.status}</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-8 mt-4">
                    <Button type="submit" className="bg-darkBlue text-white hover:bg-transparent hover:border-darkBlue hover:text-darkBlue rounded-3xl" variant="outline" disabled={!formState.isValid}>
                        ok
                    </Button>
                </div>
            </form>
        </section>
    );
}
