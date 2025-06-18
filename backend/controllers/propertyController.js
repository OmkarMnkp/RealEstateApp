const { Property } = require('../models');

exports.getAll = async (req, res) => {
  const properties = await Property.findAll();
  res.json(properties);
};

exports.create = async (req, res) => {
  try {
    const { title, price, location, description, type } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user data found" });
    }

    const property = await Property.create({
      title,
      price,
      location,
      description,
      type,
      imageUrl,
      ownerId: req.user.id,
    });

    res.status(201).json(property);
  } catch (err) {
    console.error("Error in Property Create:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await Property.update(req.body, { where: { id } });
  res.json({ message: 'Updated successfully' });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Property.destroy({ where: { id } });
  res.json({ message: 'Deleted successfully' });
};

exports.markInterest = async (req, res) => {
  const { id } = req.params;
  const userEmail = req.user.email;

  const property = await Property.findByPk(id);
  if (!property) return res.status(404).json({ message: 'Not found' });

  const updatedList = Array.from(new Set([...(property.interestedUsers || []), userEmail]));
  property.interestedUsers = updatedList;
  await property.save();

  res.json({ message: 'Interest marked', interestedUsers: property.interestedUsers });
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    console.error("Error in getPropertyById:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
