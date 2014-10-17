#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

# Copy to Azure from Cloudera
USERDIR="user/jaglion"
hadoop fs -copyToLocal $OUTPUTBASE/anonymized/part-m-00000 $OUTPUTBASE/anonymized
azure storage blob upload -q $OUTPUTBASE/anonymized default "$USERDIR/$OUTPUTBASE/anonymized/part-m-00000"
azure storage blob upload -q bin/jaglion.jar default "$USERDIR/$OUTPUTBASE/jaglion.jar"
azure storage blob upload -q Configuration/MemoryDumpTranslationConfiguration.xml default "$USERDIR/$OUTPUTBASE/MemoryDumpTranslationConfiguration.xml"
azure storage blob upload -q Configuration/MemoryDumpAttributeTranslation.csv default "$USERDIR/$OUTPUTBASE/MemoryDumpAttributeTranslation.csv"
