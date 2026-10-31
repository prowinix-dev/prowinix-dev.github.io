@echo off
chcp 65001 >nul
rem Met en ligne les modifications du portfolio sur https://prowinix-dev.github.io
cd /d "%~dp0"
title Publier le portfolio
echo.
echo  Envoi des modifications du portfolio sur GitHub...
echo.
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" diff --cached --quiet
if %errorlevel%==0 (
  echo  Aucune modification a publier.
) else (
  "C:\Program Files\Git\cmd\git.exe" commit -q -m "Mise a jour du portfolio"
)
"C:\Program Files\Git\cmd\git.exe" push -u origin main
if %errorlevel%==0 (
  echo.
  echo  ==============================================================
  echo   C'est envoye ! Le site sera a jour dans 1 a 2 minutes :
  echo   https://prowinix-dev.github.io
  echo  ==============================================================
) else (
  echo.
  echo  Il y a eu un probleme pendant l'envoi. Copie ce message a Claude.
)
echo.
pause
