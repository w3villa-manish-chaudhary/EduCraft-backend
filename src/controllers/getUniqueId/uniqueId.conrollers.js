const Users  = require('../../database/models/user.model');


const fetchByUniqueId = async (req, res) => {
  const { uniqueId } = req.params; 

  console.log(":::::::::::::::::::::::>>>>>>>>>>>>>",uniqueId);

  try {
    const user = await Users.findOne({
      where: { uniqueId: uniqueId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by uniqueId:', error);
    res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
  }
};

module.exports = 
  fetchByUniqueId;