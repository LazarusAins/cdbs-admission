import React, { useEffect, useState } from "react";
import useAdmissionStore from "../../../store/admission/useAdmissionStore";
import ApplicantRegister from "../view/ApplicantRegister";
import Admissions from "../view/Admissions";
import logo from "../../../assets/images/logo.png";
import burgerMenu from "../../../assets/images/burgerMenu.png";
import useGreeting from "../../../hooks/useGreeting";
import useAuthStore from "../../../store/authentication/authStore";
import useSideBarStore from "../../../store/sideBar/sideBarStore";
import ReactLoading from "react-loading";

const MainViewTest = () => {
  const [showModal, setShowModal] = useState(false);
  const { greeting } = useGreeting();
  const { setShowSideBar } = useSideBarStore();
  const { handleSlotCheck, admissions, getAllUserAdmissions,  } =
    useAdmissionStore();
  const { user } = useAuthStore();

  const isLoading = false

  const userId = localStorage.getItem("userId");

  // console.log("ADMISSIONS FROM MAIN VIEW: ", admissions)

  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

  // Check if has admission
  const hasAdmission = admissions.length > 0;

  console.log("Has admission: ", hasAdmission)

  // SIDE EFFECTS

  useEffect(() => {
    if (admissions.length <= 0 && userId) {
      console.log("RUNNING FOR GETTING ADMISSIONS USER");
      getAllUserAdmissions(userId);
    }
  }, [userId]);

  // console.log(admissions);

  // if(isLoading){
  //   return (
  //     <ReactLoading className="app-loader" type={"bubbles"} color="#012169" />
  //   )
  // }

  return (
    <section className="w-full xl:w-[calc(100%_-_33.9rem)] min-h-[100vh] h-[100vh]">
      {/* Content Container */}
      <div className="flex items-center justify-between">
        {/* Modal form for registration of applicants */}
        <ApplicantRegister show={showModal} setShow={setShowModal} />

        {/* Content Wrapper */}
        <div className=" my-[3.3rem] mx-[2rem] border-b border-b-black overflow-hidden w-full">
          {/* Content Header */}
          <div className="flex items-center justify-between xl:hidden">
            <div className="welcome-container">
              <img src={logo} className="side-logo" />
              <div className="welcome-text">
                <h2>Welcome back!</h2>
                <h3>
                  {greeting}, {user.firstName}!
                </h3>
              </div>
            </div>
            <button
              onClick={() => setShowSideBar((prev) => !prev)}
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <img src={burgerMenu} alt="" className="w-5 h-5" />
            </button>
          </div>
          <div className="admission-top-header">
            <h1 className="lg:text-[4rem] mb-0">Admission Application List</h1>

            {/* Show Button when there's admissions */}
            {admissions.length > 0 && (
              <div
                className="btn-blue btn btn-add btn-applicant"
                onClick={() => {
                  handleShow();
                  handleSlotCheck();
                }}
              >
                Add Applicant
              </div>
            )}
          </div>

          {/* Content container */}
          {isLoading ? (
            <ReactLoading className="app-loader" type={"bubbles"} color="#012169" />
          ) : (
            <div className="xl:h-[85vh] lg:h-[77vh]">
            {/* Center Content if null */}
            {!hasAdmission && (
              <div className="center-main">
                <div className="no-applications-container">
                  <p>No applications yet?</p>
                  <p className="no-application-sub-text">
                    Please click &quot;Add Applicant&quot; to add an applicant
                  </p>
                </div>

                <div
                  className="btn-blue btn btn-add btn-applicant"
                  onClick={() => {
                    handleShow();
                    handleSlotCheck();
                  }}
                >
                  Add Applicant
                </div>
              </div>
            )}
            {hasAdmission && <Admissions admissions={admissions} />}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainViewTest;
