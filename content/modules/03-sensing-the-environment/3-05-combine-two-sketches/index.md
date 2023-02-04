---
title: "3.05 Combine Two Sketches"
date: 2020-01-26T23:11:13Z
draft: false
---

## Assignment Deliverables

- Arduino .ino file. This is the saved sketch file from the Arduino IDE.
- Photo of the Breadboard layout of the combined sketches

## Assignment Overview

Now that we have multiple different sensors lets look at how we can combine two Arduino Sketches.

Pick two of the example sketches we worked with so far in the course. It is bet to use these examples that don't use the `delay();` function.

- Arduino Fade
- Arduino Blink Without Delay
- Arduino Button Debounce
- Servo Knob Without Delay
- Microphone control LED
- NewPing Library Ultrasonic Sensor

## Guide for Combining Arduino Sketches

### 1. Copy all of the variables from before `setup();`

The information before `setup();` includes libraries, variables, and other parameters. Select everything from one sketch above setup and copy it. Then paste it above `setup();` in the second sketch. It is a good idea to put a comment above and below the pasted code such as `// begin pasted code` and `// end pasted code`, that way you know which code is from the previous sketch.

1. Copy all of the variables
2. Rename any duplicates
3. Reassign pins that are the same to different pins
4. Make notes about variable renaming
5. Make notes about pin reassignment
6. Put comments above and below the code indicating that it was added

### 2 Copy information from `setup();`

Now we will copy the information from the `setup();` function. This will include specific setting, `pinMode();`, `beginSerial();` and other single run lines of code. Do not copy the `beginSerial();` as a sketch only needs one. Add comments to your code to show what you added.

1. Copy the new information
2. Update any variable names from previous step
3. Update any reassigned pins
4. Add comments to indicate the added code.

### 3 Copy information from `loop();`

1. Copy the new information
2. Update any variable names from previous step
3. Update any reassigned pins

### Test, Test, Test

Then we must test the code to fix unexpected errors and problems.
