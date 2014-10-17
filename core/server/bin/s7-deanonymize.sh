#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

# Deanonymize
java -classpath "`hbase classpath`/usr/lib/pig/pig.jar:/usr/lib/hadoop/lib/commons-code-1.4.jar" org.apache.pig.Main -param input="$OUTPUTBASE/translated" -param output="$OUTPUTBASE/deanonymized" DXTEDUDF/deanonymize-translated.pig