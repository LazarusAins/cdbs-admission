import React from "react";
import TextInput from "../ui/TextInput";
import InputSelect from "../ui/InputSelect";
import { EMPLOYMENT_STATUS, SALARY_SCALE } from "../../data";

const ParentForm = ({
  title,
  prefix,
  formData,
  handleOnChange,
  handleDobChange,
  checked,
  setCheck
}) => {


  return (
    <div className="border-b border-b-black mt-4">
      <span className="subhead-checkbox mb-[4rem]">
        <input
          onChange={() => {
            setCheck(prefix, !checked[prefix])
          }}
          name={`${prefix}-checkbox`}
          id={`${prefix}-checkbox`}
          type="checkbox"
          checked={checked[prefix] || false}
        />
        <label
          htmlFor={`${prefix}-checkbox`}
          className="form-sub-header checkbox-text capitalize"
        >
          {title} - Please{" "}
          <span className="highlight-sub-header">
            check the box if applicable
          </span>
        </label>
      </span>

      {checked[prefix] && (
        <>
          {/* Row 1 */}
      <div className="grid grid-cols-3 grid-rows-1 gap-8">
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          label={`${title}'s Full Name`}
          value={formData[prefix].lastName || ""}
          name="lastName"
          placeholder="Family Name"
          onChange={(e) => handleOnChange("lastName", e.target.value, prefix)}
        />
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          value={formData[prefix].firstName || ""}
          placeholder="First Name"
          name="firstName"
          onChange={(e) => handleOnChange("firstName", e.target.value, prefix)}
        />
        <TextInput
          readOnly={!checked[prefix]}
          value={formData[prefix].middleName || ""}
          placeholder="Middle Name"
          name="middleName"
          onChange={(e) => handleOnChange("middleName", e.target.value, prefix)}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-8">
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-4"
          label="Date of Birth*"
          type="date"
          name="dateOfBirth"
          value={formData[prefix].dateOfBirth || ""}
          placeholder="Calendar"
          onChange={(e) => {
            handleDobChange(e, formData[prefix].dateOfBirth, handleOnChange, prefix);
            handleOnChange("dateOfBirth", e.target.value, prefix);
          }}
        />
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-1"
          label="Age*"
          name="age"
          onInput={(e) => e.preventDefault()} // Replace with InputValidateNumber if applicable
          value={formData[prefix].age || ""}
          onChange={(e) => handleOnChange("age", e.target.value, prefix)}
        />
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-3"
          label="Educational Attainment"
          name="educationAttainment"
          value={formData[prefix].educationAttainment || ""}
          onChange={(e) =>
            handleOnChange("educationAttainment", e.target.value, prefix)
          }
        />
        <InputSelect
          required={checked[prefix]}
          className="col-span-4"
          label="Employment Status"
          name="employmentStatus"
          value={formData[prefix].employmentStatus || ""}
          onChange={(e) =>
            handleOnChange("employmentStatus", e.target.value, prefix)
          }
          options={EMPLOYMENT_STATUS}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-12 gap-8">
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-6"
          label="Employed at"
          value={formData[prefix].employedAt || ""}
          onChange={(e) => handleOnChange("employedAt", e.target.value, prefix)}
        />
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-6"
          label="Office Address"
          value={formData[prefix].officeAddress || ""}
          onChange={(e) =>
            handleOnChange("officeAddress", e.target.value, prefix)
          }
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-12 gap-8">
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-4"
          label="Contact No."
          value={formData[prefix].contactNo || ""}
          type="number"
          onInput={(e) => e.preventDefault()} // Replace with InputValidateNumber if applicable
          onChange={(e) => handleOnChange("contactNo", e.target.value, prefix)}
        />
        <TextInput
          readOnly={!checked[prefix]}
          required={checked[prefix]}
          className="col-span-4"
          label="Position"
          value={formData[prefix].position || ""}
          onChange={(e) => handleOnChange("position", e.target.value, prefix)}
        />
        <InputSelect
          required={checked[prefix]}
          className="col-span-4"
          label="Salary Scale"
          value={formData[prefix].salary || ""}
          onChange={(e) =>
            handleOnChange("salary", e.target.value, prefix)
          }
          options={SALARY_SCALE}
        />
      </div>
        </>
      )}
    </div>
  );
};

export default ParentForm;
