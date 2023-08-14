const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {User, Login}  = require("../model");

const signup = async function (req, res) {
  try {
    const {firstName, lastName, email, password, empId, gender, cnic, phone, role, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        empId,
        gender,
        cnic,
        phone,
        role,
        address
    });

    // Create a JWT token
    const token = jwt.sign({ empId: user.empId, email: user.email }, process.env.SECRET_KEY, {expiresIn: '1h'});
      
    return res.status(201).json({
      status: 201,
      message: "User Added successfully",
      result: {email: user.email, empId: user.empId},
      token,
    });
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "User Not Added!",
      error: err,
    });
  }
};

const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user === null) {
      return res.status(404).json({
        status: 404,
        message: "Email does not exist"
      });
    } else if (email === user.email && passwordMatch) {
      // email === user.email && password === user.password
      const token = jwt.sign({ email: email, roles: user.role }, process.env.SECRET_KEY, {expiresIn: '10m'});

      await Login.create({
        cnic: user.cnic,
        password: password,
        role: user.role
      })

      return res.status(200).json({
        status: 200,
        message: "logged in !",
        token: token,
      });

    } else {
      return res.status(401).json({
        status: 401,
        message: "check your email and password"
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      err,
    });
  }
};

const sayHello = async function (req, res) {
  // remove iat
  delete req.user.iat;

  return res.status(200).json({
    status: 200,
    message: "Working Success",
    user: req.user,
  });
};

const getUsers = async function (req, res) {
  try {
    const user = await User.findAll();

    if (user.length == 0) {
      return res.status(404).json({
        status: 404,
        message: "Users doesnot exist",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "List of users",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

const user = async function (req, res) {
  try {
    const userId = req.params.userId;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

const updateUser = async function (req, res) {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const hashedPassword = await bcrypt.hash(updatedData.password, 10);
    updatedData['password']=hashedPassword;

    const user = await User.findByPk(userId);
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found' 
      });
    }

    await user.update(updatedData);
    // console.log('Data updated successfully');
    res.status(202).json({ 
      status: 202,
      message: 'Data updated successfully' 
    });
  } catch (err) {
    // console.error('Error updating data:', err);
    res.status(500).json({ 
      status: 500,
      message: 'Server error' 
    });
  }
};

const deleteUser = async function (req, res) {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    await user.destroy();
    // console.log('User Removed successfully');
    res.status(202).json({ 
      status: 202,
      message: 'User Removed successfully' 
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

module.exports={
  signup,
  login,
  sayHello,
  getUsers,
  user,
  updateUser,
  deleteUser
}
