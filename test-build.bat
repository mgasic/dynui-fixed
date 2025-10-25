@echo off
echo Testing direct turbo command...
turbo build --verbosity=2
echo.
echo Testing individual package build...
cd packages\core
npm run build
echo.
echo Listing dist contents...
dir dist
cd ..\..
echo Done!