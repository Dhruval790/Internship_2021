/* eslint-disable import/prefer-default-export */
// To bifurcate data into active/inactive
const bifurcateData = (intialData, basis) => {
  const activeData = [];
  const inactiveData = [];

  intialData.forEach((row) => {
    if (row[basis]) {
      activeData.push(row);
    } else {
      inactiveData.push(row);
    }
  });

  return { activeData, inactiveData };
};

export { bifurcateData };
