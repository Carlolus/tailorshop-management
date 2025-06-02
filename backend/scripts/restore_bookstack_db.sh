#!/bin/bash

# === Configuración ===
DB_CONTAINER="bookstack_db"
DB_NAME="bookstackapp"
DB_USER="bookstack"
DB_PASSWORD="bookstack"
BACKUP_DIR="../bookstack/backups"

# === Verificación de argumentos ===
if [ -z "$1" ]; then
  echo "Debes especificar el nombre del archivo de respaldo."
  echo "Ejemplo: ./restore_bookstack_db.sh bookstack_backup_2025-05-21_12-00-00.sql"
  exit 1
fi

BACKUP_FILE="$BACKUP_DIR/$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "El archivo '$BACKUP_FILE' no existe."
  exit 1
fi

echo "Esto eliminará los datos actuales en la base de datos '$DB_NAME' y los reemplazará con el contenido del respaldo."
read -p "¿Estás seguro? (escribe 'si' para continuar): " confirm

if [ "$confirm" != "si" ]; then
  echo "Operación cancelada."
  exit 0
fi

# === Restauración ===
echo "Restaurando la base de datos desde $BACKUP_FILE..."

docker exec -i "$DB_CONTAINER" mysql -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Restauración completada exitosamente."
else
  echo "Error durante la restauración."
fi
