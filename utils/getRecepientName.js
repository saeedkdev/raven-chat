
const getRecepientName = (users, userLoggedIn) => {
  return users?.filter((userToFilter) => userToFilter !== userLoggedIn?.displayName)[1];
}

export default getRecepientName;
