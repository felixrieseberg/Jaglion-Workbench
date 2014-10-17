#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

# Extract from raw logs
hadoop jar bin/jaglion.jar Jaglion.XmlParser $DATADIR $OUTPUTBASE/extracted Configuration/XmlExtraction.xml