#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

# Anonymize
java -classpath "`hbase classpath`/usr/lib/pig/pig.jar:/usr/lib/hadoop/lib/commons-code-1.4.jar" org.apache.pig.Main -param input="$OUTPUTBASE/extracted" -param output="$OUTPUTBASE/anonymized" DXTEDUDF/anonymize.pig

if [ ! -x $OUTPUTBASE ]; then
    mkdir -p $OUTPUTBASE
fi