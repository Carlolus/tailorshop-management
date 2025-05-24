#!/bin/bash

# Variables
DB_CONTAINER_NAME=bookstack_db
BACKUP_DIR=./backend/bookstack/backups
DATE=$(date +%Y-%m-%d_%H-%M-%S)
FILENAME=bookstack_backup_$DATE.sql

# Crear carpeta si no existe
mkdir -p "$BACKUP_DIR"

# Ejecutar backup dentro del contenedor y guardar en el host
docker exec "$DB_CONTAINER_NAME" \
  mysqldump -ubookstack -pbookstack bookstackapp > "$BACKUP_DIR/$FILENAME"

echo "Backup completado: $FILENAME"
