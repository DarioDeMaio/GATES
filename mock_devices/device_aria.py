# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root for full license information.
import os
import random
import time
from azure.iot.device import IoTHubDeviceClient, Message

# The device connection authenticates your device to your IoT hub. The connection string for 
# a device should never be stored in code. For the sake of simplicity we're using an environment 
# variable here. If you created the environment variable with the IDE running, stop and restart 
# the IDE to pick up the environment variable.
#
# You can use the Azure CLI to find the connection string:
# az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table

CONNECTION_STRING = os.getenv("HostName=gates.azure-devices.net;DeviceId=1;SharedAccessKey=MIQru7YPIUCHNne3VXpBZLlae7wm+n2+OAIoTHhqvBY=")

# Define the JSON message to send to IoT Hub.
COV = 20.0
GAS = 60
ID=1
#id=5
MSG_TXT = '{{"cov": {PH}, "gas": {METALLI}, "dispId": {ID}}}'


def run_telemetry_sample(client):
    i = 0
    # This sample will send temperature telemetry every second
    print("IoT Hub device sending periodic messages")

    client.connect()

    while i<3:
        # Build the message with simulated telemetry values.
        cov = COV + (random.random() * 15)
        gas = GAS + (random.random() * 20)
        msg_txt_formatted = MSG_TXT.format(PH=cov, METALLI=gas, ID=ID)
        message = Message(msg_txt_formatted)

        # Add a custom application property to the message.
        # An IoT hub can filter on these properties without access to the message body.
        # if pH > 30:
        #     message.custom_properties["temperatureAlert"] = "true"
        # else:
        #     message.custom_properties["temperatureAlert"] = "false"

        # Send the message.
        print("Sending message: {}".format(message))
        client.send_message(message)
        print("Message successfully sent")
        i+=1
        #time.sleep(10)


def main():
    print("IoT Hub Quickstart #1 - Simulated device")
    print("Press Ctrl-C to exit")

    # Instantiate the client. Use the same instance of the client for the duration of
    # your application
    client = IoTHubDeviceClient.create_from_connection_string("HostName=gates-iot-hub.azure-devices.net;DeviceId=1;SharedAccessKey=MIQru7YPIUCHNne3VXpBZLlae7wm+n2+OAIoTHhqvBY=")

    # Run Sample
    try:
        run_telemetry_sample(client)
    except KeyboardInterrupt:
        print("IoTHubClient sample stopped by user")
    finally:
        # Upon application exit, shut down the client
        print("Shutting down IoTHubClient")
        client.shutdown()

if __name__ == '__main__':
    main()