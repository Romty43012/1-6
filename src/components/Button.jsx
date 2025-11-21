export default function Button({ children, onClick, style = {} }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
                cursor: "pointer",
                ...style,
            }}
        >
            {children}
        </button>
    );
}
