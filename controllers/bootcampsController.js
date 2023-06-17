const Bootcamp = require("../models/bootcampModel");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getAllBootcamps = async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    status: "success",
    count: bootcamps.length,
    data: bootcamps,
  });
};

exports.getBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) return res.status(400).json({ success: false });

  res.status(200).json({
    status: "success",
    data: bootcamp,
  });

  res.status(400).json({ success: false });
};

exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(200).json({
    status: "success",
    data: bootcamp,
  });
};

exports.updateBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) return res.status(400).json({ success: false });

  res.status(200).json({
    status: "success",
    data: bootcamp,
  });
};

exports.deleteBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) return res.status(400).json({ success: false });

  res.status(504).json({
    status: "success",
    message: `Deleted bootcamp ${req.params.id}`,
  });
};
