@echo off
rem Author Ambrose Xu (Xu Jiangwei)

echo Start compile yi ...

java -jar ../tools/splicer.jar ../lib/core/yi/yi.js ../lib/core/yi/src/intro.js ../lib/core/yi/src/base.js ../lib/core/yi/src/mod.js ../lib/core/yi/src/outro.js

rem WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS | ADVANCED_OPTIMIZATIONS
java -jar ../tools/compiler.jar --compilation_level WHITESPACE_ONLY --charset UTF-8 --js=../lib/core/yi/yi.js --js_output_file=../lib/core/yi/yi.min.js

java -jar ../tools/yuicompressor-2.4.8.jar ../lib/core/yi/yi.css -o ../lib/core/yi/yi.min.css --type css --charset utf-8 -v

echo.
echo Press any key.
pause > nul
