export const formCheCkValidate = (forms, event) => {
  let validate = true;
  Array.from(forms).forEach((form) => {
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      validate = false;
    } else {
      validate = true;
    }
  });

  return validate;
};
