---
title: "1.10 Servo Shenaigans"
date: 2020-01-26T23:11:13Z
draft: false
---

## Assignment Deliverables

Upload a 5 second to 30 second video of your servo motor interacting with the environment.

Label the file YYYYMMDD Lastname Firstname Servo Video.mp4

## Process

Servo motors can move in precice arcs differently than a free spinning motor like an electric drill. This control ability offers unique possibilites for projects.

1. Attach your servo motor to the Arduino and upload the example sketch.
2. Modify the parameters to change the behavior of the servo motor.
3. Then attach objects to the arms of the servo or attach the servo to an object. Make it interact with the environment in interesting ways. This could be as simple as taping a cutout paper hand and arm to the servo so it can wave.
4. Use your immagination and have fun.
5. Take a brief video to show the servo shenanigans. You can use a mobile device for the video. Make sure there is good lighting, (daytime window or a couple desk lamps)
6. Save the video as an mp4 and upload it.

## Servo Sweep Example Sketch

We will use the example Arduino Servo Sweep sketch by [BARRAGAN](http://barraganstudio.com). This code introduces a few new concepts that we will present briefly here but will investigate in more depth later in the semester.

```

#include <Servo.h>
```

The line at the top is including a library that has commands and functions for the servo motor. By using this include line we have access to code to control the servo that we do not have to write ourselves.

```C

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position
```

One of those new commands is `Servo`. This command is like declaring a variable. It creates a new object or a new servo motor to control called `myservo`. We could call the servo `superservo` the name is not important, but if the name changes then it needs to be changed everywhere in the code.

In the next line a integer variable `pos` to indicate position is declared with an initial value of 0. This is the variable that will decide what rotational position the servo will move to.

```C

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}
```

The next section of the code is the `setup();` function. This function runs only once and it tells the Arduino what pin the servo is attached to. In this case it uses pin 9.

```C

void loop() {
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
}
```

The next section of code is the `loop();` function. This function loops over and over again and controls the sweep of the servo motor arm. It uses two `for` loops. We will examine `for` loops later in the semester but basically they do somthing a certain ammount of times or until some condition is met. In this case they move the servo arm one direction until it gets to 180 and then they move the servo arm the other direction until it gets to zero. Then the process repeats.

## Full Sweep Code

```C

#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15 ms for the servo to reach the position
  }
}
```

## Modifying the Servo Behavior

There are a few parameters that you can change to control the servo.

### Range of Position

The first is the positional range. By default it runs from 0 - 180 but this could be changed to 0-50 or 66-98 or 45 - 176 or any other range. Make sure to change the range in both for loops. If the beginning and ending `pos` numbers don't match the servo will jump to the next position at the end of the loop.

### Speed of Sweep

The `delay();` function in both `for` loops controls the speed of the servo sweep. They default to 15 milliseconds. Decreasing these makes the servo sweep faster while increasing them makes it move slower. Since there are two `for` loops you can have different speeds for each direction.