export default function getCurrentYear() {
  return new Date().getFullYear();
}

export const arrangeTime = (time) => {
  const passedDate = new Date(time);
  const formattedDate = passedDate.toLocaleDateString();
  const formattedTime = passedDate.toLocaleTimeString();

  return `${formattedDate}`;
};
