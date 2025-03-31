FROM node:18-alpine

WORKDIR /app

# Instala dependencias primero (caché eficiente)
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Puerto expuesto (debe coincidir con tu app Express)
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "dev"]