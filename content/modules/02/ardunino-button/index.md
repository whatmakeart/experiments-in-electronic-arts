---
title: "Arduino Button"
date: 2020-01-26T23:11:13Z
draft: false
---

[![Arduino Button Circuit Image](arduino-button-diagram-from-arduino-docs.png)](<(arduino-button-diagram-from-arduino-docs.png)>) [^1]

above footnote on same line and below with one line space

[![Arduino Button Circuit Image](arduino-button-diagram-from-arduino-docs.png)](<(arduino-button-diagram-from-arduino-docs.png)>)

[^1]

```C
/*
  Button

  Turns on and off a light emitting diode(LED) connected to digital pin 13,
  when pressing a pushbutton attached to pin 2.

  The circuit:
  - LED attached from pin 13 to ground through 220 ohm resistor
  - pushbutton attached to pin 2 from +5V
  - 10K resistor attached to pin 2 from ground

  - Note: on most Arduinos there is already an LED on the board
    attached to pin 13.

  created 2005
  by DojoDave <http://www.0j0.org>
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Button
*/

// constants won't change. They're used here to set pin numbers:
const int buttonPin = 2;  // the number of the pushbutton pin
const int ledPin = 13;    // the number of the LED pin

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(ledPin, HIGH);
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
}
```

[^1]: [Image](https://docs.arduino.cc/built-in-examples/digital/Buttons) by [Arduino](https://www.arduino.cc/) [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
