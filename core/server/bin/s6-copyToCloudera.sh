#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

# Copy back to Cloudera from Azure
mkdir -p $OUTPUTBASE/translated
azure storage blob download -q default "$USERDIR/$OUTPUTBASE/translated/part-r-00000" $OUTPUTBASE/translated/part-r-00000
hadoop fs -mkdir $OUTPUTBASE/translated
hadoop fs -copyFromLocal $OUTPUTBASE/translated/part-r-00000 $OUTPUTBASE/translated/part-r-00000
