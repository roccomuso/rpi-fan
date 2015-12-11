# rpi-fan
Basic Node.js Fan controller for Raspberry Pi.

When The temperature reachs a specific threshold value, the gpio is activated and the transistor lets the fan spin!
You can see the current RPi temperature and Fan status using the built-in server functionality or installing the basic RPi-Dashboard: https://github.com/roccomuso/rpi-dashboard

Once the fan starts to spin, there will not be a temperature check for 5 minutes. This behavior avoids too many fan switches in short periods of time.

# Hardware

1. Scheme (works on both Raspberry Pi and Raspberry Pi 2 model):

![circuit scheme](https://github.com/roccomuso/rpi-fan/blob/master/img/scheme.png "Circuit Scheme")

For Raspberry Pi pinout, check out https://www.raspberrypi.org/documentation/usage/gpio-plus-and-raspi2/

2. You can edit the gpio number, temperature threshold, refresh time etc. directly in the <code>config.json</code> file:

        "PIN_NUMBER" : 18,
        "REFRESH_TIME" : 60,
        "THRESHOLD" : 40.0
        
3. Optionally, you can also activate a web server to show the current temperature on <code>http://ip_address:SERVER_PORT/</code>. Make sure to choose a free port.

        "WEB_SERVER": true,
        "SERVER_PORT": 4949

3. Transistor I've used: 2N7000

# Software

1. clone the repo on the <code>/home/pi/Desktop</code>:

        git clone https://roccomuso@github.com/roccomuso/rpi-fan.git
    
2. execute the script at startup:

  - Launch from CLI crontab -e and add the following line:
      
          @reboot /usr/local/bin/node /home/pi/Desktop/rpi-fan/index.js >/tmp/fan_output 2>/tmp/fan_error
  
  
@ Author: Rocco Musolino - hackerstribe.com
