import React from "react";
import check from "../assets/images/check.png";
import close from "../assets/images/close-2.svg";
import { useNavigate } from "react-router-dom";
import useAdmissionStore from "../store/admission/useAdmissionStore";

function StatusTrackerTest({ data, selectedAdmissionIndex }) {
  const { db_admission_table, admission_id } = data
  const {
    admission_status,
    is_application_created,
    is_complete_view,
    is_all_required_file_uploaded,
    db_required_documents_table,
    is_for_assessment,
    is_final_result,
    db_exam_admission_schedule,
    is_paid,
    paymethod_id,
  } = db_admission_table;

  const {setCurrentAdmissionId} = useAdmissionStore()

  const navigate = useNavigate()

  const isApplicationComplete = is_complete_view;
  const isApplicationPending = is_application_created && !is_complete_view;
  const isUploadComplete = is_all_required_file_uploaded;
  const isUploadPending = db_required_documents_table.some(
    (doc) => doc.document_status === "pending"
  );
  const isUploadRejected = db_required_documents_table.some(
    (doc) => doc.document_status === "rejected"
  );
  const isPaymentComplete = is_paid === true;
  const isPaymentPending = paymethod_id !== null && !is_paid;
  const isPendingAssessment = is_for_assessment && !is_final_result;
  const isAssessmentSelected = db_exam_admission_schedule.length > 0;
  const isResultSent = is_final_result;

  const steps = [
    {
      isComplete: true,
      title: "Step 1",
      render: () => <img src={check} alt="check" />,
    },
    {
      isComplete: isApplicationComplete,
      isPending: isApplicationPending && !isApplicationComplete,
      title: "Step 2",
    },
    {
      isComplete: isUploadComplete,
      isPending: isUploadPending && !isUploadComplete && isApplicationComplete,
      isRejected: isUploadRejected,
      title: "Step 3",
    },
    {
      isComplete: isPaymentComplete,
      isPending: isPaymentPending && !isPaymentComplete,
      title: "Step 4",
    },
    {
      isComplete: isPendingAssessment,
      isPending: isAssessmentSelected && !isPendingAssessment,
      title: "Step 5",
    },
    {
      isComplete: isResultSent,
      isPending: isPendingAssessment,
      title: "Step 6",
    },
  ];


  const handleApplicationFormNav = () => {
    // if( isApplicationComplete || isApplicationPending){
    //   return
    // }

    setCurrentAdmissionId(admission_id)
    navigate('application-form')
  }

  const getStepClass = (step) => {
    if (step.isComplete) return "circle";
    if (step.isRejected) return "circle circle-reject";
    if (step.isPending) return "circle circle-waiting";
    if (step.isComplete === false) return "circle circle-pending";
    return "circle-outline";
  };

  return (
    <div className="flex lg:ps-[3rem] xl:ps-[5rem] xl:pe-[4rem] pt-[4rem]">
      {/* LEFT SIDE */}
      <div className="tracking-section">
        <div>
          <h4 className="admission-step-ls">Registration</h4>
          <h4 className="admission-step-ls">Application</h4>
          <h4 className="admission-step-ls">Upload</h4>
          <h4 className="admission-step-ls">Payment</h4>
          <h4 className="admission-step-ls">Assessment</h4>
          <h4 className="admission-step-ls">Results</h4>
        </div>
      </div>

      {/* CENTER */}
      <div className="steps-container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={getStepClass(step)}
              // title={step.isComplete ? "Complete" : step.isPending ? "Pending" : ""}
            >
              {step.isComplete || step.isPending || step.isRejected ? (
                step.render ? (
                  step.render()
                ) : (
                  <img src={check} alt="check" />
                )
              ) : (
                index + 1
              )}
            </div>
            {index < steps.length - 1 && <div className="dash-line"></div>}
          </React.Fragment>
        ))}
      </div>
      {/* <div className="steps-container ">
        <div className="circle">
          <img src={check} />
        </div>
        <div className="dash-line"></div>
        {isApplicationComplete ? (
          <div title="Complete" className="circle">
            <img src={check} />
          </div>
        ) : !isApplicationPending ? (
          <div title="Pending" className="circle circle-pending">
            <img src={check} />
          </div>
        ) : isApplicationPending && !isApplicationComplete ? (
          <div title="Pending" className="circle circle-waiting">
            <img src={check} />
          </div>
        ) : (
          <div className="circle-outline">2</div>
        )}
        <div className="dash-line"></div>
        {isUploadComplete ? (
          <div title="Complete" className="circle">
            <img src={check} />
          </div>
        ) : isUploadRejected ? (
          <div title="Please reupload" className="circle circle-reject">
            <img src={close} />
          </div>
        ) : !isUploadPending && isApplicationComplete ? (
          <div title="Pending" className="circle circle-pending">
            <img src={check} />
          </div>
        ) : isUploadPending && !isUploadComplete && isApplicationComplete ? (
          <div title="Pending" className="circle circle-waiting">
            <img src={check} />
          </div>
        ) : (
          <div className="circle-outline">3</div>
        )}
        <div className="dash-line"></div>
        {isPaymentComplete ? (
          <div title="Complete" className="circle">
            <img src={check} />
          </div>
        ) : !isPaymentPending && isUploadComplete ? (
          <div title="Pending" className="circle circle-pending">
            <img src={check} />
          </div>
        ) : isPaymentPending && !isPaymentComplete ? (
          <div title="Pending" className="circle circle-waiting">
            <img src={check} />
          </div>
        ) : (
          <div className="circle-outline">4</div>
        )}
        <div className="dash-line"></div>
        {isPendingAssessment ? (
          <div title="Complete" className="circle">
            <img src={check} />
          </div>
        ) : !isAssessmentSelected && isPaymentComplete ? (
          <div title="pending" className="circle circle-pending">
            <img src={check} />
          </div>
        ) : isAssessmentSelected && !isPendingAssessment ? (
          <div title="pending" className="circle circle-waiting">
            <img src={check} />
          </div>
        ) : (
          <div className="circle-outline">5</div>
        )}
        <div className="dash-line"></div>
        {isResultSent ? (
          <div title="Complete" className="circle">
            <img src={check} />
          </div>
        ) : isAssessmentPending ? (
          <div title="Pending" className="circle circle-waiting">
            <img src={check} />
          </div>
        ) : (
          <div className="circle-outline">6</div>
        )}
      </div> */}

      {/* RIGHT SIDE */}
      <div className="tracking-desc-section">
        <div className="desc-steps">
          <div className="admission-step desc-step" style={{ color: "#aaa" }}>
            <span>Register in the Admission Portal</span>
            <span className="desc-subtext">
              admissionportal-cdbs.vercel.app
            </span>
          </div>
          <div
            className="admission-step desc-step desc-step-succ"
            style={{ color: isApplicationComplete ? "#aaa" : "" }}
            onClick={handleApplicationFormNav}
          >
            <span>Fill-out Online Application Form</span>

            <span className="desc-subtext">View Application Form</span>
          </div>
          <h4
            style={{ color: isUploadComplete ? "#aaa" : "" }}
            className="admission-step desc-step desc-step-succ"
            onClick={() => {
              if (!isApplicationPending && isUploadComplete) {
                return;
              }
              // setPage("upload");
              if (isUploadPending || isUploadRejected) {
                // setEdit(() => true);
              }
              // getLengthRequirements();
            }}
          >
            Upload Requirements
          </h4>
          <h4
            style={{ color: isPaymentComplete ? "#aaa" : "" }}
            className="admission-step desc-step desc-step-succ"
            onClick={() => {
              if (!isUploadComplete || isApplicationPending) {
                return;
              }
              // setPage("payment");
            }}
          >
            Pay Admission Fee
          </h4>
          <h4
            className="admission-step desc-step desc-step-succ"
            style={{ color: isAssessmentSelected ? "#aaa" : "" }}
            onClick={async () => {
              if (!isPaymentComplete) return;
              if (isResultSent) return;
              // await getSchedules(
              //   admissions["admissionsArr"][dataIndex]["db_admission_table"][
              //     "level_applying_for"
              //   ]
              // );
              // setPage("calendar");
            }}
          >
            Select Schedule and Assessment Exam
          </h4>
          <h4 className="admission-step  desc-step desc-step-succ last-step">
            {isResultSent ? "Results available" : "Wait for Results"}

            {isResultSent ? (
              <span
                onClick={() => {
                  console.log("clicked");
                  // setShowResultModal(true);
                }}
                className="results-requirements"
              >
                View Results
              </span>
            ) : null}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default StatusTrackerTest;
