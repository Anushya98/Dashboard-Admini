import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card"; // Assuming you have a Card component
import ArrowLeftIcon from "@/assets/icons/ArrowLeft.svg";
import ArrowRightIcon from "@/assets/icons/ArrowRight.svg";
import ClockIcon from "@/assets/icons/clock.svg";
import SearchInput from "./search-input";
import ApplyForm from "@/modules/hr/LeaveFile/ApplyLeave";
import ViewQuiz from "@/modules/Training/Quizzes/ViewQuiz";

const QuizTable = ({
    heading,
    categories,
    inputType = "search",
    showControlHeader = true,
    onRequestQuiz, // Receive the prop
}) => {
    const [search, setSearch] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const [cardIndex, setCardIndex] = useState(
        Object.keys(categories).reduce((acc, category) => {
            acc[category] = 0;
            return acc;
        }, {})
    );

    const handleNext = (category) => {
        setCardIndex((prevIndex) => ({
            ...prevIndex,
            [category]:
                (prevIndex[category] + 1) % (categories[category].length - 2),
        }));
    };

    const handlePrev = (category) => {
        setCardIndex((prevIndex) => ({
            ...prevIndex,
            [category]:
                (prevIndex[category] - 1 + categories[category].length) % (categories[category].length - 2),
        }));
    };

    const openViewQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setIsOpen(true);
    };

    const renderCards = (category) => {
        const startIndex = cardIndex[category];
        const cardsToShow = categories[category].slice(startIndex, startIndex + 3);
        return (
            <div className="flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handlePrev(category)}>
                    <img src={ArrowLeftIcon} alt="arrowleft" className="w-6 h-6 hover-stroke-darkBlue stroke-darkblue" />
                </Button>
                <div className="flex space-x-4 justify-center">
                    {cardsToShow.map((quiz) => (
                        <Card key={quiz.id} className="w-64 border border-gray-300 p-4 flex flex-col items-center">
                            <div className="flex items-center justify-center gap-2">
                                <img src={ClockIcon} alt="clock" className="w-5 h-5" />
                                <span className="text-sm text-darkBlue">{quiz.difficulty}</span>
                            </div>
                            <h3 className="text-lg font-semibold my-2 text-darkBlue">{quiz.title}</h3>
                            <div className="flex gap-4 text-darkBlue">
                                <p className="text-sm">Questions: {quiz.questions}</p>
                                <p className="text-sm">Time: {quiz.time}</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-4 w-[100%] text-white bg-darkBlue" onClick={() => openViewQuiz(quiz)}>
                                View
                            </Button>
                        </Card>
                    ))}
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleNext(category)}>
                    <img src={ArrowRightIcon} alt="arrowright" className="w-6 h-6" />
                </Button>
            </div>
        );
    };

    return (
        <section className="border bg-white rounded-2xl " style={{ alignSelf: "center" }}>
            {showControlHeader && (
                <div className="flex items-center justify-between py-3 px-[2rem] bg-darkBlue rounded-2xl rounded-b-none">
                    <p className="text-white font-medium">{heading}</p>
                    <div className="flex gap-10">
                        <Button variant="primary" className="bg-white text-muted-foreground rounded-3xl" onClick={onRequestQuiz}>
                            Request Quiz on Topic
                        </Button>
                        {inputType === "search" && (
                            <SearchInput value={globalFilter ?? ""} onSearch={(value) => setGlobalFilter(String(value))} />
                        )}
                    </div>
                </div>
            )}
            <div className="space-y-8 ">
                {Object.keys(categories).map((category) => (
                    <div key={category}>
                        <h2 className="text-xl font-semibold mb-4 bg-customBlue p-4">{category}</h2>
                        {renderCards(category)}
                    </div>
                ))}
            </div>
            {isOpen && selectedQuiz && (
                <ViewQuiz
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    quizData={selectedQuiz}
                />
            )}
        </section>
    );
};

export default QuizTable;
