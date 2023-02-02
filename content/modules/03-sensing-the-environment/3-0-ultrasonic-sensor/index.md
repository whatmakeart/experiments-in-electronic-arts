---
title: "3.0 - Ultrasonic Sensor Ping"
date: 2020-01-26T23:11:13Z
draft: false
---

```C
/*
  Ping))) Sensor

  This sketch reads a PING))) ultrasonic rangefinder and returns the distance
  to the closest object in range. To do this, it sends a pulse to the sensor to
  initiate a reading, then listens for a pulse to return. The length of the
  returning pulse is proportional to the distance of the object from the sensor.

  The circuit:
	- +V connection of the PING))) attached to +5V
	- GND connection of the PING))) attached to ground
	- SIG connection of the PING))) attached to digital pin 7

  created 3 Nov 2008
  by David A. Mellis
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Ping
*/

// this constant won't change. It's the pin number of the sensor's output:
const int pingPin = 7;

void setup() {
  // initialize serial communication:
  Serial.begin(9600);
}

void loop() {
  // establish variables for duration of the ping, and the distance result
  // in inches and centimeters:
  long duration, inches, cm;

  // The PING))) is triggered by a HIGH pulse of 2 or more microseconds.
  // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  pinMode(pingPin, OUTPUT);
  digitalWrite(pingPin, LOW);
  delayMicroseconds(2);
  digitalWrite(pingPin, HIGH);
  delayMicroseconds(5);
  digitalWrite(pingPin, LOW);

  // The same pin is used to read the signal from the PING))): a HIGH pulse
  // whose duration is the time (in microseconds) from the sending of the ping
  // to the reception of its echo off of an object.
  pinMode(pingPin, INPUT);
  duration = pulseIn(pingPin, HIGH);

  // convert the time into a distance
  inches = microsecondsToInches(duration);
  cm = microsecondsToCentimeters(duration);

  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();

  delay(100);
}

long microsecondsToInches(long microseconds) {
  // According to Parallax's datasheet for the PING))), there are 73.746
  // microseconds per inch (i.e. sound travels at 1130 feet per second).
  // This gives the distance travelled by the ping, outbound and return,
  // so we divide by 2 to get the distance of the obstacle.
  // See: https://www.parallax.com/package/ping-ultrasonic-distance-sensor-downloads/
  return microseconds / 74 / 2;
}

long microsecondsToCentimeters(long microseconds) {
  // The speed of sound is 340 m/s or 29 microseconds per centimeter.
  // The ping travels out and back, so to find the distance of the object we
  // take half of the distance travelled.
  return microseconds / 29 / 2;
}
```

```C
/*
This is the code to make a LED blink with the music.
You have to set the threshold so it' sensible enough to make the led blink.
You connect an LED to PIN13 and the Sound Sensor to Analog Pin 0
 */

const int potPin = A0;  // pin for the potentiometer
int potValue = 0;       // value of the potentiometer
const int pingPin = 7;  // ping pin of the ultrasonic sensor

const int trigPin = 7;
const int echoPin = 8;
const int micPin = A3;  // pin for the microphone
const int ultraLED = 12;
const int soundActivatedLEDs = 13;
const int speakerPin = 11;

long duration;
int distance;


const int sampleWindow = 50;             // milliseconds of microphone sample
unsigned int sample;                     // sample value
const long sampleSensorsInterval = 500;  // time between reading and printing Potentiometer value for testing
const long ultraSonicInterval = 100;     // time between reading Ultrasonic Sensor
const long clearTrigInterval = 2;        // time between reading Ultrasonic Sensor
const long pulseTrigInterval = 10;       // time between reading Ultrasonic Sensor

enum sensorStates { CLEAR_TRIG_PIN,
                    PULSE_TRIG_PIN,
                    READ_DISTANCE,
                    TRIGGER_EVENT,
                    WAIT_DELAY };
enum sensorStates ultraSonicState = CLEAR_TRIG_PIN;

unsigned long currentMilliseconds = 0;
unsigned long currentMicroseconds = 0;
unsigned long previousMillisecondsSampleSensors = 0;  // Time track for potentiometer
unsigned long previousMillisecondsUltra = 0;          // Time track for Ultrasonic Sensor
unsigned long previousMicrosecondsUltra = 0;          // Time track for Ultrasonic Sensor





int threshold = 425;  //Change This
int micVolume;

void setup() {
  Serial.begin(9600);  // For debugging
  pinMode(soundActivatedLEDs, OUTPUT);
  pinMode(trigPin, OUTPUT);  // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);   // Sets the echoPin as an Input
  pinMode(ultraLED, OUTPUT);
  pinMode(speakerPin, OUTPUT);
}

void loop() {
  currentMilliseconds = millis();
  currentMicroseconds = micros();
  ultraSonic();
  blueMicBlink();
  printData();
}

void blueMicBlink() {
  micVolume = analogRead(micPin);  // Reads the value from the Analog PIN A0
  potValue = analogRead(potPin);
  threshold = potValue / 1.2;
  threshold = potValue;

  // Serial.println(threshold);

  if (potValue <= 100) {
    turnOffLEDs();
  }

  else if (potValue >= 101) {

    if (micVolume >= threshold) {
      turnOnLEDs();
    } else {
      turnOffLEDs();
    }
  }
}


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
  double volts = (peakToPeak * 5.0) / 1024;

  //Serial.println(volts);
}

void printData() {
  if (currentMilliseconds - previousMillisecondsSampleSensors >= sampleSensorsInterval) {
    // save the last time you checked the potentiometer
    previousMillisecondsSampleSensors = currentMilliseconds;
    potValue = analogRead(potPin);
    Serial.print("Potentiometer: ");
    Serial.println(potValue);  // serial print the voltage output from the analog read of the potentiometer pin
    // Prints the Ultrasonic distance on the Serial Monitor
    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.println(" centimeters");
  }
}

void turnOffLEDs() {
  digitalWrite(soundActivatedLEDs, LOW);  // Turn OFF Led
}

void turnOnLEDs() {
  digitalWrite(soundActivatedLEDs, HIGH);  //Turn ON Led
}

void ultraSonic() {

  switch (ultraSonicState) {
    case CLEAR_TRIG_PIN:           // toggle the LED
      digitalWrite(trigPin, LOW);  // Clears the trigPin
      if (micros() - previousMicrosecondsUltra >= clearTrigInterval)
        previousMicrosecondsUltra = micros();
      ultraSonicState = PULSE_TRIG_PIN;
      break;

    case PULSE_TRIG_PIN:            // wait for the delay period
      digitalWrite(trigPin, HIGH);  // Sets the trigPin on HIGH state for 10 micro seconds
      if (millis() - previousMicrosecondsUltra >= pulseTrigInterval)
        ultraSonicState = READ_DISTANCE;
      break;

    case READ_DISTANCE:                   // wait for the delay period
      digitalWrite(trigPin, LOW);         // Clears the trigPin
      duration = pulseIn(echoPin, HIGH);  // Reads the echoPin, returns the sound wave travel time in microseconds
      distance = duration * 0.034 / 2;    // Calculating the distance
      ultraSonicState = TRIGGER_EVENT;
      break;

    case TRIGGER_EVENT:  // do some cool thing
      if (distance <= 400) {
        digitalWrite(ultraLED, HIGH);

        /*Tone needs 2 arguments, but can take three
        1) Pin#
        2) Frequency - this is in hertz (cycles per second) which determines the pitch of the noise made
        3) Duration - how long teh tone plays
        */
        tone(speakerPin, 500, 100);
      } else {
        digitalWrite(ultraLED, LOW);
      }
      ultraSonicState = WAIT_DELAY;
      break;

    case WAIT_DELAY:  // wait for the delay period
      if (millis() - previousMillisecondsUltra >= ultraSonicInterval) {
        ultraSonicState = CLEAR_TRIG_PIN;
      }
      break;

    default:
      ultraSonicState = WAIT_DELAY;
      break;
  }
}
```
