import { useToaster } from 'react-hot-toast';
export default function Notifications() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  return (
    <div
      style={{
        position: 'fixed',
        marginInline: 'auto',
        top: 8,
        left: '40%',
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}>
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        });

        const ref = (el) => {
          if (el && typeof toast.height !== 'number') {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div
            key={toast.id}
            ref={ref}
            style={{
              position: 'absolute',

              width: '14em',
              padding: '.3em',
              borderRadius: '.3em',
              background: 'white',
              transition: 'all 0.5s ease-out',
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`,
            }}
            {...toast.ariaProps}>
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}
