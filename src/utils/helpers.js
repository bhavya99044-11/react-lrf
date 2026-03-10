import { validationTexts } from "./validationTexts";

const checkButtonDisable = (formData, setButton) => {
  const disabled = Object.keys(formData).every((key) => {
    return formData[key] == "";
  });
  setButton(disabled);
};

const checkValidation = (values, rules, error, setError) => {
  let validationObject = {};
  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (rules[key]?.required && value == "") {
      setError((prev) => {
        let errorObject = { ...prev, [key]: validationTexts.required };
        Object.assign(validationObject, errorObject);
        return errorObject;
      });
    } else {
      setError((prev) => {
        let errorObject = { ...prev, [key]: "" };
        Object.assign(validationObject, errorObject);
        return errorObject;
      });
    }
  });

  return validationObject;
};
export { checkButtonDisable, checkValidation };
