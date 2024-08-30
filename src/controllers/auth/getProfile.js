const Users = require('../../database/models/user.model');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.uniqueId; 

    // console.log("::::::::::::::::", userId);


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

module.exports = getProfile;
