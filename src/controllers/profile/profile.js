const Users = require('../../database/models/user.model');

const getUserProfile = async (req, res) => {
  try {
    // const userId = req.body.uniqueId
    const userId = req.user.uniqueId; 

      

    console.log("::::::::::::::::", userId);


    const user = (await Users.findOne({
      where: { uniqueId: userId },
      attributes: ['uniqueId', 'name', 'mobileNumber' , 'email'] 
      }));

     
 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("::::::::::::::::>>>>>>>>>>>", user.dataValues);


 
    res.status(200).json({
      message: 'User profile fetched successfully',
      user
      
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





const updateUserProfile = async (req, res) => {
    try {
        // const userId = req.query.uniqueId; // use req.query for PUT requests
    const userId = req.user.uniqueId; 



      const {name, mobileNumber, email } = req.body;
  
      const [updated] = await Users.update(
        { name, mobileNumber, email },
        { where: { uniqueId: userId } }
      );
  
      if (updated) {
        const updatedUser = await Users.findOne({ where: { uniqueId: userId } });
        return res.status(200).json({
          message: 'User profile updated successfully',
          user: updatedUser
        });
      }
      
      throw new Error('User not found');
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
//   export default async function handler(req, res) {
//     switch (req.method) {
//       case 'GET':
//         return getUserProfile(req, res);
//       case 'PUT':
//         return updateUserProfile(req, res);
//       default:
//         res.setHeader('Allow', ['GET', 'PUT']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }













module.exports = {getUserProfile, updateUserProfile};
