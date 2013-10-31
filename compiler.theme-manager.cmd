@echo off
rem author: Ambrose Xu (Xu Jiangwei)

echo Start compile files...

rem Splice source files
rem java -jar ./tools/splicer.jar ./lib/modules/misc/theme-manager.js

rem CL: WHITESPACE_ONLY | SIMPLE_OPTIMIZATIONS | ADVANCED_OPTIMIZATIONS
java -jar ./tools/compiler.jar --compilation_level WHITESPACE_ONLY --charset UTF-8 --js=./lib/modules/misc/theme-manager.js --js_output_file=./lib/modules/misc/theme-manager.min.js

echo.
echo Press any key.
pause > nul
