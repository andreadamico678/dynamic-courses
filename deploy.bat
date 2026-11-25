@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\deploy.ps1" %*
if errorlevel 1 (
  echo.
  echo Deploy failed with error code %errorlevel%.
  pause
  exit /b %errorlevel%
)
pause
