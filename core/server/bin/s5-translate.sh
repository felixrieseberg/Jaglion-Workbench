#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

# Translate in HDInsight
JOBID=$(curl -u %storageusername%:%storagepassword% -d user.name=%storageusername% -d mdt.attribute_file_delimeter=\; -d mdt.dump_index=4 -d mdt.additional_info_index_delimeter=\; -d mdt.additional_info_index=0\;2\;3 -d mdt.output_file_delimiter=\, -d mdt.input_file_delimeter=\; -d jar=$OUTPUTBASE/%storageusername%.jar -d hdInsightJobName=$OUTPUTBASE -d arg=$OUTPUTBASE/anonymized -d arg=$OUTPUTBASE/translated -d arg=$OUTPUTBASE/MemoryDumpTranslationConfiguration.xml -d arg=$OUTPUTBASE/MemoryDumpAttributeTranslation.csv -d statusdir=$OUTPUTBASE -d callback=null -d class=%storageusername%.MemoryDumpTranslator 'https://%storageusername%3.azurehdinsight.net/templeton/v1/mapreduce/jar' | jsawk 'return this.id')

# Loop checking on job until it's finished
STATUS=$(curl -u %storageusername%:%storagepassword% -s user.name=%storageusername% https://jaglion3.azurehdinsight.net/templeton/v1/jobs/$JOBID?user.name=%storageusername% | jsawk 'return this.status.state')

while [ "$STATUS" != "SUCCEEDED" ]; do
    STATUS=$(curl -u %storageusername%:%storagepassword% -s user.name=%storageusername% https://jaglion3.azurehdinsight.net/templeton/v1/jobs/$JOBID?user.name=%storageusername% | jsawk 'return this.status.state')
done