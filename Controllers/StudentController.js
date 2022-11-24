const db = require("../config/database");
const Student = require("../Models/Student");
const Joi = require("joi");

const addStudent = async (req, res) => {
  try {
    const reqData = req.body;
    reqData.image = req?.file?.path;
    const result = addStudentSchema.validate(reqData);
    if (result.error) {
      return res.status(422).json({
        errors: [
          {
            value: result.error.details[0].context.value,
            msg: result.error.message,
            param: result.error.details[0].context.key,
            location: "body",
          },
        ],
      });
    }
    console.log(reqData.image);
    let student = await Student.create({
      name: reqData.name,
      physics: reqData.physics,
      chemistry: reqData.chemistry,
      maths: reqData.maths,
      image: reqData.image,
    });

    return res.status(200).json({
      student,
      meta: {
        msg: "Student Added Successfully.",
      },
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Internal Server Error",
        },
      ],
    });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const { page } = req.query;

    const students = await Student.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }, { $addFields: { page: page } }],
          data: [{ $skip: (page - 1) * 10 }, { $limit: 10 }],
        },
      },
    ]);

    return res.status(200).json(students);
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Internal Server Error",
        },
      ],
    });
  }
};

const removeStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({ _id: id }).remove();

    return res.status(200).json({
      student,
      meta: {
        msg: "Student Removed Successfully.",
      },
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Internal Server Error",
        },
      ],
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, physics, chemistry, maths } = req.body;

    const obj = {
      name,
      physics,
      chemistry,
      maths,
    };

    const result = updateStudentSchema.validate(obj);
    if (result.error) {
      return res.status(422).json({
        errors: [
          {
            value: result.error.details[0].context.value,
            msg: result.error.message,
            param: result.error.details[0].context.key,
            location: "body",
          },
        ],
      });
    }
    if (req?.file?.path) obj["image"] = req.file.path;

    const student = await Student.findOneAndUpdate({ _id: id }, obj, {
      new: true,
    });

    return res.status(200).json({
      student,
      meta: {
        msg: "Student Updated Successfully.",
      },
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Internal Server Error",
        },
      ],
    });
  }
};

const addStudentSchema = Joi.object().keys({
  name: Joi.string().required(),
  physics: Joi.number().required(),
  chemistry: Joi.number().required(),
  maths: Joi.number().required(),
  image: Joi.string().required(),
});

const updateStudentSchema = Joi.object().keys({
  name: Joi.string().required(),
  physics: Joi.number().required(),
  chemistry: Joi.number().required(),
  maths: Joi.number().required(),
});

module.exports = {
  addStudent,
  updateStudent,
  getAllStudent,
  removeStudent,
};
