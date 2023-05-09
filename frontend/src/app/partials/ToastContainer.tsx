import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { actions } from '../../shared/store';

export function ToastContainer() {
  const dispatch = useAppDispatch();

  const { toasts } = useAppSelector((state) => state.ui);

  const Toast = ({ id, message }: { id: string; message: string }) => {
    const timerId = window.setTimeout(() => {
      onClose();
    }, 5000);

    const onClose = () => {
      clearInterval(timerId);
      dispatch(actions.hideToast(id));
    };

    return (
      <div
        className="toast show align-items-center text-white bg-primary border-0"
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} message={toast.message} />
      ))}
    </div>
  );
}
