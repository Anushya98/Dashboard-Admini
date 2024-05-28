import React, { useState } from "react";
import QuizTable from "@/components/QuizTable";
import QuizCharts from "./QuizCharts";

const quizData = {
    "Mandatory Quiz (Pending)": [
        { id: 1, title: "Mandatory Quiz 1", difficulty: "Easy", questions: 20, time: "30 mins", description: "This quiz covers the basics of the subject and ensures foundational understanding.", sourceName: "Quiz Source A", source: "www.quizsourcea.com" },
        { id: 2, title: "Mandatory Quiz 2", difficulty: "Medium", questions: 25, time: "35 mins", description: "This quiz delves deeper into the subject with more challenging questions.", sourceName: "Quiz Source B", source: "www.quizsourceb.com" },
        { id: 3, title: "Mandatory Quiz 3", difficulty: "Tough", questions: 30, time: "40 mins", description: "An advanced quiz designed to test in-depth knowledge and application.", sourceName: "Quiz Source C", source: "www.quizsourcec.com" },
        { id: 4, title: "Mandatory Quiz 4", difficulty: "Easy", questions: 15, time: "25 mins", description: "A short quiz focusing on the key concepts and quick assessments.", sourceName: "Quiz Source D", source: "www.quizsourced.com" },
    ],
    "Your Quiz": [
        { id: 1, title: "Your Quiz 1", difficulty: "Medium", questions: 20, time: "30 mins", description: "A personal quiz to evaluate your understanding and preparation.", sourceName: "Quiz Source E", source: "www.quizsourcee.com" },
        { id: 2, title: "Your Quiz 2", difficulty: "Tough", questions: 25, time: "35 mins", description: "A challenging quiz to push your limits and test your knowledge.", sourceName: "Quiz Source F", source: "www.quizsourcef.com" },
        { id: 3, title: "Your Quiz 3", difficulty: "Easy", questions: 30, time: "40 mins", description: "A longer quiz designed for thorough review and practice.", sourceName: "Quiz Source G", source: "www.quizsourceg.com" },
        { id: 4, title: "Your Quiz 4", difficulty: "Medium", questions: 15, time: "25 mins", description: "A balanced quiz to keep your skills sharp and evaluate progress.", sourceName: "Quiz Source H", source: "www.quizsourceh.com" },
    ],
    "Most Recent Quiz": [
        { id: 1, title: "Recent Quiz 1", difficulty: "Tough", questions: 20, time: "30 mins", description: "The latest quiz with updated questions and content.", sourceName: "Quiz Source I", source: "www.quizsourcei.com" },
        { id: 2, title: "Recent Quiz 2", difficulty: "Easy", questions: 25, time: "35 mins", description: "An introductory quiz to familiarize with the newest topics.", sourceName: "Quiz Source J", source: "www.quizsourcej.com" },
        { id: 3, title: "Recent Quiz 3", difficulty: "Medium", questions: 30, time: "40 mins", description: "A quiz that mixes difficulty levels to provide a comprehensive test.", sourceName: "Quiz Source K", source: "www.quizsourcek.com" },
        { id: 4, title: "Recent Quiz 4", difficulty: "Tough", questions: 15, time: "25 mins", description: "A tough quiz designed to challenge and improve your skills.", sourceName: "Quiz Source L", source: "www.quizsourcel.com" },
    ],
    "Trending": [
        { id: 1, title: "Trending Quiz 1", difficulty: "Easy", questions: 20, time: "30 mins", description: "A popular quiz with high engagement and positive feedback.", sourceName: "Quiz Source M", source: "www.quizsourcem.com" },
        { id: 2, title: "Trending Quiz 2", difficulty: "Medium", questions: 25, time: "35 mins", description: "This trending quiz offers a mix of easy and challenging questions.", sourceName: "Quiz Source N", source: "www.quizsourcen.com" },
        { id: 3, title: "Trending Quiz 3", difficulty: "Tough", questions: 30, time: "40 mins", description: "A difficult but popular quiz known for its thorough content.", sourceName: "Quiz Source O", source: "www.quizsourceo.com" },
        { id: 4, title: "Trending Quiz 4", difficulty: "Easy", questions: 15, time: "25 mins", description: "An easy quiz that is currently trending for its engaging format.", sourceName: "Quiz Source P", source: "www.quizsourcep.com" },
    ],
};

const QuizPage = () => {
    const [showCharts, setShowCharts] = useState(false); // State to control rendering of QuizCharts

    const handleRequestQuiz = () => {
        setShowCharts(true);
    };

    const handleBack = () => {
        setShowCharts(false);
    };

    return (
        <div className="py-3 px-[2rem]">
            {showCharts ? (
                <QuizCharts onBack={handleBack} />
            ) : (
                <QuizTable
                    heading="Quiz Management"
                    categories={quizData}
                    inputType="search"
                    showControlHeader={true}
                    onRequestQuiz={handleRequestQuiz}
                />
            )}
        </div>
    );
};

export default QuizPage;
