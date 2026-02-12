const ConfirmationModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>

        <button onClick={onCancel}>Cancel</button>

        <button onClick={onConfirm} disabled={loading}>
          {loading ? "Booking..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
  },
};

export default ConfirmationModal;
