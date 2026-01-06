//  if(!req.body){
//         res.status(401).json({message : `There is no data in body.`});
//         return ;
//     };

//     if(!req.body.firstName){
//       res.status(401).json({message : `firstName is required.`});
//         return ;
//     }
//     if(!req.body.lastName){
//       res.status(401).json({message : `lastName is required.`});
//         return ;
//     }
//     if(!req.body.email){
//       res.status(401).json({message : `Email is required.`});
//         return ;
//     }
//     if(!req.body.phone){
//         res.status(401).json({message : `phone is required.`});
//         return ;
//     }
//     if(!req.body.rePassword){
//       res.status(401).json({message : `rePassword is required.`});
//         return ;
//     }
//     if(!req.body.password){
//         res.status(401).json({message : `password is required.`});
//         return ;
//     } ;
//     if(req.body.password !== req.body.rePassword){
//         res.status(400).json({message : "passwords don't match ." })
//     }

///////////////////////////////////////////////////////////////////////////
// auth.service.js

// import ApiError from "../../utils/apiError.js";

import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const register = async (data) => {
  const isEmailExist = await userModel.findOne({ email: data.email });
  if (isEmailExist) {
    // throw new ApiError("Email already exists", 409);
    // what if i need to do this : res.status(409).json({message :"Email is already exist"}) ?!
    // because here he recive data (which is body directly) not all req or res ?
    return;
  }

  // he hashed password directly witjout any validation here even not make validate if password exist or not ; 
  // so where he validate / check  it ?! 

  const hashedPassword = await bcrypt.hash(data.password, 12);

  await userModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
  });
};

export const login = async (data) => {
  const user = await userModel.findOne({ email: data.email });
  if (!user) {
    // throw new ApiError("Invalid email or password", 401);
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    // throw new ApiError("Invalid email or password", 401);
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign({ id: user._id }, "aaa", { expireIn: "7d" });
  return token;
};

export const signInWithGoogle = async (data) => {
  const filter = { fieldToFind: data.email };
  const update = { otherField: data.email };
  const options = {
    upsert: true,      // Create the document if it doesn't exist
    new: true,         // Return the document *after* update/creation
    runValidators: true // Run schema validators on the update
  };

  const user = await MyModel.findOneAndUpdate(filter, update, options);
  const token = jwt.sign({id : user._id} , "aaa" , {expiresIn : "1d"}) ;
  return token ;

}
