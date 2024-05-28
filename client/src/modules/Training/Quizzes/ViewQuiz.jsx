import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import QuizIcon from "@/assets/icons/quiz.svg";
import ClockIcon from "@/assets/icons/clock.svg";


export default function ViewQuiz({ isOpen, setIsOpen, quizData }) {
    const { handleSubmit, formState } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogContent className=" p-0 border-none w-[55%] bg-white" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
                <div className="p-4 bg-darkBlue rounded-md rounded-b-none">
                    <h3 className="text-white font-medium">{quizData.title}</h3>
                </div>
                <div className="flex items-center gap-4 pl-8">
                    <div className="bg-darkBlue rounded-3xl w-8 h-8 flex justify-center ">
                        <img src={QuizIcon} alt="quiz" className="w-3 " />
                    </div>
                    <p>{quizData.title}</p>
                </div>
                <div className="flex items-center gap-4 pl-8">
                    <img src={ClockIcon} alt="clock" className="w-6 " />
                    <p>Last Updated On </p>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-evenly">
                        <div className="flex flex-col pr-4 ">
                            <p className="text-base pb-2">Number Of Questions:</p>
                            <p className="text-base pb-2">Time:</p>
                            <p className="text-base pb-2">Level Of Quiz:</p>
                            <p className="text-base pb-2">Topic Covered:</p>
                        </div>
                        <div className="flex flex-col items-start pl-4 ">
                            <p className="text-base pb-2">{quizData.questions}</p>
                            <p className="text-base pb-2">{quizData.time}</p>
                            <p className="text-base pb-2">{quizData.difficulty}</p>
                            <p className="text-base pb-2">{quizData.questions}</p> {/* This seems like a mistake. Should it be a different property? */}
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <button className="mt-4 bg-darkBlue text-white px-4 py-2 rounded-3xl">
                            Take Quiz
                        </button>
                    </div>
                </div>
                <div className="flex justify-evenly">
                    <div className="flex gap-8">
                        <p>People Taken:</p>
                        <p>1212</p>
                    </div>
                    <div className="flex gap-8">
                        <p>Average Score:</p>
                        <p>87%</p>
                    </div>
                </div>
                <div >
                    <h2 className="text-sm text-darkBlue font-semibold mb-4 bg-customBlue p-4">
                        Description
                    </h2>

                </div>
                <div className="flex">
                    <div className="w-1/2 p-4">
                        <h3 className="text-lg font-semibold">{quizData.title}</h3>
                        <p className="mt-2">{quizData.description}</p>
                    </div>
                    <div className="w-1/2 p-4">
                        <div className="bg-white shadow  rounded-md flex gap-2">
                            <h3 className="text-sm font-semibold p-8 flex justify center bg-customBlue">Source</h3>
                            <div>
                                <p className="mt-2">{quizData.sourceName}</p>
                                <p className="mt-2"> {quizData.source}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-8 p-4">
                    <Button
                        type="submit"
                        className="bg-darkBlue text-white rounded-3xl border-white hover:bg-white hover:border-darkBlue hover:text-darkBlue "
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                    >
                        File
                    </Button>
                    <Button
                        type="button"
                        className="border-darkBlue rounded-3xl text-darkBlue hover:bg-darkBlue hover:border-white hover:text-white"
                        variant="outline"
                    // onClick={() => setIsOpen(false)}
                    >
                        Flash Card
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
}
