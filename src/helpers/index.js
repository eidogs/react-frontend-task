export const editUserInArray = (usersArray, userData) => {
    const userIndex = usersArray.findIndex(user => user.id === userData.id);
    if (userIndex !== -1) {
        usersArray[userIndex] = userData;
    }
    return usersArray;
};

export const deleteUserInArray = (usersArray, id) => {
    const userIndex = usersArray.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        usersArray.splice(userIndex, 1);
    }
    return usersArray;
}