const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/response");
const verifyGoogleToken = require("../utils/googleAuth");

exports.register = async (req, res) => {
  const { email, password, role, name } = req.body;
  const userExist = await User.findOne({email})
  if(userExist){
    return errorResponse(res,"User already exist")
  }
  const user = new User({ email, password, role, name });
  await user.save();
  return successResponse(res, "User registered successfully", {user, token: generateToken(user)}, 201);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (user && await user.matchPassword(password)) {
    return successResponse(res, "User logged in successfully", {user, token: generateToken(user)});
  } else {
    return errorResponse(res, "Invalid credentials", 401);
  }
};

exports.googleLogin =  async (req, res) => {
  const { id_token, access_token } = req.body;

  if (!id_token && !access_token) return errorResponse(res, 'No token provided', 400);

  try {
    let googleUser;
    
    if (id_token) {
      // Handle ID token (for library-provided button)
      googleUser = await verifyGoogleToken(id_token);
    } else {
      // Handle access token (for custom button with useGoogleLogin)
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info from Google');
      }
      
      const userInfo = await userInfoResponse.json();
      googleUser = {
        googleId: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      };
    }
    
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        email: googleUser.email,
        name: googleUser.name,
        profilePicture: googleUser.picture,
        provider: 'google',
        role: 'user',
      });
    }
    const accessToken = generateToken(user);
    return successResponse(res, 'Logged in via Google', {user, token: accessToken});
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Google auth failed', 401);
  }
}

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, 'User verified', { user });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Error verifying user', 500);
  }
}

exports.convertToAdmin = async (req, res) => {
  const {id} = req.body;
  const user = await User.findById(id);
  if(!user){
    return errorResponse(res, 'User not found', 404);
  }
  user.role = 'admin';
  await user.save();
  const accessToken = generateToken(user);
  return successResponse(res, 'User converted to admin', {user, token: accessToken});
}