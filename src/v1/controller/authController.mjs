import User from '../models/user/UserModel.mjs';
import UserService from '../models/user/userService.mjs';
import {prepareToken} from '../../../utils/jwtHelpers.mjs';

class AuthController {
  static async signup(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({error: 'Email and password are required'});
      }
      const existingUser = await User.findOne({email: req.body.email});
      if (existingUser) {
        return res.status(400).json({error: 'User already exists'});
      }

      const user = new User({
        email: req.body.email,
        password: req.body.password, 
      });

      const savedUser = await user.save();

      const token = prepareToken(
        {
          id: savedUser._id,
          email: savedUser.email,
        },
        req.headers
      );

      res.status(201).json({
        token,
      });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({error: 'Signup error'});
    }
  }

  static async login(req, res) {

    if (!req.body.email) {
      return res.status(401).json({error: 'Email is required'});
    }
    if (!req.body.password) {
      return res.status(401).json({error: 'Password is required'});
    }

    try {
      const user = await UserService.findOne({
        email: req.body.email,
      });      
      if (!user) {
        return res.status(401).json({error: 'User not found'});
      }

      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({error: 'Login error'});
      }
      const token = prepareToken(
        {
          id: user._id,
          userName: user.userName,
        },
        req.headers
      );
      res.status(200).json({
        result: 'Authorized',
        token,
      });
    } catch (err) {
      res.status(401).json({error: 'Login error'});
    }
  }
}

export default AuthController;
