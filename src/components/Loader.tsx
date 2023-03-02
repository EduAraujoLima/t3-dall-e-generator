export const Loader = () => (
    <div className="flex flex-col items-center justify-center w-full mt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
            Generating images...
        </p>
    </div>
);
