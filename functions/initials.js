function initials(name) {
  let initial = "";
  const array = name.split(" ");
  array.forEach((element) => {
    initial += element[0];
  });
  return initial;
}
module.exports = initials;
