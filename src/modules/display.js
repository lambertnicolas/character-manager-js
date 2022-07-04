const display = (list, add, more, modify, search) => {
  charachterList.style.display = `"${list}"`;
  addCharachter.style.display = `"${add}"`;
  viewMore.style.display = `"${more}"`;
  modifyCharachter.style.display = `"${modify}"`;
  searchPage.style.display = `"${search}"`;
};
export { display };
