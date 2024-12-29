import UserService from "../models/user/userService.mjs";
import {validationResult} from 'express-validator';

class UserController {
  static async usersList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }

      const dataList = await UserService.getList(filters);
      res.status(200).json({
        users: dataList,
        user: req.user,
      });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }

  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let user = null;
      if (id) {
        user = await UserService.getById(id);
      };

      res.status(200).json({
        errors: [],
        data: user,
        types,
        user: req.user,
      });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }

  static async registerUser(req, res) {
    const errors = validationResult(req);
    const data = req.body;

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).json({
        errors: errors.array(),
        data,
        types,
        user: req.user,
      });
    }

    try {
      if (req.params.id) {
        await UserService.update(req.params.id, dataObj);
      } else {
        await UserService.create(dataObj);
      }

      res.status(200).json({message: 'User registered successfully'});
    } catch (err) {
      res.status(500).json({
        errors: [{msg: err.message}],
        data,
        types,
        user: req.user,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      await UserService.deleteById(req.body.id);
      res.status(200).json({success: true});
    } catch (error) {
      res.status(500).json({success: false, message: 'Failed to delete user'});
    }
  }
}

export default UserController;
