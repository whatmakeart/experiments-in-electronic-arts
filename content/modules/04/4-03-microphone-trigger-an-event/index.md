---
title: "4.03 - Trigger an Event with a Microphone"
date: 2020-01-26T23:11:13Z
draft: false
---

```C
// Trigger an event reading from the digital pin of a microphone module
// If the sound is over a threshold then a pin is set high, in this case an LED but could also
// trigger a function(); or a state machine.

int ledPin = 11;
int microphonePin = 6;
int microphoneThreshold = 0;

const long microphoneReadInterval = 1000; // milliseconds in between microphone digital readings

unsigned long currentMilliseconds = 0;
unsigned long previousMilliseconds = 0;


void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(microphonePin, INPUT);
}

void loop() {


 unsigned long currentMilliseconds = millis();

  if (currentMilliseconds - previousMilliseconds >= microphoneReadInterval) {
    // save the last time you read the microphone threshold
    previousMilliseconds = currentMilliseconds
    microphoneThreshold = digitalRead(microphonePin);
  }

  if (microphoneThreshold == HIGH) { // if the microphone threshold detects a sound
    digitalWrite(ledPin, HIGH); // trigger the event pin HIGH
  }
  else { // if the microphone threshold does not detect a sound
    digitalWrite(ledPin, LOW); // do not trigger the event pin
  }
}
```
