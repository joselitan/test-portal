const supabase = require('./supabase.service');

const findAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

const createUserRecord = async (user) => {
    const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select();
        
    if (error) {
        throw error;
    }

    return data;
};

const findUserById = async (id) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) {
        throw error;
    }

    return data;
}

const updateUserRecord = async (id, updates) => {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if(error){
        throw error;
    }

    return data;
};

const deleteUserRecord = async (id) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        throw error;
    }

    return data;
};

module.exports = {
  findAllUsers,
  createUserRecord,
  findUserById,
  updateUserRecord,
  deleteUserRecord
};