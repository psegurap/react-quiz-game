export function NumberInput(props) {
    return (
        <input
            type="number"
            value={props.value}
            onChange={(e) => props.onChangeHandler(e.target.value)}
            placeholder={props.placeholder}
            className="w-full rounded text-lg border-1 px-4 text-gray-900 shadow-sm focus:ring-transparent border-gray-300 focus:border-gray-300 placeholder:text-gray-400 sm:leading-6"
        />
    );
}

export function SelectDropdown(props) {
    return (
        <select
            value={props.value}
            onChange={(e) => props.onChangeHandler(e.target.value)}
            className="w-full rounded text-lg border-1 px-4  text-gray-900 shadow-sm focus:ring-transparent border-gray-300 focus:border-gray-300 placeholder:text-gray-400 text-gray-400 sm:leading-6"
        >
            <option value="">{props.placeholder}</option>
            {props.options.map((option, index) => (
                <option value={option.value} key={index}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}
