@echo off
rem author: Ambrose Xu (Xu Jiangwei)

echo Start compile console ...

rem CL: WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS | ADVANCED_OPTIMIZATIONS
java -jar ../tools/compiler.jar --compilation_level WHITESPACE_ONLY --charset UTF-8 --js=../lib/core/console/console.js --js_output_file=../lib/core/console/console.min.js

java -jar ../tools/yuicompressor-2.4.8.jar ../lib/core/console/console.css -o ../lib/core/console/console.min.css --type css --charset utf-8 -v

echo.
echo Press any key to quit.
pause > nul
