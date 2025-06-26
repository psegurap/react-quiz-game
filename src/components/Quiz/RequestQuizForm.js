import { useEffect, useState } from "react";
import axios from "axios";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NumberInput, SelectDropdown } from "../form-elements/FormElements";
import Spinner from "../UI/Spinner";
import InfoOnly from "../UI/modals/InfoOnly";

export default function RequestQuizForm(props) {
    // Select Options
    const categories = [
        { value: "9", name: "General Knowledge" },
        { value: "10", name: "Entertainment: Books" },
        { value: "11", name: "Entertainment: Film" },
        { value: "12", name: "Entertainment: Music" },
        { value: "13", name: "Entertainment: Musicals & Theatres" },
        { value: "14", name: "Entertainment: Television" },
        { value: "15", name: "Entertainment: Video Games" },
        { value: "16", name: "Entertainment: Board Games" },
        { value: "17", name: "Science & Nature" },
        { value: "18", name: "Science: Computers" },
        { value: "19", name: "Science: Mathematics" },
        { value: "20", name: "Mythology" },
        { value: "21", name: "Sports" },
        { value: "22", name: "Geography" },
        { value: "23", name: "History" },
        { value: "24", name: "Politics" },
        { value: "25", name: "Art" },
        { value: "26", name: "Celebrities" },
        { value: "27", name: "Animals" },
        { value: "28", name: "Vehicles" },
        { value: "29", name: "Entertainment: Comics" },
        { value: "30", name: "Science: Gadgets" },
        { value: "31", name: "Entertainment: Japanese Anime & Manga" },
        { value: "32", name: "Entertainment: Cartoon & Animations" },
    ];

    const difficulties = [
        { value: "easy", name: "Easy" },
        { value: "medium", name: "Medium" },
        { value: "hard", name: "Hard" },
    ];

    const types = [
        { value: "multiple", name: "Multiple Choice" },
        { value: "boolean", name: "True / False" },
    ];

    const [amount, setAmount] = useState(10);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [type, setType] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({
        heading: "",
        message: "",
    });

    // Use useEffect to generate the request URL.
    useEffect(() => {
        let generated_url = "https://opentdb.com/api.php?";

        amount > 0
            ? (generated_url = `${generated_url}amount=${amount}&`)
            : (generated_url = `${generated_url}amount=0&`);
        if (category !== "")
            generated_url = `${generated_url}category=${category}&`;
        if (difficulty !== "")
            generated_url = `${generated_url}difficulty=${difficulty}&`;
        if (type !== "") generated_url = `${generated_url}type=${type}`;

        setApiUrl(generated_url);
    }, [amount, category, difficulty, type]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSetIsSearching(true); //Show loading spinner

        // Use 'axios' to make request.
        axios.get(apiUrl).then((response) => {
            let questions = response.data.results;
            if (!response.data.response_code) {
                // Generate unique ids for each question.
                let questions_ids = [];
                while (questions_ids.length < questions.length) {
                    let id = Math.floor(Math.random() * 100) + 1;
                    if (questions_ids.indexOf(id) === -1)
                        questions_ids.push(id);
                }

                // Add additional values to incoming questions.
                questions.map((question) => {
                    question["id"] = questions_ids.pop();
                    question["answer"] = "";
                    question["result"] = "";
                    return question;
                });
                props.onSetQuestions(questions);
                props.onSetIsSearching(false);
                props.onSetIsPlaying(true);
            } else {
                props.onSetQuestions(questions);
                props.onSetIsSearching(false);
                props.onSetIsPlaying(false);
                setModalDetails({
                    heading: "0 Result Returned",
                    message:
                        'No results were found with the parameters specified. Try changing the "difficulty" or the "type" dropdowns.',
                });
                setShowModal(true);
            }
        });
    };

    return (
        <>
            <div className="relative px-3 pt-6 max-w-2xl mx-auto">
                {props.searching && (
                    <Spinner className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" />
                )}

                {!props.is_playing && (
                    <form
                        onSubmit={handleSubmit}
                        className={props.searching ? "opacity-25" : ""}
                    >
                        <div className="md:flex gap-2 mb-2">
                            <div className="md:w-2/5 mb-2">
                                <NumberInput
                                    placeholder="Amount"
                                    onChangeHandler={(valueEntered) =>
                                        setAmount(valueEntered)
                                    }
                                    value={amount}
                                />
                            </div>
                            <div className="md:w-3/5">
                                <SelectDropdown
                                    options={categories}
                                    onChangeHandler={(valueSelected) =>
                                        setCategory(valueSelected)
                                    }
                                    value={category}
                                    placeholder="Any Category"
                                />
                            </div>
                        </div>
                        <div className="md:flex gap-2 mb-2">
                            <div className="md:w-3/5 mb-2">
                                <SelectDropdown
                                    options={difficulties}
                                    onChangeHandler={(valueSelected) =>
                                        setDifficulty(valueSelected)
                                    }
                                    value={difficulty}
                                    placeholder="Any Difficulty"
                                />
                            </div>
                            <div className="md:w-2/5">
                                <SelectDropdown
                                    options={types}
                                    onChangeHandler={(valueSelected) =>
                                        setType(valueSelected)
                                    }
                                    value={type}
                                    placeholder="Any Type"
                                />
                            </div>
                        </div>
                        <div className="text-right">
                            <button
                                type="submit"
                                className="text-lg px-4 text-white text-center font-bold py-2 bg-blue-500 rounded-lg shadow-lg w-24"
                            >
                                Start
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <InfoOnly
                icon={
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                        />
                    </div>
                }
                show_modal={showModal}
                onShowModal={(status) => setShowModal(status)}
                heading={modalDetails.heading}
                message={modalDetails.message}
            />
        </>
    );
}
