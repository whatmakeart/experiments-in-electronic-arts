---
title: "06.02 Aruduino State Machine"
date: 2020-01-26T23:11:13Z
draft: false
---

```C

// Traffic Light State Machine
// Traffic Light LED Pins

const byte northSouthRed = 12;
const byte northSouthYellow = 11;
const byte northSouthGreen = 10;

const byte eastWestRed = 9;
const byte eastWestYellow = 8;
const byte eastWestGreen = 7;

enum states {
  Start_All_Red,        // start with all red
  NS_Green_EW_Red,      // North South Green and East West Red
  NS_Yellow_EW_Red,     // North South Yellow and East West Red
  NS_to_EW_Transition,  // Everything Red during transition
  NS_Red_EW_Green,      // North South Red and East West Green
  NS_Red_EW_Yellow,     // North South Red and East West Yellow
  EW_to_NS_Transition,  // Everything Red during transition
};

enum states trafficState;

unsigned long currentMillis;  // keeps track of current time in Milliseconds
unsigned long startTimer;     // tracks last time startTimer expired
unsigned long trafficTimer;   // tracks last time trafficTimer

const byte LEDPinArray[] = { northSouthRed,
                             northSouthYellow,
                             northSouthGreen,
                             eastWestRed,
                             eastWestYellow,
                             eastWestGreen };

const byte LED_NUMBER = sizeof(LEDPinArray);  // get the size of the array and store as variable

void setup() {
  // use a for loop to iterate through the array of LED pins
  for (int i = 0; i < LED_NUMBER; i++) {
    pinMode(LEDPinArray[i], OUTPUT);
  }

  startTimer = millis();  // sets the startup timer to the current time
}

void loop() {
  currentMillis = millis();  // set to current time in milliseconds

  switch (trafficState) {
    case Start_All_Red:

      changeTrafficLightLEDs(1, 0, 0, 1, 0, 0);

      if (checkTime(startTimer, 500UL)) {
        trafficTimer = currentMillis;    // start the trafficTimer
        trafficState = NS_Green_EW_Red;  // new state
      }
      break;

    case NS_Green_EW_Red:

      changeTrafficLightLEDs(0, 0, 1, 1, 0, 0);

      if (checkTime(trafficTimer, 5000UL)) {
        trafficState = NS_Yellow_EW_Red;  // new state
      }
      break;

    case NS_Yellow_EW_Red:

      changeTrafficLightLEDs(0, 1, 0, 1, 0, 0);

      if (checkTime(trafficTimer, 2000UL)) {
        trafficState = NS_to_EW_Transition;  // new state
      }
      break;

    case NS_to_EW_Transition:

      changeTrafficLightLEDs(1, 0, 0, 1, 0, 0);

      if (checkTime(trafficTimer, 1000UL)) {
        trafficState = NS_Red_EW_Green;  // new state
      }
      break;

    case NS_Red_EW_Green:

      changeTrafficLightLEDs(1, 0, 0, 0, 0, 1);

      if (checkTime(trafficTimer, 5000UL)) {
        trafficState = NS_Red_EW_Yellow;  // new state
      }
      break;

    case NS_Red_EW_Yellow:

      changeTrafficLightLEDs(1, 0, 0, 0, 1, 0);

      if (checkTime(trafficTimer, 2000UL)) {
        trafficState = EW_to_NS_Transition;  // new state
      }
      break;

    case EW_to_NS_Transition:

      changeTrafficLightLEDs(1, 0, 0, 1, 0, 0);

      if (checkTime(trafficTimer, 500UL)) {
        trafficState = NS_Green_EW_Red;  // new state
      }
      break;


  }  // end of switch

}  // end of loop

// BEGIN CheckTime()
boolean checkTime(unsigned long &lastTimerExpiredTime, unsigned long timerLength) {
  // is the time up for this task?
  if (currentMillis - lastTimerExpiredTime >= timerLength) {
    lastTimerExpiredTime += timerLength;  //get ready for the next iteration
    return true;
  }
  return false;
}
//END CheckTime()


void changeTrafficLightLEDs(byte NSR, byte NSY, byte NSG, byte EWR, byte EWY, byte EWG) {
  digitalWrite(northSouthRed, NSR);
  digitalWrite(northSouthYellow, NSY);
  digitalWrite(northSouthGreen, NSG);
  digitalWrite(eastWestRed, EWR);
  digitalWrite(eastWestYellow, EWY);
  digitalWrite(eastWestGreen, EWG);
}

```

## Example on TinkerCad

<div class="iframe-tinkercad-container">
<iframe class="responsiveIframe" width="725" height="453" src="https://www.tinkercad.com/embed/7bc8ETRwlql?editbtn=1" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
</div>

https://www.forward.com.au/pfod/ArduinoProgramming/RealTimeArduino/index.html

https://www.forward.com.au/pfod/ArduinoProgramming/TimingDelaysInArduino.html

## State Machine Resources

[State Machine with Structure Timer by Larry D](https://forum.arduino.cc/t/state-machine-and-timers-medium-level-tutorial/504662)

[State Machine Tutorial](http://www.thebox.myzen.co.uk/Tutorial/State_Machine.html)

[Fruit Basket State Machine](https://forum.arduino.cc/t/can-multiple-millis-be-used-for-independent-events-without-slowing-the-loop/291868/7) by Larry D
