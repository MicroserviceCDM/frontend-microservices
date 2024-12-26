import React from "react";
import { MoonLoader} from "react-spinners";

function Loading({ setOpenModal, data }) {
  return (
    <div className="modalLoading">
        <MoonLoader />
    </div>
  );
}

export default Loading;
