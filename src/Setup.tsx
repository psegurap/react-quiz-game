import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import categories from "./categories.json";

type CategoryType = {
    id: number;
    name: string;
};

export default function Setup({
    onRequestQuestions,
}: {
    onRequestQuestions: (category_id: number) => void;
}) {
    const [search, setSearch] = useState<string>("");

    return (
        <div className="py-10 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                            How much do you know?
                        </h2>
                        <p className="mt-4 text-lg/8 text-gray-600">
                            From science to pop culture, choose a category and
                            see how much you really know.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 mt-10">
                        <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                            <div className="flex items-center px-0 py-3.5 md:mx-auto md:max-w-3xl xl:px-0">
                                <div className="grid w-full grid-cols-1">
                                    <input
                                        type="text"
                                        name="search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search"
                                        className="col-start-1 h-10 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                    />
                                    <MagnifyingGlassIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => {
                                if (
                                    category.name
                                        .toLowerCase()
                                        .indexOf(search.toLowerCase()) !== -1
                                ) {
                                    return (
                                        <Category
                                            key={category.id}
                                            category={category}
                                            onRequestQuestions={
                                                onRequestQuestions
                                            }
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Category({
    category,
    onRequestQuestions,
}: {
    category: CategoryType;
    onRequestQuestions: (category_id: number) => void;
}) {
    return (
        <div
            key={category.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cyan-600 hover:border-gray-400"
        >
            <div className="min-w-0 flex-1">
                <button
                    type="button"
                    className="focus:outline-hidden w-full"
                    onClick={() => onRequestQuestions(category.id)}
                >
                    <span aria-hidden="true" className="absolute inset-0" />
                    <dd className="text-xl font-normal justify-center tracking-tight text-gray-800">
                        {category.name}
                    </dd>
                </button>
            </div>
        </div>
    );
}
