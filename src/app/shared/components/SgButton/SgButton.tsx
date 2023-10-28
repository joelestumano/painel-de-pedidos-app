interface SgButtonProps {
    type: "button" | "submit";
    text?: string;
    child?: any;
    onClick?: () => void;
    onSubmit?: () => void;
    variant?: "primary" | "success" | "danger" | "transparent";
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
            className={`btn text-uppercase fw-semibold px-2 py-1 esf-button text-white btn-${variant} bg-${variant} 
            ${variant === 'transparent' ? 'text-body border-0' : ''} rounded-5`}
            onClick={handleClick}
            onSubmit={handleSubmit}
            disabled={disabled}
        >
            {child ? (
                <div className="d-flex flex-row">
                    {text ? <span className={`ms-2 me-0 ${variant === 'transparent' ? 'text-body' : ''}`}>{text}</span> : null}
                    <div className="d-flex align-items-center ms-1 me-2">{child}</div>
                </div>
            ) : (
                <span className={`mx-3 mx-md-3 ${variant === 'transparent' ? 'text-body' : ''}`}>{text}</span>
            )}
        </button>
    );
};
