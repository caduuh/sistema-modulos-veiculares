@echo off
cd /d "%~dp0"
start "" /B node server.js
start "" http://127.0.0.1:8891
