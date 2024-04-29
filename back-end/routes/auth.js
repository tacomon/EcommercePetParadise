const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const crypto = require('crypto');
const { enviarCorreoRestablecimientoContrasena,enviarCorreoInicioSesion,enviarCorreoRegistro} = require('../utils/email');

// Ruta de registro de usuarios
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario({
      nombre,
      email,
      password
    });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar el usuario
    await usuario.save();

    // Generar token JWT
    const payload = { usuario: { id: usuario.id, rol: usuario.rol } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token por correo electrónico
    try {
      await enviarCorreoRegistro(email, token);
      console.log('Token enviado al correo electrónico:', email);
    } catch (error) {
      console.error('Error al enviar el token por correo electrónico:', error);
    }

    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta de login de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    // Verificar la contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar token de autenticación
    const payload = {
      usuario: {
        id: usuario.id,
        rol: usuario.rol
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 60 // 1 min
      },
      async (error, token) => {
        if (error) throw error;

        // Enviar el token por correo electrónico
        try {
          await enviarCorreoInicioSesion(email, token);
          console.log('Token enviado al correo electrónico:', email);
        } catch (error) {
          console.error('Error al enviar el token por correo electrónico:', error);
        }

        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});


router.post('/recover-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    // Genera un token de recuperación
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Guarda el token en la base de datos
    usuario.resetToken = resetToken;
    usuario.resetTokenExpiry = Date.now() + 3600000; // Token válido por 1 hora
    await usuario.save();

    // Envía el token por correo electrónico al usuario
    await enviarCorreoRestablecimientoContrasena(email, resetToken);

    res.json({ msg: 'Token de recuperación enviado al correo electrónico' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    // Actualizar la contraseña del usuario
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.resetToken = null; // Puedes eliminar estas líneas si ya no las necesitas
    usuario.resetTokenExpiry = null; // Puedes eliminar estas líneas si ya no las necesitas
    await usuario.save();

    res.json({ msg: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});
module.exports = router;