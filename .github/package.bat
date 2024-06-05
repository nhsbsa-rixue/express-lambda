@echo off

echo Creating zip archive...
powershell -Command "7z a -tzip 'deploy\lambda.zip' 'src\' 'node_modules\'"

echo Zip archive created.

pause