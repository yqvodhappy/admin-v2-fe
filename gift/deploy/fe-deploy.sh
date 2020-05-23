# @Author: Dtvikey
# @Date:   2019-11-28 15:56:20
# @Last Modified by:   Dtvikey
# @Last Modified time: 2020-05-23 12:27:38
#!/bin/sh

GIT_HOME=/developer/git-repository/
DEST_PATH=/film/frontend/

if [ ! -n "$1" ];
then
    echo -e "Please input a project name! You can input as follows:"
    echo -e "./fe-deploy2.sh yqvod-fe"
    echo -e "./fe-deploy2.sh admin-v2-fe"
    exit
fi

if [ $1 = "admin-v2-fe" ];
then
    echo -e "------------Enter Project----------"
    cd $GIT_HOME$1
elif [ $1 = "yqvod-fe" ];
    then
    echo -e "------------Enter Project----------"
    cd $GIT_HOME$1
else
    echo -e "Invalid Project Name!"
    exit
fi

# clean dist
echo -e "------------Clean Dist----------"
rm -rf ./dist

echo -e "------------Git Pull----------"
git pull

echo -e "------------Yarn Install----------"
yarn

echo -e "------------Yarn Run Dist----------"
yarn run dist

if [ -d "./dist" ];
then
    echo -e "------------clean Dest----------"
    sudo rm -rf $DEST_PATH/dist

    echo -e "------------copy Dest----------"
    sudo cp -R ./dist $DEST_PATH/$1/

    echo -e "------------Deploy Success----------"
else
    echo -e "------------Deploy Fail----------"

fi



