# Arquitectura Servidor Ecommerce

Este proyecto implementa las mejoras solicitadas en la consigna:
1. **Patrón Repository**: Capa de DAO (`daos/`) desacoplada mediante Repositorios (`repositories/`).
2. **Ruta `/current` con DTO**: Filtra datos sensibles y retorna solo campos seguros (`dtos/user.dto.js`).
3. **Recuperación de Contraseña**:
   - Envío de mail con botón/enlace vía Nodemailer (`services/mailing.service.js`).
   - Token con expiración estricta de 1 hora (`jwt.sign` con `{ expiresIn: '1h' }`).
   - Validación que impide restablecer la contraseña a la misma que ya poseía (`bcrypt.compare`).
4. **Middleware de Autorización (`auth.middleware.js`)**:
   - Solo `admin` puede crear, actualizar y borrar productos (`/api/products`).
   - Solo `user` puede agregar productos a su carrito (`/api/carts`).
5. **Arquitectura Profesional**:
   - Variables de entorno centralizadas (`config/env.config.js`).
   - Estructura limpia (Controllers, Routes, DAOs, Repositories, DTOs, Middlewares, Services).

## Instalación
```bash
npm install
cp .env.example .env
npm run dev
```
