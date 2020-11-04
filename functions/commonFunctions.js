function Initials(name) {
  let initial = "";
  const array = name.split(" ");
  array.forEach((element) => {
    initial += element[0];
  });
  return initial;
}
const Toast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
module.exports = {
  Initials,
  Toast,
};
