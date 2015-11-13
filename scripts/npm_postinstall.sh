#! /bin/bash
pushd node_modules/modernizr > /dev/null
bin/modernizr -c lib/config-all.json
popd > /dev/null
