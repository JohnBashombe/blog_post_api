import UserServices from "../../database/services/userServices";

class UserControllers {

    static async findOneUser(req, res) {
       try {
        const userId = req.params.id;

        const response =  await UserServices.getUserById(userId);
         
        if(!response) {
            res.send('Not user');
        }

        res.send({...response});

       } catch (error) {
           console.log(error);
       }

    }

}

export default UserControllers;