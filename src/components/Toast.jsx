import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { TiTick } from "react-icons/ti";

const Toast = forwardRef(function Toast(props, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className={`rounded animate-bounce bg-green-400 h-20 w-60 z-40 -bottom-3/4 -right-3/4`}
    >
      <div className=" flex items-center p-2 justify-start py-4 space-x-2">
        
        <TiTick size={35} />
        <p className="text-white">Succesful!</p>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Toast;
