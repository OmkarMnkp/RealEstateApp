const GeneralInquiry = require("../models/generalInquiry");


exports.submitGeneralInquiry = async (req, res) => {
  try {
    const { inquiryType, name, email, phone, message } = req.body;

    const inquiry = await GeneralInquiry.create({
      inquiryType,
      name,
      email,
      phone,
      message,
    });

    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllGeneralInquiries = async (req, res) => {

  try {
    const inquiries = await GeneralInquiry.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
