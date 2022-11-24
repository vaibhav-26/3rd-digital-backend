const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const axios = require("axios");
var jwt = require("jsonwebtoken");

const facebookLogin = async (req, res) => {
  const { userID, accessToken } = req.body;
  try {
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    await axios.post(urlGraphFacebook).then((response) => {
      const { email, name } = response.data;
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            errors: [
              {
                msg: "Something went wrong...",
              },
            ],
          });
        } else {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "2d",
            });
            res.status(200).json({ token, user });
          } else {
            const newUser = new User({ name, email, userID });

            newUser.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  errors: [
                    {
                      msg: "Something went wrong...",
                    },
                  ],
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: "2d" }
              );
              res.status(200).json({ token, user: data });
            });
          }
        }
      });
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: error.message,
        },
      ],
    });
  }
};

module.exports = { facebookLogin };
