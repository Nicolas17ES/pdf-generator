const SelectImageButton = ({ onClick, text }) => (
    <button
        onClick={onClick}
        className="button select-image-button"
        aria-label={text || "Select image"}
    >
        {text}
    </button>
);

export default SelectImageButton;
