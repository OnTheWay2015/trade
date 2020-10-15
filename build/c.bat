cd

set todir=%1
@echo "copy to dir=>" %todir%
IF NOT EXIST %todir% md %todir%

copy ..\s_libs\* %todir%  /Y

set fontsdir= %todir%\fonts\
IF NOT EXIST %fontsdir% md %fontsdir%
copy ..\s_libs\fonts\*   %fontsdir% /Y