---
title: "06.02 Aruduino State Machine"
date: 2020-01-26T23:11:13Z
draft: false
---

```C
// Traffic Light State Machine
// Traffic Light LED Pins

int northSouthRed = 12;
int northSouthYellow = 11;
int northSouthGreen = 10;

int eastWestRed = 9;
int eastWestYellow = 8;
int eastWestGreen = 7;

#define LED_NUMBER 6

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

byte LEDPinArray[LED_NUMBER] = { northSouthRed,
                                 northSouthYellow,
                                 northSouthGreen,
                                 eastWestRed,
                                 eastWestYellow,
                                 eastWestGreen };


void setup() {

  for (int i = 0; i < LED_NUMBER; i++) {
    pinMode(LEDPinArray[i], OUTPUT);
  }

  startTimer = millis();  // sets the first startup timer to the current time
}

void loop() {
  currentMillis = millis();  // set to current time in milliseconds

  switch (trafficState) {
    case Start_All_Red:
      digitalWrite(northSouthRed, HIGH);
      digitalWrite(northSouthYellow, LOW);
      digitalWrite(northSouthGreen, LOW);
      digitalWrite(eastWestRed, HIGH);
      digitalWrite(eastWestYellow, LOW);
      digitalWrite(eastWestGreen, LOW);
      if (checkTime(startTimer, 500UL)) {
        trafficTimer = currentMillis;    // reset the trafficTimer
        trafficState = NS_Green_EW_Red;  // new state
      }
      break;

    case NS_Green_EW_Red:
      digitalWrite(northSouthRed, LOW);
      digitalWrite(northSouthYellow, LOW);
      digitalWrite(northSouthGreen, HIGH);
      digitalWrite(eastWestRed, HIGH);
      digitalWrite(eastWestYellow, LOW);
      digitalWrite(eastWestGreen, LOW);
      if (checkTime(trafficTimer, 5000UL)) {
        trafficTimer = currentMillis;
        trafficState = NS_Yellow_EW_Red;  // new state
      }
      break;

    case NS_Yellow_EW_Red:
      digitalWrite(northSouthRed, LOW);
      digitalWrite(northSouthYellow, HIGH);
      digitalWrite(northSouthGreen, LOW);
      digitalWrite(eastWestRed, HIGH);
      digitalWrite(eastWestYellow, LOW);
      digitalWrite(eastWestGreen, LOW);
      if (checkTime(trafficTimer, 2000UL)) {
        trafficTimer = currentMillis;        // reset the trafficTimer
        trafficState = NS_to_EW_Transition;  // new state
      }
      break;

    case NS_to_EW_Transition:
      digitalWrite(northSouthRed, HIGH);
      digitalWrite(northSouthYellow, LOW);
      digitalWrite(northSouthGreen, LOW);
      digitalWrite(eastWestRed, HIGH);
      digitalWrite(eastWestYellow, LOW);
      digitalWrite(eastWestGreen, LOW);
      if (checkTime(trafficTimer, 1000UL)) {
        trafficTimer = currentMillis;    // reset the trafficTimer
        trafficState = NS_Red_EW_Green;  // new state
      }
      break;

    case NS_Red_EW_Green:
      digitalWrite(northSouthRed, HIGH);
      digitalWrite(northSouthYellow, LOW);
      digitalWrite(northSouthGreen, LOW);
      digitalWrite(eastWestRed, LOW);
      digitalWrite(eastWestYellow, LOW);
      digitalWrite(eastWestGreen, HIGH);
      if (checkTime(trafficTimer, 5000UL)) {
        trafficTimer = currentMillis;     // reset the trafficTimer
        trafficState = NS_Red_EW_Yellow;  // new state
      }
      break;

    case NS_Red_EW_Yellow:
      digitalWrite(northSouthRed, HIGH);
      digitalWrite(northSouthYellow, LOW);
      digitalWrite(northSouthGreen, LOW);
      digitalWrite(eastWestRed, LOW);
      digitalWrite(eastWestYellow, HIGH);
      digitalWrite(eastWestGreen, LOW);
      if (checkTime(trafficTimer, 2000UL)) {
        trafficTimer = currentMillis;        // reset the trafficTimer
        trafficState = EW_to_NS_Transition;  // new state
      }
      break;

    case EW_to_NS_Transition:
      digitalWrite(northSouthRed, HIGH);
      digitalWrite(northSouthYellow, LOW);
      digitalWrite(northSouthGreen, LOW);
      digitalWrite(eastWestRed, HIGH);
      digitalWrite(eastWestYellow, LOW);
      digitalWrite(eastWestGreen, LOW);
      if (checkTime(trafficTimer, 500UL)) {
        trafficTimer = currentMillis;    // reset the trafficTimer
        trafficState = NS_Green_EW_Red;  // new state
      }
      break;


  }  // end of switch

}  // end of loop

// BEGIN CheckTime()
boolean checkTime(unsigned long lastTimerExpiredTime, unsigned long timerLength) {
  // is the time up for this task?
  if (currentMillis - lastTimerExpiredTime >= timerLength) {
    return true;
  }
  return false;
}
//END CheckTime()

```

https://www.forward.com.au/pfod/ArduinoProgramming/RealTimeArduino/index.html

https://www.forward.com.au/pfod/ArduinoProgramming/TimingDelaysInArduino.html

## State Machine Resources

[State Machine with Structure Timer by Larry D](https://forum.arduino.cc/t/state-machine-and-timers-medium-level-tutorial/504662)

[State Machine Tutorial](http://www.thebox.myzen.co.uk/Tutorial/State_Machine.html)

[Fruit Basket State Machine](https://forum.arduino.cc/t/can-multiple-millis-be-used-for-independent-events-without-slowing-the-loop/291868/7) by Larry D

arduino inputs - http://www.thebox.myzen.co.uk/Tutorial/Inputs.html
