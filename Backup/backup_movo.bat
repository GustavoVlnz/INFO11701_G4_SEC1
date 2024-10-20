@echo off
set DB_NAME=MOVO
set USER=acarrasco
set PASSWORD=Hellovro2019@
set HOST=mysql.inf.uct.cl
set BACKUP_DIR=C:\path\to\backup\directory
set BACKUP_FILE=%BACKUP_DIR%\%DB_NAME%_%date:~10,4%%date:~4,2%%date:~7,2%.sql

REM Crear el directorio de backup si no existe
if not exist %BACKUP_DIR% (
    mkdir %BACKUP_DIR%
)

REM Hacer el backup
mysqldump -u %USER% -p%PASSWORD% -h %HOST% %DB_NAME% > %BACKUP_FILE%

echo Backup realizado exitosamente en %BACKUP_FILE%
pause
