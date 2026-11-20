const supabase = require('./supabase.service');

const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

const createUser = async (user) => {
    const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select();
        
    if (error) {
        throw error;
    }

    return data;
}

module.exports = {
  getAllUsers,
  createUser
};