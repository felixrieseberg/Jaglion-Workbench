#!/usr/bin/env sh
#

# Input arguments
DATADIR="$1"
CONFIGDIR="$2"
OUTPUTBASE="$3"

azure hdinsight cluster config create './jaglion.config'
azure hdinsight cluster config set "./jaglion.config" --clusterName "%clusterName%" --nodes %clusterNodes% --location "%clusterLocation%" --storageAccountName "%storageAccountName%" --storageAccountKey "%storageAccountKey%" --storageContainer "%storageContainer%" --username '%clusterUsername%' --clusterPassword "%clusterPassword%"
azure hdinsight cluster create --config './jaglion.config'