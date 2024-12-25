import React from "react";
import { RotateLoader
} from "react-spinners";

function Loading({ setOpenModal, data }) {
  return (
    <div className="modalBackground">
        <RotateLoader
    />
    </div>
  );
}

export default Loading;
