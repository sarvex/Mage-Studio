#!/bin/bash

#building templates
./haml.sh

#removing old app
#rm -r app.nw

#zipping new app
#zip -r -X app.nw . -x \*.git\*

#launching nw app
#nw app.nw
#open app.nw
npm start
