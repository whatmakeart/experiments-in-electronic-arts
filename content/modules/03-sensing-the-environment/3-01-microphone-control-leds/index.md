---
title: "3.0 - Microphone - Control LED Levels"
date: 2020-01-26T23:11:13Z
draft: false
---

This example uses an electret condenser microphone module to control the blinking of a LED. With the addition of an external power supply, this code could control a strip of LEDs for a large display.

## Circuit Setup

You need a microphone module, a potentiometer, a LED, and a resistor for the LED. The potentiometer middle pin is hooked up to A0, the microphone is hooked up to A3 and the LED is hooked up to 12.

[![Microphone Control LED with Arduino Circuit](microphone-control-led-jpg)](microphone-control-led-jpg)

## Code to Blink LEDs Based on Mic Input

```C

/*
Make a LED blink with  sound, speech, or music.
Adjust the blink threshold or turn LED off with the potentiometer.
*/

const int potPin = A0;  // pin for the potentiometer
int potValue = 0;       // value of the potentiometer

const int micPin = A3;  // pin for the microphone
int micVolume;          // value of the microphone

const int soundActivatedLEDs = 12; // pin for the LEDs

unsigned long currentMilliseconds = 0;      // current time in milliseconds
unsigned long previousMillisecondsPot = 0;  // Time track for potentiometer

void setup() {
  Serial.begin(9600);  // start serial monitor
  pinMode(soundActivatedLEDs, OUTPUT); // make LED pin as output
}

void loop() {
  currentMilliseconds = millis();
  readMic(); // reads the microphone
  printPot(); // prints the potentiometer value to serial monitor
}

void readMic() {
  micVolume = analogRead(micPin);  // Reads the value from the microphone
  potValue = analogRead(potPin);   // Reads the value from the potentiometer

  if (potValue <= 100) {           // if potentiometer is less than or equal to 100 turn off LEDs
    turnOffLEDs();
  }

  else if (potValue >= 101) {      // if greater than or equal to 101 then the mic controls the LEDs

    if (micVolume >= potValue) {
      digitalWrite(soundActivatedLEDs, HIGH);  // Turn ON Led
    } else {
      digitalWrite(soundActivatedLEDs, LOW);  // Turn OFF Led
    }
  }
}

void printPot() {
  if (currentMilliseconds - previousMillisecondsPot >= samplePotInterval) {
    // save the last time you printed the potentiometer
    previousMillisecondsPot = currentMilliseconds;
    Serial.print("Potentiometer: ");
    Serial.println(potValue);  // serial print the voltage output from the analog read of the potentiometer pin
  }
}

```

```C
/* Read Microphone Voltage */
const int sampleWindow = 50;         // milliseconds of microphone sample
unsigned int sample;                 // sample value
const long samplePotInterval = 500;  // time between reading and printing Potentiometer value for testing

void setup {}
void loop {
  void readMicVoltRange() {
    unsigned long startMillis = millis();
    unsigned int peakToPeak = 0;
    unsigned int signalMax = 0;
    unsigned int signalMin = 1024;

    while (millis() - startMillis < sampleWindow)
      sample = analogRead(micPin);
    if (sample < 1024) {
      if (sample > signalMax) {
        signalMax = sample;
      } else if (sample < signalMin) {
        signalMin = sample;
      }
    }
    peakToPeak = signalMax - signalMin;
    double volts = (peakToPeak \* 5.0) / 1024;

    //Serial.println(volts);
  }
}

```

```

```
