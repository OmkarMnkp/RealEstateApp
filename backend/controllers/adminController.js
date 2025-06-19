// admin controller
const { User, Property } = require('../models');

exports.getOverview = async (req, res) => {
  const totalUsers = await User.count();
  const totalProperties = await Property.count();
  const totalInteractions = await Property.findAll().then((props) =>
    props.reduce((acc, p) => acc + (p.interestedUsers?.length || 0), 0)
  );

  res.json({ totalUsers, totalProperties, totalInteractions });
};


