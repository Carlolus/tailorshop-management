const { User } = require("../models"); 

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

exports.getUserById = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

exports.createUser = async (req, res) => {
    try {
      const { name, mail, password } = req.body;
  
      const user = await User.create({
        name,
        mail,
        password,
      });
  
      res.status(201).json({
        message: "Usuario creado exitosamente",
        data: user,
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({
        message: "Error al crear el usuario",
        error: error.message,
      });
    }
  };

exports.updateUser = async (req, res) => {
  const { user_id } = req.params; 
  const { name, mail, password } = req.body;

  try {
    const user = await User.findByPk(user_id); 
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.name = name || user.name;
    user.mail = mail || user.mail;
    user.password = password || user.password;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

exports.deleteUser = async (req, res) => {
  const { user_id } = req.params; // UUID

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
