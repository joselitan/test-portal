const supabase = require('./supabase.service');

const loginUser = async (email, password) => {
    const { data,error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single();
    
    if (error) {
        throw error;
    }

    return data;
};

module.exports = {
    loginUser
}