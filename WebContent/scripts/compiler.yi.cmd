@echo off
rem Author Ambrose Xu (Xu Jiangwei)

java -jar ../tools/splicer.jar ../lib/core/yi/yi.js ../lib/core/yi/src/intro.js ../lib/core/yi/src/base.js ../lib/core/yi/src/mod.js ../lib/core/yi/src/outro.js

rem WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS | ADVANCED_OPTIMIZATIONS
java -jar ../tools/compiler.jar --compilation_level WHITESPACE_ONLY --charset UTF-8 --js=../lib/core/yi/yi.js --js_output_file=../lib/core/yi/yi.min.js

echo.
echo Press any key.
pause > nul
