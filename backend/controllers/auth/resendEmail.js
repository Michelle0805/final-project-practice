
// const { User } = require("../../models/user");

// const { RequestError, sendEmail } = require("../../helpers");

// const { APP_URL = "http://localhost:4000" } = process.env;

// const resendEmail = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw RequestError(404, "Email not found");
//   }
//   if (user.verify) {
//     throw RequestError(400, "Verification has already been passed");
//   }

//   const mail = {
//     to: email,
//     subject: "Slim-Mom verification email",
//     Vars: {
//       link: `${APP_URL}/api/users/verificate/${user?.verificationToken}`,
//     },
//     html: "<h1>Welcome to Slim-mom App!</h1><h3>Please verify your email!<br /> Please click to continue<br /><br /><div style='text-align:center;'><a href='[[var:link]]' target='_blank' rel='noopener noreferrer' style='display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;'>Verify email</a></div>",
//   };

//   await sendEmail(mail);

//   res.json({
//     message: "Verification email have been sent",
//   });
// };

// module.exports = resendEmail;

const { User } = require("../../models/user");
const { RequestError} = require("../../helpers");
const { sendEmail} = require("../../helpers");
const { APP_URL = "http://localhost:4000" } = process.env;

const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found, throw 404 error
    if (!user) {
      throw RequestError(404, "Email not found");
    }

    // If user is already verified, throw 400 error
    if (user.verify) {
      throw RequestError(400, "Verification has already been passed");
    }

    // Prepare email data
const verificationUrl=`${APP_URL}/api/users/verificate/${user?.verificationToken}`;
    console.log(`Verification URL: ${verificationUrl}`);

    const mail = {
      to: email,
      subject: "Slim-Mom verification email",
      html: `
        <h1>Welcome to Slim-mom App!</h1>
        <h3>Please verify your email!</h3>
        <p>Please click to continue</p>
        <div style='text-align:center;'>
          <a href='${verificationUrl}' target='_blank' rel='noopener noreferrer' style='display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;'>Verify email</a>
        </div>
      `,
    };

    // Send email using sendEmail helper
    await sendEmail(mail);

    // Respond with success message
    res.json({
      message: "Verification email has been sent",
    });
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
};

module.exports = resendEmail;
