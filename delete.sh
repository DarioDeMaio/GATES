resourceGroup="gates"
stream_job="gatesjob"

az stream-analytics job stop --job-name $stream_job --resource-group $resourceGroup

echo "Uninstalling resource group $resourceGroup ..."
az group delete --name $resourceGroup --yes