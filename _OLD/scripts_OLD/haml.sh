#!/bin/bash

#building index
rm -rf index.html
haml index.haml index.html

#listing every template in /views folder
for entry in "views"/*.haml
do
    if [ -f "$entry" ]
        then
            echo "creating $entry"
            sost=${entry/haml/html}
            rm -rf $sost
            haml $entry $sost
            echo ".. done."
            #view=(${entry//.haml/} )
            #haml ${view[0]}.haml ${view[0]}.html
    fi
done

echo "Operation completed."
