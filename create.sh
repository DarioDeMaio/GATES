location="westeurope"
resourceGroup="gates"
server="gates"
shadowDB="gatesShadow"
database="gates"
login="gates"
password="Giulia-dario1"
iot_hub="gates-iot-hub"
function_app="gatess"
storage_account="gaates"
stream_job="gatesjob"
IOT_HUB_POLICY_NAME="iothubowner"
static_web_app="gates_web_app"
static_web_app_env="preview"
startIp=0.0.0.0
endIp=255.255.255.255

az login

az group create --name $resourceGroup --location $location

az sql server create --name $server --resource-group $resourceGroup --location "$location" --admin-user $login --admin-password $password

echo "Configuring firewall..."
az sql server firewall-rule create --resource-group $resourceGroup --server $server --start-ip-address $startIp --end-ip-address $endIp --name "AllowAllAzureIPs"

echo "Creating $database on $server..."
az sql db create --resource-group $resourceGroup --server $server --name $database --free-limit true --free-limit-exhaustion-behavior AutoPause --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1

echo "Creating $shadowDB on $server..."
az sql db create --resource-group $resourceGroup --server $server --name $shadowDB --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1 --zone-redundant false

echo "Creating the IoT Hub $iot_hub"
az iot hub create -n $iot_hub --resource-group $resourceGroup --sku F1 --partition-count 2 --location $location


echo "Creating the storage account $storage_account"
az storage account create --name $storage_account --resource-group $resourceGroup --location $location --sku Standard_LRS --kind StorageV2

echo "Creating the function app $function_app"
az functionapp create --name $function_app --storage-account $storage_account --resource-group $resourceGroup --consumption-plan-location $location --runtime node --runtime-version 18 --functions-version 4 --os-type Linux

echo "" >> az_func/.env
echo IOT_HUB_CONNECTION_STRING="$( az iot hub connection-string show --hub-name $iot_hub --policy-name registryReadWrite --resource-group $resourceGroup | jq '.connectionString' )" >> az_func/.env
echo "DATABASE_URL=\"sqlserver://$server.database.windows.net:1433;database=$database;user=$login@$login;password=$password\"" >> az_func/.env
echo "SHADOW_DATABASE_URL=\"sqlserver://$server.database.windows.net:1433;database=$shadowDB;user=$login@$login;password=$password\"" >> az_func/.env

cd az_func
npx prisma generate
npx prisma db push
func azure functionapp publish $function_app


echo "Creating stream analytics job $stream_job ..."
az stream-analytics job create --name $stream_job --resource-group $resourceGroup --location $location --transformation name="transformationtest" streaming-units=1 query="SELECT pH, metalli, dispId INTO [acqua] FROM [$iot_hub] WHERE (cov IS NULL OR gas IS NULL) AND NOT (pH IS NULL OR metalli IS NULL OR dispId IS NULL) SELECT cov, gas, dispId INTO [aria] FROM [$iot_hub] WHERE (pH IS NULL OR metalli IS NULL) AND NOT (cov IS NULL OR gas IS NULL OR dispId IS NULL)"


IOT_HUB_POLICY_KEY=$(az iot hub policy show --hub-name $iot_hub -n "iothubowner" | jq -r '.primaryKey')
echo $IOT_HUB_POLICY_KEY
echo ""

INPUT_PROPERTIES=$(cat <<EOF
{
  "type": "Stream",
  "datasource": {
    "type": "Microsoft.Devices/IotHubs",
    "properties": {
      "consumerGroupName": "\$Default",
      "endpoint": "messages/events",
      "iotHubNamespace": "$iot_hub",
      "sharedAccessPolicyKey": "$IOT_HUB_POLICY_KEY",
      "sharedAccessPolicyName": "$IOT_HUB_POLICY_NAME"
    }
  },
  "serialization": {
    "type": "Json",
    "properties": {
      "encoding": "UTF8"
    }
  }
}
EOF
)

echo "Configuring input for Stream Analytics Job $stream_job: $iot_hub ..."
az stream-analytics input create --name $iot_hub --job-name $stream_job --resource-group $resourceGroup --properties "$INPUT_PROPERTIES"
echo ""
echo ""

TABLE_DATABASE_OUTPUT_1="MisurazioniAcqua"
echo "Configuring output for Stream Analytics Job $STREAM_JOB: $OUTPUT_NAME_1 ..."
az stream-analytics output create --job-name $stream_job --datasource "{\"type\":\"Microsoft.Sql/Server/Database\",\"properties\":{\"server\":\"$server\",\"database\":\"$database\",\"user\":\"$login\",\"password\":\"$password\",\"table\":\"$TABLE_DATABASE_OUTPUT_1\"}}" --serialization "{\"type\":\"Json\",\"properties\":{\"format\":\"Array\",\"encoding\":\"UTF8\"}}" --output-name "Acqua" --resource-group $resourceGroup

TABLE_DATABASE_OUTPUT_2="MisurazioniAria"
echo "Configuring output for Stream Analytics Job $STREAM_JOB: $OUTPUT_NAME_2 ..."
az stream-analytics output create --job-name $stream_job --datasource "{\"type\":\"Microsoft.Sql/Server/Database\",\"properties\":{\"server\":\"$server\",\"database\":\"$database\",\"user\":\"$login\",\"password\":\"$password\",\"table\":\"$TABLE_DATABASE_OUTPUT_2\"}}" --serialization "{\"type\":\"Json\",\"properties\":{\"format\":\"Array\",\"encoding\":\"UTF8\"}}" --output-name "Aria" --resource-group $resourceGroup


echo "Starting the Process of Stream Analytics Job $stream_job ..."
az stream-analytics job start --name $stream_job --resource-group $resourceGroup