export const InputValidateNumber = (e) => {
  e.target.value = e.target.value.replace(
    /[^0-9-]/g,
    ""
  );
}

export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust if the current date is before the birth date in the year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const generateSchoolYears = (startYear = 2010, endYear = 2024) => {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const yearStart = startYear + i;
    const yearEnd = yearStart + 1;
    return `${yearStart}-${yearEnd}`;
  });
};

export const handleDobChange = (e, dateOfBirth, setter, parent = null) => {
  console.log("HANDLE DOB RUNNING")
  console.log(e.target.value)
  if (!dateOfBirth && !e?.target?.value) {
    console.log("DATE OF BIRTH IS MISSING")
    return
  };

  // Use the date from personalData or fallback to the input value
  const selectedDate = new Date(dateOfBirth || e.target.value);
  const today = new Date();

  // If the selected date is invalid or in the future, reset the age
  if (isNaN(selectedDate) || selectedDate > today) {
    console.log("// If the selected date is invalid or in the future, reset the age")
    if(parent) setter("dateOfBirth", "", parent)
    else setter("dateOfBirth", "");
    return;
  }

  // Calculate age
  let age = today.getFullYear() - selectedDate.getFullYear();
  const monthDifference = today.getMonth() - selectedDate.getMonth();

  // Adjust for months and days not yet reached
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < selectedDate.getDate())
  ) {
    age--;
  }

  // Set age if valid, otherwise reset it
  console.log(age)
  console.log(dateOfBirth)
  console.log(setter)
  console.log(parent)
  if(parent) setter("age", age >= 0 ? age : "", parent)
  else setter("age", age >= 0 ? age : "")
};
