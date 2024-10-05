const db = require('../config/db'); // Conexión a la base de datos

// Iniciar sesión
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por email en la base de datos
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }

        const user = result[0];

        // Redirigir según el rol del usuario
        switch (user.role) {
            case 'administrador':
                return res.redirect('/admin/dashboard');
            case 'proveedor':
                return res.redirect('/proveedor/dashboard');
            case 'cliente':
                return res.redirect('/cliente/dashboard');
            default:
                return res.status(403).send('Rol no permitido');
        }
    });
};
