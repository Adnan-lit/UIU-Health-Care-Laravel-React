const Loader = () => (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            <img 
                src="../images/patient/logo.png" 
                alt="Logo" 
                className="h-20 mt-4 animate-pulse"
            />
            <div className="mt-4 text-xl font-semibold text-gray-700">
                Loading...
            </div>
        </div>
    </div>
);

export default Loader;