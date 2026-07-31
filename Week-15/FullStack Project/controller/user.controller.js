
const registerUser = async (req, res) =>{
    res.send('registered');
};

//login controller
const login = async (req, res) =>{
    res.send('logged In');
};

export {registerUser, login}