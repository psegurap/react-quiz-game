export default function FootNote(props) {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:items-center md:justify-between dark:bg-gray-800 dark:border-gray-600">
            {props.children}
        </footer>
    );
}
