const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
        isOpen,
        onClose,
        onConfirm,
        message = "Are you sure?",
    }) => {
        return (
            <div
            id="confirmation-modal"
            className={`fixed inset-0 bg-gray-500 bg-opacity-50 overflow-auto px-4 py-6 md:p-8 z-50 transition duration-150 ease-in-out ${
            isOpen ? "opacity-100 flex items-center justify-center" : "opacity-0 flex items-center justify-center pointer-events-none"
            }`}>
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
            <p className="text-lg font-medium text-center">{message}</p>
            <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                id="confirm-button"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={onConfirm}
                >
                Confirm
                </button>
                <button
                id="cancel-button"
                className="px-4 py-2 bg-gray-500 text-gray-100 rounded-md hover:bg-gray-600"
                onClick={onClose}
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        );
    };

export default ConfirmationModal;