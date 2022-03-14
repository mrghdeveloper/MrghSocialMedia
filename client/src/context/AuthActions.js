export const loginState = (userCredentional) => ({
    type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const loginFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});