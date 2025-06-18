const { Inquiry, Property } = require('../models');

exports.submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      propertyId,
    });

    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      include: {
        model: Property,
        attributes: ['title', 'location']
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
