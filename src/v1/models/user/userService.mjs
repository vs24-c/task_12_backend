import User from './UserModel.mjs';
import CRUDManager from '../CRUDManager.mjs';

class UserService extends CRUDManager {
  constructor() {
    super(User);
  }
  async getList(filters) {
    try {
      const res = await super.getList(filters, {password: 0}, ['type']);
      return res;
    } catch (error) {
      return [];
    }
  }
}

export default new UserService(User);
