# Imagen base oficial de Node LTS
FROM node:18-alpine

# 1) Directorio de trabajo dentro de la imagen
WORKDIR /usr/src/app

# 2) Copiamos solo los manifests (package.json) para aprovechar la caché
COPY package*.json ./

# 3) Instalamos dependencias en modo producción
RUN npm ci --omit=dev

# 4) Copiamos el resto del código fuente
COPY . .

# 5) Puerto expuesto
EXPOSE 3001

# 6) Comando por defecto
CMD ["npm", "start"]
