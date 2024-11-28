const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const sendGrid = require("@sendgrid/mail");
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;

sendGrid.setApiKey(SEND_GRID_API_KEY);
exports.getlogin = (req, res, next) => {
  console.log(req.url, req.method, req.body);
  res.render("login", { title: "Login", isLoggedIn: false });
};
exports.postlogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    console.log(req.session.user, user);
    await req.session.save();
    res.redirect("/");
  } catch (err) {
    res.render("login", {
      title: "Login",
      isLoggedIn: false,
      errors: [err.message],
    });
  }
};

exports.postlogout = (req, res, next) => {
  console.log(req.url, req.session.isLoggedIn, req.body);
  req.session.destroy();
  res.redirect("/login");
};

exports.getsignup = (req, res, next) => {
  console.log(req.url, req.method, req.body);
  res.render("signup", { title: "Signup", isLoggedIn: false });
};

exports.postsignup = [
  //first name validator
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters and spaces"),

  //last name validator
  check("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Last name can only contain letters and spaces"),
  //email validator
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  //password validator
  check("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  //confirm password validator;
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  // User Type Validator
  check("userType")
    .trim()
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("User type is invalid"),

  // User Type Validator
  check("termsAccepted")
    .notEmpty()
    .withMessage("Terms and Conditions must be accepted"),

  (req, res, next) => {
    console.log(req.url, req.session.isLoggedIn, req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(422).render("signup", {
        title: "Signup",
        isLoggedIn: false,
        errors: error.array().map((err) => err.msg),
        oldinputs: req.body,
      });
    }
    const { firstName, lastName, email, password, userType, termsAccepted } =
      req.body;
    bcrypt.hash(password, 12).then((hashedPassword) => {
      console.log(hashedPassword);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
        termsAccepted,
      });

      user
        .save()
        .then(() => {
          const WecomeEmail = {
            to: email,
            from: "sohebakhtar1130@gmail.com",
            subject: "Welcome to our site",
            html: `<h1>Welcome to our site ${firstName} ${lastName}</h1>`,
          };
          return sendGrid.send(WecomeEmail).then((result) => {
            console.log(result);
            res.redirect("/login");
          });
        })
        .catch((err) => console.log(err));
    });
  },
];

exports.getforgot = (req, res, next) => {
  res.render("forgot", { title: "Forgot Password", isLoggedIn: false });
};

exports.postforgot = (req, res, next) => {
  console.log(req.url, req.session.isLoggedIn, req.body);
  const email = req.body.email;
  console.log(email);
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log("User not found");
      return res.redirect("/login");
    }
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(token);
    user.otp = token;
    user.otpExpireAt = Date.now() + 5 * 60 * 1000;
    return user.save().then((result) => {
      console.log(result);
      res.redirect(`/reset-password?email=${email}`);
    });
  });
};

exports.getreset = (req, res, next) => {
  const email = req.query.email;
  console.log(req.url, req.session.isLoggedIn, req.body);
  res.render("reset-password", {
    title: "Reset Password",
    isLoggedIn: false,
    email: email,
  });
};

exports.postreset = [
  check("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  //confirm password validator;
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  (req, res, next) => {
    console.log(req.url ,req.body);
    const email = req.body.email;
    const otp = req.body.otp;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error.array());
      return res.status(422).render("reset-password", {
        title: "Reset Password",
        isLoggedIn: false,
        errors: error.array().map((err) => err.msg),
        email: email,
      });
    }

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        console.log("User not found");
        return res.render("reset-password", {
          title: "Reset Password",
          isLoggedIn: false,
          email: email,
          errors: ["User not found"],
        })
      }
      if (user.otp !== otp) {
        return res.render("reset-password", {
          title: "Reset Password",
          isLoggedIn: false,
          email: email,
          errors: ["OTP is incorrect"], 
        });
      }
      if (user.otpExpireAt < Date.now()) {
        return res.render("reset-password", {
          title: "Reset Password",
          isLoggedIn: false,
          email: email,
          errors: ["OTP is expired"], 
        });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        user.password = hashedPassword;
        return user.save().then((result) => {
          console.log(result);
          res.redirect("/login");
        });
      });
    });
  },
];
