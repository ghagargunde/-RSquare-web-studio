/* Copyright © samyak. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Samyak Ghagargunde <samyakghagargunde66@gmail.com>, November 2022
 */

const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "Rsquare_Users",
  }
);

mongoose.model("UserInfo", UserDetailsScehma);
