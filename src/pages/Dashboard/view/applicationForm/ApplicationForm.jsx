import { useEffect } from "react";
import useAuthStore from "../../../../store/authentication/authStore";
import back from "../../../../assets/images/back.png";
import { useNavigate } from "react-router-dom";
import useAdmissionStore from "../../../../store/admission/useAdmissionStore";
import Button from "../../../../components/ui/Button";
import useSideBarStore from "../../../../store/sideBar/sideBarStore";
import burgerMenu from "../../../../assets/images/burgerMenu.png";
import ApplicationHeader from "../../../../components/ui/ApplicationHeader";

const ApplicationForm = () => {
  const { sessionToken: token, handleSessionToken } = useAuthStore();
  const {
    resetAdmissionDeclaration,
    currentAdmissionId,
    declarationPackage,
    toggleDeclarationPackage,
    declarationSupportingDoc,
    toggleDeclarationSupportingDoc,
    handleSubmitDeclaration,
    getAdmissionUser
  } = useAdmissionStore();
    // const { setShowSideBar } = useSideBarStore();

  const navigate = useNavigate();

  const agreementAccepted = declarationPackage && declarationSupportingDoc;
  const sessionToken = token || localStorage.getItem("sessionToken");

  //Function section
  const handleDeclarationChange = (setter) => {
    setter((prev) => !prev);
  };

  const handleAgreementBtn = () => {
    handleSubmitDeclaration(currentAdmissionId).then((response) => {
      if (response === 200) {
        // setCurrentStepIndex((prevIndex) => prevIndex + 1);
        navigate("forms");
      }
    });
  };

  const handleOnBack = () => {
    console.log('clicked')
    navigate('/dashboard');
    resetAdmissionDeclaration();
  }

  useEffect(() => {
    // console.log("SESSIONTOKEN FROM DASHBOARD: ", sessionToken);
    handleSessionToken(sessionToken);
  }, []);

  useEffect(() => {
    console.log(currentAdmissionId)
    if(currentAdmissionId){
      getAdmissionUser(currentAdmissionId)
    }
  }, [currentAdmissionId])

  //Increment steps
  // useEffect(() => {
  //   console.log(currentStepIndex);
  //   console.log(admissionFormSteps);
  //   setAdmissionFormSteps(steps[currentStepIndex]);
  // }, [currentStepIndex]);

  // const renderContent = (steps) => {
  //   switch (steps) {
  //     case "agreement":
  //       return (
  //         <>
  //           {/* Agreement Body */}
  //           <div>
  //             {/* Body Wrapper */}
  //             <h3 className="text-[2.5rem] font-bold text-blueAccent">
  //               Agreement
  //             </h3>
  //             <h4 className="form-sub-header text-[#909590]">
  //               The following statements{" "}
  //               <span className="text-blueAccent">
  //                 must be read and agreed by both the Learner and the Parent(s)
  //                 or Guardian
  //               </span>
  //             </h4>{" "}
  //             <p className="form-sub-header subhead text-[#909590]">
  //               We understand that this application and admission to
  //               <span style={{ color: "#012169" }}>
  //                 {" "}
  //                 Caritas Don Bosco School
  //               </span>{" "}
  //               are subject to the following conditions:
  //             </p>
  //             <ol className="conditions-container">
  //               <li>
  //                 {" "}
  //                 That we are responsible for the accuracy of all information
  //                 provided herein and we give consent for the verification of
  //                 the credentials submitted if necessary;
  //               </li>
  //               <li>
  //                 {" "}
  //                 That we provide an assessment/medical report of our child if
  //                 diagnosed with any medical, developmental and/or psychological
  //                 conditions that may affect his/her performance in school;
  //               </li>
  //               <li>
  //                 {" "}
  //                 That any information withheld purposely or inadvertently will
  //                 mean forfeiture or cancellation of admission;
  //               </li>
  //               <li>
  //                 {" "}
  //                 That all credentials filed and received by the Registrar’s
  //                 Office become the property of Caritas Don Bosco School and
  //                 will not be returned to the applicant;
  //               </li>
  //               <li>
  //                 {" "}
  //                 That we understand that the result of the admission
  //                 test/procedure only reflects the final decision and the school
  //                 has the right not to disclose further details of the test to
  //                 protect the measuring tools being used;
  //               </li>
  //               <li>
  //                 {" "}
  //                 That no results will be released without submission of
  //                 complete admission requirements.
  //               </li>
  //             </ol>
  //             <h3 className="form-heading" style={{ color: "#012169" }}>
  //               Declaration
  //             </h3>
  //             <div className="checkbox-declaration">
  //               <label>
  //                 <input
  //                   className="checkbox"
  //                   type="checkbox"
  //                   onChange={() =>
  //                     handleDeclarationChange(toggleDeclarationPackage)
  //                   }
  //                   checked={declarationPackage}
  //                 />
  //                 <span className="option-check">
  //                   We have read and understood all sections of this admission
  //                   package.
  //                 </span>
  //               </label>
  //             </div>
  //             <div className="checkbox-declaration">
  //               <label>
  //                 <input
  //                   className="checkbox"
  //                   type="checkbox"
  //                   onChange={() =>
  //                     handleDeclarationChange(toggleDeclarationSupportingDoc)
  //                   }
  //                   checked={declarationSupportingDoc}
  //                 />
  //                 <span className="option-check">
  //                   We declare to the best of our knowledge, the information
  //                   provided in this application form and the supporting
  //                   documents are complete and accurate.
  //                 </span>
  //               </label>
  //             </div>
  //             {/* Button */}
  //             <Button
  //               className={`w-full ${
  //                 agreementAccepted ? "btn-blue" : "btn-grey"
  //               }`}
  //               body="Continue"
  //               disabled={!agreementAccepted}
  //               callBack={handleAgreementBtn}
  //             />
  //           </div>
  //         </>
  //       );

  //     case "form-1":
  //       return (
  //         <FormWrapper title="Personal Data" detail="Learner Information">
  //           <SelectInput
  //             label="Level Applying For:"
  //             name="levelApplyingFor"
  //             value={levelApplyingFor}
  //             onChange={handleOnChangeForm}
  //             required={true}
  //             options={LEVELS}
  //           />
  //         </FormWrapper>
  //       );
  //   }
  // };

  return (
    <section className="w-full xl:w-[calc(100%_-_33.9rem)] overflow-y-auto">
      {/* Agreement Header */}
      <ApplicationHeader 
        callBack={() => handleOnBack()}
        title="Online Application Form"
      />
      {/* <div className="admission-top-header ">
        <div className=" flex-center !justify-start gap-8 py-8 px-4">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
              resetAdmissionDeclaration();
              // if (currentStepIndex <= 0) {
              //   resetAdmissionDeclaration();
              //   navigate(-1);
              // }
              // setCurrentStepIndex((prevIndex) => prevIndex - 1);
            }}
          >
            <img src={back} />
          </button>
          <h2 className="lg:text-[4rem] mb-0">Online Application Form</h2>
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
      </div> */}

      <div className="py-[3.3rem] px-[2rem]">
        <div className="border-b border-b-black overflow-y-auto w-full h-[100%] lg:h-[80vh]">
          {/* {renderContent(admissionFormSteps)} */}
          <div>
            {/* Body Wrapper */}
            <h3 className="text-[2.5rem] font-bold text-blueAccent">
              Agreement
            </h3>
            <h4 className="form-sub-header text-[#909590]">
              The following statements{" "}
              <span className="text-blueAccent">
                must be read and agreed by both the Learner and the Parent(s) or
                Guardian
              </span>
            </h4>{" "}
            <p className="form-sub-header subhead text-[#909590]">
              We understand that this application and admission to
              <span style={{ color: "#012169" }}>
                {" "}
                Caritas Don Bosco School
              </span>{" "}
              are subject to the following conditions:
            </p>
            <ol className="conditions-container">
              <li>
                {" "}
                That we are responsible for the accuracy of all information
                provided herein and we give consent for the verification of the
                credentials submitted if necessary;
              </li>
              <li>
                {" "}
                That we provide an assessment/medical report of our child if
                diagnosed with any medical, developmental and/or psychological
                conditions that may affect his/her performance in school;
              </li>
              <li>
                {" "}
                That any information withheld purposely or inadvertently will
                mean forfeiture or cancellation of admission;
              </li>
              <li>
                {" "}
                That all credentials filed and received by the Registrar’s
                Office become the property of Caritas Don Bosco School and will
                not be returned to the applicant;
              </li>
              <li>
                {" "}
                That we understand that the result of the admission
                test/procedure only reflects the final decision and the school
                has the right not to disclose further details of the test to
                protect the measuring tools being used;
              </li>
              <li>
                {" "}
                That no results will be released without submission of complete
                admission requirements.
              </li>
            </ol>
            <h3 className="form-heading" style={{ color: "#012169" }}>
              Declaration
            </h3>
            <div className="checkbox-declaration">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={() =>
                    handleDeclarationChange(toggleDeclarationPackage)
                  }
                  checked={declarationPackage}
                />
                <span className="option-check">
                  We have read and understood all sections of this admission
                  package.
                </span>
              </label>
            </div>
            <div className="checkbox-declaration">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={() =>
                    handleDeclarationChange(toggleDeclarationSupportingDoc)
                  }
                  checked={declarationSupportingDoc}
                />
                <span className="option-check">
                  We declare to the best of our knowledge, the information
                  provided in this application form and the supporting documents
                  are complete and accurate.
                </span>
              </label>
            </div>
            {/* Button */}
            <Button
              className={`w-full ${
                agreementAccepted ? "btn-blue" : "btn-grey"
              }`}
              body="Continue"
              disabled={!agreementAccepted}
              callBack={handleAgreementBtn}
            />
          </div>
        </div>
      </div>
      {/* Section Form 1 */}
    </section>
  );
};

export default ApplicationForm;
