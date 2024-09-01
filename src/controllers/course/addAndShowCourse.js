const CourseDetails = require('../../database/models/courseDetails'); 

const addcourse = async (req, res) => {
  try {
    const {
      course_name,
      description,
      duration,
      start_date,
      end_date,
      category,
      price,
      rating,
      trainer,
      oldprice,
      rating_count
    } = req.body;

    
    const newCourse = await CourseDetails.create({
      course_name,
      description,
      duration,
      start_date,
      end_date,
      category,
      price,
      rating,
      trainer,
      oldprice,
      rating_count
    });

    res.status(201).json({
      message: 'Course created successfully!',
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating course',
      error: error.message
    });
  }
};




const showallcourse = async (req, res) => {
  try {
    console.log("::::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<",req.user);



    
    const courses = await CourseDetails.findAll();

    res.status(200).json({
      message: 'Courses retrieved successfully!',
      data: courses, 
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving courses',
      error: error.message
    });
  }
};







const fetchByUniqueId = async (req, res) => {
  const { uniqueId } = req.params; 

  console.log(":::::::::::::::::::::::>>>>>>>>>>>>>",uniqueId);

  try {
    const Details = await CourseDetails.findOne({
      where: { uniqueId: uniqueId }
    });

    if (!Details) {
      return res.status(404).json({ message: 'CourseDetails not found' });
    }

    res.status(200).json(Details);
  } catch (error) {
    console.error('Error fetching user by uniqueId:', error);
    res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
  }
};







module.exports = {
  addcourse,
  showallcourse,
  fetchByUniqueId
};
