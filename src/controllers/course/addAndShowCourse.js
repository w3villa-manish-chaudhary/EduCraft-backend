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
      rating
    } = req.body;

    
    const newCourse = await CourseDetails.create({
      course_name,
      description,
      duration,
      start_date,
      end_date,
      category,
      price,
      rating
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
    
    const courses = await CourseDetails.findAll();

    res.status(200).json({
      message: 'Courses retrieved successfully!',
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving courses',
      error: error.message
    });
  }
};

module.exports = {
  addcourse,
  showallcourse
};
