import db from '../models';

class UserServices {
    static async getUserById(userId) {
        const res = await db.User.findOne({where: {userId}});
        
        if(!res) return null;

        return res;
    }
}

export default UserServices;
