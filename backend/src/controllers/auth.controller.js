const supabase = require('../services/supabase');

async function getUsers(req, res) {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
}

module.exports = {
  getUsers
};
