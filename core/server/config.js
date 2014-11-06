var config = {

    // Folder Configuration
    inputDirectory: process.env.inputDirectory || '',
    outputDirectory: process.env.outputDirectory || '',

    // HDInsight Config
    clusterName: process.env.clusterName || '',
    clusterLocation: process.env.clusterLocation || '',
    clusterUsername: process.env.clusterUsername || '',
    clusterPassword: process.env.clusterPassword || '',
    clusterNodes: process.env.clusterNodes || 0,
    storageAccountName: process.env.storageAccountName || '',
    storageAccountKey: process.env.storageAccountKey || '',
    storageAccountContainer: process.env.storageAccountContainer || '',

    // XML Extractor
}

module.exports = config;