// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getAllBootcamps = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Show all bootcamps",
  });
};

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: `Get bootcamp ${req.params.id}`,
  });
};

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Create new bootcamp",
  });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: `Update bootcamp ${req.params.id}`,
  });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(504).json({
    status: "success",
    message: `Delete bootcamp ${req.params.id}`,
  });
};
