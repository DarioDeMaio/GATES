location="westeurope"
resourceGroup="gates"
server="gates"
shadowDB="gatesShadow"
database="gates"
login="gates"
password="#"
iot_hub="gates-iot-hub"
function_app="gatess"
storage_account="gaates"
stream_job="gates_job"
static_web_app="gates_web_app"
static_web_app_env="preview"
startIp=0.0.0.0
endIp=255.255.255.255
path="https://github.com/DarioDeMaio/GATES/tree/main/front-end"

#az group create --name $resourceGroup --location $location

#az sql server create --name $server --resource-group $resourceGroup --location "$location" --admin-user $login --admin-password $password

# echo "Configuring firewall..."
# az sql server firewall-rule create --resource-group $resourceGroup --server $server --start-ip-address $startIp --end-ip-address $endIp --name "AllowAllAzureIPs"

# echo "Creating $database on $server..."
# az sql db create --resource-group $resourceGroup --server $server --name $database --free-limit true --free-limit-exhaustion-behavior AutoPause --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1

# echo "Creating $shadowDB on $server..."
# az sql db create --resource-group $resourceGroup --server $server --name $shadowDB --edition GeneralPurpose --compute-model Serverless --family Gen5 --capacity 1 --zone-redundant false

# echo "Creating the IoT Hub $iot_hub"
# az iot hub create -n $iot_hub --resource-group $resourceGroup --sku F1 --partition-count 2 --location $location

# echo IOT_HUB_CONNECTION_STRING="$( az iot hub connection-string show --hub-name $iot_hub --resource-group $resourceGroup | jq '.connectionString' )" >> az_func/.env

# echo "DATABASE_URL=\"sqlserver://$server.database.windows.net:1433;database=$database;user=$login@$login;password=$password\"" >> az_func/.env
# echo "SHADOW_DATABASE_URL=\"sqlserver://$server.database.windows.net:1433;database=$shadowDB;user=$login@$login;password=$password\"" >> az_func/.env

# echo "Creating the storage account $storage_account"
# az storage account create --name $storage_account --resource-group $resourceGroup --location $location --sku Standard_LRS --kind StorageV2

# echo "Creating the function app $function_app"
# az functionapp create --name $function_app --storage-account $storage_account --resource-group $resourceGroup --consumption-plan-location $location --runtime node --runtime-version 18 --functions-version 4 --os-type Linux

# echo "Creating stream analytics job $stream_job"
# az stream-analytics job create --name $stream_job --resource-group $resourceGroup --location $location --transformation name="transformationSAJ" streaming-units=1

# az staticwebapp create --name $static_web_app --resource-group $resourceGroup
# echo "Creating the static web app $static_web_app_env to the environment $static_web_app_env"
# swa deploy --resource-group $resourceGroup --app-name $static_web_app --env $static_web_app_env
az staticwebapp create -n $static_web_app -g $resourceGroup -s $path -l $location -b main --login-with-github
# cd az_func
# npx prisma generate
# npx prisma db push
# func azure functionapp publish $function_app