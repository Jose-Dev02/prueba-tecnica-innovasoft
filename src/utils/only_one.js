export const handleOnlyNumber = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

export const handleOnlyText = (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
};
