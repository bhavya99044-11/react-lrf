const loginRules = {
  email: {
    required: true,
  },
  password: {
    required: true,
    minLength: 5,
    maxLength: 10,
  },
};

const registerRules = {
  name: {
    required: true,
  },
  email: {
    required: true,
  },
  password: {
    required: true,
    minLength: 5,
    maxLength: 10,
  },
};

const forgotPasswordRules = {
  email: {
    required: true,
  },
};

export { loginRules, registerRules, forgotPasswordRules};
