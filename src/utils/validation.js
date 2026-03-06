const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => emailRegex.test(email);

export const validatePassword = (password) => {
    return password.length >= 6;
};
