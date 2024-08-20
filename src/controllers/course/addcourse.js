const express = require('express');
const router = express.Router();
const CourseDetails = require('../../database/models/courseDetails'); 

// POST route to create a new course
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

    // Create a new course entry
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

module.exports = addcourse;
