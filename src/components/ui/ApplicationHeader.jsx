import React from "react";
import { useNavigate } from "react-router-dom";
import useAdmissionStore from "../../store/admission/useAdmissionStore";
import back from "../../assets/images/back.png"
import burgerMenu from "../../assets/images/burgerMenu.png"
import useSideBarStore from "../../store/sideBar/sideBarStore";

const ApplicationHeader = ({callBack, title}) => {
  const {setShowSideBar} = useSideBarStore()

  return (
    <div className="admission-top-header ">
      <div className=" flex-center !justify-start gap-8 py-8 px-4">
        <button
          className="cursor-pointer"
          onClick={callBack}
        >
          <img src={back} />
        </button>
        <h2 className="lg:text-[4rem] mb-0">{title}</h2>
      </div>

      <button
        onClick={() => setShowSideBar((prev) => !prev)}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center py-2 px-8 mt-2 ms-3 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <img src={burgerMenu} alt="" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ApplicationHeader;
