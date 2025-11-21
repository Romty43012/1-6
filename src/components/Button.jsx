export default function Button({
    children,
    onClick,
    type = "button",
    className = "",
    style = {},
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#fff",
                ...style,
            }}
        >
            {children}
        </button>
    );
}
