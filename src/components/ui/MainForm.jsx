import React from "react";
import Button from "./Button";

const MainFormLayout = ({ title, detail, children, back = true, onBack, onSubmit, isDisabledSubmit }) => (
  <form className="w-full h-[100%]" onSubmit={onSubmit}>
    <h2 className="text-[2.5rem] font-bold mb-6 text-gray-800">{title}</h2>
    <p className="text-[1.75rem] font-medium">
      {" "}
      { title !== "Survey" && "Please enter" } <span className="font-bold">{detail}</span>
    </p>
    {children}
    {/* <button
      type="submit"
      className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Submit
    </button> */}
    <div className="my-[2rem]">
      {back && (
        <Button
          className="btn-grey w-full mb-4"
          body="Back"
          callBack={onBack}
        />
      )}
      <Button
        className={`${isDisabledSubmit ? "btn-grey" : "btn-blue"} w-full mb-4`}
        body="Next"
        type="submit"
        disabled={isDisabledSubmit}
      />
    </div>
  </form>
);

export default MainFormLayout;
