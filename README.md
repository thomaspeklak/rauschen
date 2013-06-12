=Rauschen

Rauschen is a website performance monitor that leverages the modern browsers capabilities to report timings from the first user interaction until the request is finished. As this involves several parts like _domain lookup_ and _connectino latencies_ these values can not be reproduced on the server side. These valuable numbers are under the `window.performance`property that is accesible in most modern browsers. If you are interested to read more about the spec, you can find more information at ...


##Architecture

Rauschen consist of several independent parts that collect and manipulate navigation timings, enrich the data with geolocation, user agent and url data and are able to represent the collected data. The components talk to each other over a socket connection.

###Receiver

The receivers task is to hand the browser a script that in turn send the performance data back. It then checks the validity of the data and sends it to a TCP socket.

###Processor

The processor listens on the TCP socket, processes and enriches the data with geo location, user agent and url data and stores it in the database.

###Analizer

Not currently implemented

###Real Time Analyzer

Not currently implemented

##Requirements

- node >= v0.8.0
- mongodb >= 2.0
- local geoip database
- libgeoip

##Installation & Configuration

```
git clone https://github.com/thomaspeklak/Rauschen
cd rauschen

#configure your environments:
# - domains: define domains that are allowed to use this service
# - database: define your connection string
# - geoip: define the path to your geoip database

vim ./config/environment/development.json
vim ./config/environment/production.json

npm install         # to install your dependencies
                    # be sure to have libgeoip installed otherwise you
                    # get an error while installing node-geoip

node receiver       # start the receiver
node processor      # start the processor

or

node .              # will start all components
```
