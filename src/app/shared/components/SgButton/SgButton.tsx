interface SgButtonProps {
    type: "button" | "submit";
    text: string;
    child?: any;
    onClick?: () => void;
    onSubmit?: () => void;
    variant?: "primary" | "success" | "danger";
    disabled?: boolean;
}

export const SgButton: React.FC<SgButtonProps> = ({
    type,
    text,
    child,
    onClick,
    onSubmit,
    variant = "primary",
    disabled = false,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <button
            type={type}
            className={`btn text-uppercase fw-semibold px-2 py-1 esf-button text-white btn-${variant} bg-${variant} rounded-5`}
            onClick={handleClick}
            onSubmit={handleSubmit}
            disabled={disabled}
        >
            {child ? (
                <div className="d-flex flex-row">
                    <span className="ms-2 me-0">{text}</span>
                    <div className="d-flex align-items-center ms-1 me-2">{child}</div>
                </div>
            ) : (
                <span className="mx-3 mx-md-3">{text}</span>
            )}
        </button>
    );
};
