// Checks for lessons whose own page has no quiz (Circuits). Same shape the app uses: q, a (answers), ok (index), why.
export const EXTRA = {
  'circuits:what-electricity-is': [
    { q: 'What actually moves through a wire when a lamp is on?', a: ['Tiny charged particles called electrons', 'Light', 'Heat from the battery'], ok: 0, why: 'Electrons drift along the metal. The light and heat come from what they do in the bulb.' },
    { q: 'Why does a circuit need a full loop?', a: ['So it looks neat', 'Charge has to flow out and come back to the source', 'To keep the wire cool'], ok: 1, why: 'Break the loop anywhere and the flow stops everywhere. That is all a switch does.' },
    { q: 'Which of these lets electricity through easily?', a: ['Rubber', 'Dry wood', 'Copper'], ok: 2, why: 'Metals like copper are conductors. Rubber and dry wood are insulators.' },
  ],
  'circuits:volts-amps-ohms': [
    { q: 'Volts are best pictured as…', a: ['The push', 'The flow', 'The narrow pipe'], ok: 0, why: 'Volts push, amps flow, ohms resist.' },
    { q: 'You double the resistance and keep the same volts. The current…', a: ['Doubles', 'Halves', 'Stays the same'], ok: 1, why: 'Amps = volts ÷ ohms, so twice the ohms means half the amps.' },
    { q: 'A 9 V battery across 450 ohms gives about…', a: ['20 mA', '2 A', '4 A'], ok: 0, why: '9 ÷ 450 = 0.02 A, which is 20 milliamps.' },
  ],
  'circuits:how-a-breadboard-works': [
    { q: 'The five holes in one short row of a breadboard are…', a: ['Joined together', 'Not joined at all', 'Joined to every other row'], ok: 0, why: 'Each short row of five is one metal clip inside, so parts in it touch.' },
    { q: 'What are the long lines along the edges for?', a: ['Decoration', 'Power and ground for the whole board', 'Holding the board down'], ok: 1, why: 'The rails carry power and ground down the board so every part can reach them.' },
    { q: 'Why does a chip sit across the middle gap?', a: ['So its two sides are not shorted together', 'It is cooler there', 'It is just tradition'], ok: 0, why: 'The gap splits the rows, so each pin gets its own row.' },
  ],
  'circuits:meet-the-board': [
    { q: 'What does the board\'s USB cable do?', a: ['Only charges it', 'Powers it and carries your code onto it', 'Nothing until you add Wi-Fi'], ok: 1, why: 'USB gives it 5 V and is how the sketch gets uploaded.' },
    { q: 'A digital pin can be…', a: ['Any voltage you like', 'On or off (HIGH or LOW)', 'Only an input'], ok: 1, why: 'Digital means two states. The analog pins read the in-between values.' },
    { q: 'Which part of a sketch runs over and over?', a: ['setup()', 'loop()', 'The comments'], ok: 1, why: 'setup() runs once at the start, then loop() repeats forever.' },
  ],
  'circuits:resistors-colour-code': [
    { q: 'What does a resistor do?', a: ['Stores charge', 'Limits how much current flows', 'Makes light'], ok: 1, why: 'It resists the flow, which protects parts like LEDs.' },
    { q: 'The colour bands tell you…', a: ['Its value in ohms', 'Which way round it goes', 'Who made it'], ok: 0, why: 'The bands are a code for the number of ohms. Resistors work either way round.' },
    { q: 'Brown, black, red means…', a: ['102 ohms', '1,000 ohms', '10 ohms'], ok: 1, why: 'Brown 1, black 0, then red means two zeros: 1,000 ohms (1 kΩ).' },
  ],
  'circuits:leds': [
    { q: 'An LED only lights when…', a: ['It is put in the right way round', 'It is hot', 'The room is dark'], ok: 0, why: 'An LED is a diode: current passes one way only, long leg to short leg.' },
    { q: 'What happens with no resistor in series?', a: ['It shines brighter, forever', 'Too much current flows and it can burn out', 'Nothing, it will not light'], ok: 1, why: 'An LED barely limits current on its own. The resistor keeps it safe.' },
    { q: 'The long leg of an LED goes to…', a: ['The positive side', 'The negative side', 'Either side'], ok: 0, why: 'The long leg is the anode, the positive side.' },
  ],
  'circuits:buttons-switches-knobs': [
    { q: 'A push button…', a: ['Closes the circuit only while you hold it', 'Stays on after one press', 'Measures how hard you press'], ok: 0, why: 'Let go and the spring opens it again.' },
    { q: 'A knob (potentiometer) gives the board…', a: ['On or off', 'A range of values', 'Wi-Fi'], ok: 1, why: 'Turning it slides a contact along a track, so the voltage changes smoothly.' },
    { q: 'Why does an input pin need a pull-up or pull-down resistor?', a: ['So it never floats between on and off', 'To save battery', 'To make the button louder'], ok: 0, why: 'A pin left unconnected picks up noise and reads random values.' },
  ],
  'circuits:meet-the-esp32': [
    { q: 'The ESP32\'s pins work at…', a: ['3.3 V', '5 V', '12 V'], ok: 0, why: 'Feed a 5 V signal straight in and you can damage the pin.' },
    { q: 'What can the ESP32 do that the basic board cannot?', a: ['Light an LED', 'Use Wi-Fi and Bluetooth', 'Read a button'], ok: 1, why: 'It has radios built in, so it can talk to your phone and the internet.' },
  ],
  'circuits:dusk-streetlight': [
    { q: 'What senses the dark?', a: ['A light-dependent resistor', 'A buzzer', 'A motor'], ok: 0, why: 'Its resistance rises as the light falls, and the board reads that.' },
    { q: 'Why add a gap between "on" and "off" levels?', a: ['So the light does not flicker at dusk', 'To save code', 'It looks nicer'], ok: 0, why: 'Two thresholds stop it chattering on and off as the light hovers near one level.' },
  ],
  'circuits:traffic-light': [
    { q: 'What sets the order of the lights?', a: ['The sketch, step by step with delays', 'The wires', 'The resistors'], ok: 0, why: 'The code turns each LED on and off in turn and waits between steps.' },
  ],
  'circuits:reaction-time-game': [
    { q: 'How does the board time your reaction?', a: ['It counts milliseconds between the light and your press', 'It guesses', 'It uses the internet clock'], ok: 0, why: 'millis() gives the time, so the difference is your reaction time.' },
  ],
  'circuits:push-button-doorbell': [
    { q: 'Pressing the button…', a: ['Changes a pin\'s reading, and the sketch rings the buzzer', 'Sends power straight to the buzzer only', 'Restarts the board'], ok: 0, why: 'The board reads the button and decides what to do: that is the power of code.' },
  ],
  'circuits:rgb-mood-light': [
    { q: 'How does one LED make purple?', a: ['Red and blue on together', 'A purple filter', 'Spinning fast'], ok: 0, why: 'An RGB LED is three LEDs in one. Mix their brightness and you get any colour.' },
  ],
  'circuits:reversing-sensor': [
    { q: 'How does the sensor measure distance?', a: ['It times a sound echo', 'It weighs the car', 'It reads a camera'], ok: 0, why: 'It sends a click of ultrasound and times how long the echo takes to come back.' },
  ],
  'circuits:diodes': [
    { q: 'A diode lets current flow…', a: ['Both ways equally', 'One way only, like a one-way valve', 'Only when it is cold'], ok: 1, why: 'In at the anode, out at the striped cathode. The other way it is shut.' },
    { q: 'Why put a diode backwards across a motor?', a: ['To make it spin faster', 'To catch the voltage kick when the motor stops', 'To change its direction'], ok: 1, why: 'A coil fights a sudden stop with a spike of 50 V or more. The diode gives that spike a safe loop.' },
    { q: 'A 6 V supply feeds a bulb through a diode. The bulb gets about…', a: ['6.7 V', '6 V', '5.3 V'], ok: 2, why: 'Crossing a diode uses up about 0.7 V.' },
  ],
  'circuits:capacitors': [
    { q: 'A capacitor charging through a resistor fills…', a: ['At a steady speed', 'Fast at first, then slower and slower', 'All at once'], ok: 1, why: 'The fuller it gets, the less push is left to drive more charge in.' },
    { q: '10 kΩ and 100 µF take about how long to reach two thirds full?', a: ['1 second', '10 seconds', 'A thousandth of a second'], ok: 0, why: 'Resistance × capacitance: 10,000 × 0.0001 = 1 second.' },
    { q: 'What is a capacitor often used for on a board?', a: ['Making light', 'Smoothing bumps in the power supply', 'Measuring temperature'], ok: 1, why: 'It soaks up dips and spikes, so the board stays steady when a motor starts.' },
  ],
  'circuits:transistors-as-switches': [
    { q: 'Why can\'t a pin light a big bulb directly?', a: ['A pin gives only about 20 mA', 'Pins only work with LEDs', 'The bulb needs AC'], ok: 0, why: 'A bulb or motor wants hundreds of milliamps. The transistor carries that for the pin.' },
    { q: 'What does a small current into the base do?', a: ['Nothing', 'Lets a much bigger current flow from collector to emitter', 'Charges the battery'], ok: 1, why: 'About a hundred times bigger, up to what the transistor can take.' },
    { q: 'What must the base always have?', a: ['A resistor in front of it', 'A capacitor', 'Its own battery'], ok: 0, why: 'Without one, the pin pours current into the base and both can be damaged.' },
  ],
  'circuits:motors-and-drivers': [
    { q: 'A small motor wants about 200 mA. A pin gives about 20 mA. So…', a: ['Use two pins', 'The pin drives a driver, and the driver powers the motor', 'Run the motor slower'], ok: 1, why: 'The pin only sends a tiny signal into the transistor; the motor\'s current comes from the supply.' },
    { q: 'How does analogWrite() set a motor\'s speed?', a: ['It lowers the voltage smoothly', 'It flicks the driver on and off hundreds of times a second', 'It changes the gears'], ok: 1, why: 'The longer each "on" slice, the faster the motor runs. That is PWM.' },
    { q: 'What is the diode across the motor for?', a: ['Catching the kick when it stops', 'Making it louder', 'Reversing it'], ok: 0, why: 'A motor is a coil, and a coil kicks back when its current stops suddenly.' },
  ],
  'circuits:sensors-digital-analog': [
    { q: 'A motion sensor that only says "someone moved" or "nobody" is…', a: ['Digital', 'Analog', 'Broken'], ok: 0, why: 'Digital sensors give yes or no, so digitalRead() reads 1 or 0.' },
    { q: 'analogRead() turns 0 to 5 V into a number from…', a: ['0 to 1', '0 to 255', '0 to 1023'], ok: 2, why: 'That is 1,024 steps, about 5 millivolts each.' },
    { q: 'Why does a light sensor sit in a divider with a fixed resistor?', a: ['To turn its changing resistance into a changing voltage', 'To make it brighter', 'To protect it from rain'], ok: 0, why: 'The board reads voltages, not ohms. The middle of the divider rises and falls with the light.' },
  ],
  'circuits:the-multimeter': [
    { q: 'To measure volts across a resistor, the probes go…', a: ['Across it, one each side', 'In a gap in the loop', 'Only on the battery'], ok: 0, why: 'Volts are measured across a part while the circuit runs.' },
    { q: 'To measure amps, the meter must be…', a: ['Across the battery', 'In the loop, so the current flows through it', 'Switched off'], ok: 1, why: 'Open a gap and bridge it with the probes: the meter goes in series.' },
    { q: 'Why switch the power off before measuring ohms?', a: ['To save the battery', 'The meter sends its own tiny current to measure', 'Ohms only exist when it is off'], ok: 1, why: 'The circuit\'s own power would spoil the reading, and can damage the meter.' },
  ],
  'circuits:reading-a-circuit-diagram': [
    { q: 'In a circuit diagram, what matters?', a: ['Where each part sits on the bench', 'What is joined to what', 'The colour of the wires'], ok: 1, why: 'A schematic shows only the joins. The layout on the breadboard can look completely different.' },
    { q: 'On a battery symbol, the long line is…', a: ['+', '−', 'The switch'], ok: 0, why: 'Long line plus, short line minus.' },
    { q: 'How do you read a diagram?', a: ['Left to right like a book', 'Follow the loop from + all the way round to −', 'Start with the biggest part'], ok: 1, why: 'Current flows round a loop, so trace it from plus back to minus.' },
  ],
  'circuits:blink-an-led': [
    { q: 'What do digitalWrite(13, HIGH) and LOW do?', a: ['Switch the pin to 5 V and 0 V', 'Make the LED brighter and dimmer', 'Read a button'], ok: 0, why: 'The pin is a switch your code controls: HIGH is 5 V, LOW is 0 V.' },
    { q: 'Why does the LED need a resistor?', a: ['To change its colour', 'To keep the current small so it doesn\'t burn out', 'To make it blink'], ok: 1, why: 'The resistor holds it to about 12 mA.' },
    { q: 'What sets how fast it blinks?', a: ['The resistor', 'The delay() between on and off', 'The colour of the LED'], ok: 1, why: 'delay(500) waits half a second, so on and off swap twice a second.' },
  ],
  'circuits:flashing-open-sign': [
    { q: 'Why is each letter of OPEN on its own pin?', a: ['So the sketch can light them in any order', 'To use less power', 'Because LEDs need separate boards'], ok: 0, why: 'One pin per letter means your code decides which letter is lit, and when.' },
    { q: 'What does a for loop save you?', a: ['Electricity', 'Writing the same lines again and again', 'The resistors'], ok: 1, why: 'A few lines in a loop make a pattern that repeats all day.' },
    { q: 'Why do signs flash rather than stay on?', a: ['Flashing catches the eye from across the street', 'Flashing uses no power', 'LEDs cannot stay on'], ok: 0, why: 'Movement is what people notice.' },
  ],
  'circuits:dimmer-knob': [
    { q: 'What does the knob (potentiometer) give pin A0?', a: ['Any voltage between 0 and 5 V', 'Only 0 or 5 V', 'A radio signal'], ok: 0, why: 'It is a divider you can turn, so the middle voltage slides smoothly.' },
    { q: 'analogRead() gives 0 to 1023, but analogWrite() wants…', a: ['0 to 255', '0 to 5', '0 to 1023'], ok: 0, why: 'So the sketch divides by 4, or uses map(), to fit one range into the other.' },
    { q: 'How does PWM dim the lamp?', a: ['It switches it on and off very fast, on for a smaller share of the time', 'It lowers the current with a resistor', 'It changes the bulb'], ok: 0, why: 'Your eye averages the flicker, so a shorter "on" share looks dimmer.' },
  ],
  'circuits:serial-monitor': [
    { q: 'What does Serial.println() do?', a: ['Prints on paper', 'Sends a line of text from the board to your computer', 'Turns on an LED'], ok: 1, why: 'The text travels down the USB cable to the serial monitor.' },
    { q: 'Why is the serial monitor the first tool when something goes wrong?', a: ['It shows what the sketch is thinking', 'It fixes the code', 'It resets the board'], ok: 0, why: 'Printing values lets you see what the board really reads and decides.' },
    { q: 'Both ends must use the same…', a: ['Baud rate (speed)', 'Colour', 'Pin number'], ok: 0, why: 'Serial.begin(9600) on the board must match 9600 in the monitor, or the text comes out as garbage.' },
  ],
  'circuits:queue-number-display': [
    { q: 'Why does the 4-digit display need only two data wires?', a: ['Its own chip drives the segments', 'It only shows two digits', 'It runs on batteries'], ok: 0, why: 'The board sends the number over two wires and the chip on the display lights the right segments.' },
    { q: 'What happens when the cashier presses the button?', a: ['The display steps on to the next number, with a chime', 'The display turns off', 'The number goes back to zero'], ok: 0, why: 'Each press is counted, shown, and announced with a chime so everyone looks up.' },
    { q: 'A 7-segment digit is made of…', a: ['Seven bars that light in different patterns', 'Seven tiny screens', 'One bulb behind a stencil'], ok: 0, why: 'Light the right bars and you can draw any digit from 0 to 9.' },
  ],
  'circuits:ringtone-buzzer': [
    { q: 'What does tone(8, 440) do?', a: ['Flicks pin 8 on and off 440 times a second', 'Sets the volume to 440', 'Waits 440 milliseconds'], ok: 0, why: '440 flicks a second makes the note A.' },
    { q: 'A passive buzzer is really…', a: ['A tiny speaker that plays the note the pin sends', 'A light', 'A motor'], ok: 0, why: 'It has no tune of its own; the board decides the pitch.' },
    { q: 'How does the sketch store a tune?', a: ['As a sound file', 'As arrays of notes and their lengths', 'In the buzzer'], ok: 1, why: 'A loop walks through the arrays and plays each note for its length.' },
  ],
  'circuits:lcd-clock': [
    { q: 'Why add a real-time clock module?', a: ['The board\'s millis() forgets everything when the power goes off', 'It makes the screen brighter', 'The board has no timer at all'], ok: 0, why: 'The module has its own coin cell and crystal, so it keeps time through every outage.' },
    { q: 'How does the board ask the clock module the time?', a: ['Over I2C, two wires', 'Over Wi-Fi', 'By reading a light'], ok: 0, why: 'I2C lets several modules share the same two wires.' },
    { q: 'What keeps the clock module accurate?', a: ['A quartz crystal', 'The LCD', 'The USB cable'], ok: 0, why: 'A crystal vibrates at a very steady rate, like in a wristwatch.' },
  ],
  'circuits:sound-level-meter': [
    { q: 'A microphone module gives…', a: ['A voltage that wobbles around the middle with the sound', 'A number in decibels', 'Only 0 or 5 V'], ok: 0, why: 'Sound is a wave, so the voltage swings up and down around a midpoint.' },
    { q: 'How does the sketch tell loud from quiet?', a: ['It takes many quick readings and finds how far they swing', 'It reads once a minute', 'It asks the phone'], ok: 0, why: 'A loud sound makes a bigger swing between the highest and lowest reading.' },
    { q: 'What shows the level?', a: ['More LEDs on the bar light up as it gets louder', 'The board beeps', 'A motor turns'], ok: 0, why: 'The swing is mapped onto eight LEDs, like a level meter on a stereo.' },
  ],
  'circuits:shop-motion-alarm': [
    { q: 'What does a PIR sensor detect?', a: ['The body heat of something moving', 'Sound', 'Light from a torch'], ok: 0, why: 'Passive infrared: it sees warm bodies move across its view.' },
    { q: 'How does the board read the PIR?', a: ['One digital pin: HIGH for a few seconds when it sees movement', 'An analog pin and a formula', 'Over Wi-Fi'], ok: 0, why: 'The PIR does the hard work; the board just watches one pin.' },
    { q: 'When should the alarm be armed?', a: ['At night, when the shop is locked', 'All day while customers shop', 'Never'], ok: 0, why: 'During opening hours the movement is customers, not intruders.' },
  ],
  'circuits:control-a-motor': [
    { q: 'Why can\'t pin 6 power the motor itself?', a: ['It gives about 20 mA and the motor wants 200 mA', 'Pins only give AC', 'Motors need no power'], ok: 0, why: 'The pin would sag and could be damaged. It switches a transistor instead.' },
    { q: 'What does the transistor do here?', a: ['Lets 5 V through the motor when the pin tells it to', 'Stores energy', 'Measures speed'], ok: 0, why: 'A small current from the pin switches a much bigger one through the motor.' },
    { q: 'How do you change the motor\'s speed?', a: ['analogWrite() with a value from 0 to 255', 'Change the wire colour', 'Unplug it faster'], ok: 0, why: 'PWM sets the share of time the transistor is on.' },
  ],
  'circuits:hello-esp32': [
    { q: 'What does the ESP32 have that an Uno doesn\'t?', a: ['Wi-Fi and Bluetooth built in', 'A screen', 'A battery'], ok: 0, why: 'That is why it can be a tiny website on your home network.' },
    { q: 'When your phone opens /on, what happens?', a: ['The sketch runs the matching function: LED on, then sends the page back', 'The phone turns on', 'Nothing until you reboot'], ok: 0, why: 'Each address runs its own function in the sketch.' },
    { q: 'The ESP32\'s pins work at…', a: ['3.3 V', '5 V', '12 V'], ok: 0, why: 'Feeding them 5 V can damage the chip.' },
  ],
  'circuits:security-light': [
    { q: 'Why have both a light sensor and a PIR?', a: ['So it only comes on when it is dark and someone is there', 'To make it brighter', 'One is a spare'], ok: 0, why: 'No point lighting the yard in daylight or when nobody is around.' },
    { q: 'What does each new movement do to the timer?', a: ['Restarts the 30 seconds', 'Turns the light off', 'Nothing'], ok: 0, why: 'So the light stays on while someone is moving, then goes off after they leave.' },
    { q: 'Why is the light sensor\'s divider fed from 3.3 V?', a: ['ESP32 pins must not see more than 3.3 V', 'It saves battery', 'The sensor is small'], ok: 0, why: 'A 5 V divider could push the pin above what it can take.' },
  ],
  'circuits:phone-doorbell': [
    { q: 'Why does the sketch check the button again 30 ms later?', a: ['Switches bounce, flickering on and off for a moment', 'To save power', 'To play the tune'], ok: 0, why: 'Debouncing stops one press counting as several.' },
    { q: 'Why a 10-second cool-down on the phone alert?', a: ['Visitors press three or four times', 'The phone is slow', 'The battery needs rest'], ok: 0, why: 'You get one message per visit, not five.' },
    { q: 'With the pull-up on, a pressed bell push reads…', a: ['LOW', 'HIGH', '1023'], ok: 0, why: 'The pull-up holds the pin HIGH; pressing joins it to ground.' },
  ],
  'circuits:internet-clock': [
    { q: 'Why ask a time server instead of counting on the board?', a: ['A plain clock drifts, and restarts from midnight after a power cut', 'It is cheaper', 'Boards cannot count'], ok: 0, why: 'The server sends the exact time whenever the board asks.' },
    { q: 'What does the offset in configTime() set?', a: ['How far your time zone is from world time', 'The Wi-Fi password', 'The bell\'s volume'], ok: 0, why: 'Arizona is seven hours behind world time, all year round.' },
    { q: 'If the internet drops for a while, the clock…', a: ['Keeps counting by itself', 'Stops at once', 'Goes back to midnight'], ok: 0, why: 'It only needs the server now and then to stay exact.' },
  ],
  'circuits:bluetooth-phone-control': [
    { q: 'What does the ESP32 pretend to be over Bluetooth?', a: ['A serial cable', 'A speaker', 'A keyboard'], ok: 0, why: 'Whatever the phone types arrives in the sketch like text from the Serial Monitor.' },
    { q: 'Do you need a router or mobile data?', a: ['No: the phone and board talk directly', 'Yes, both', 'Only a router'], ok: 0, why: 'Bluetooth is a short-range radio between the two devices.' },
    { q: 'About how far does it reach?', a: ['About 30 feet (10 m), through a wall or two', 'Across a whole city', 'Only touching'], ok: 0, why: 'Enough to switch a lamp from bed, not from across town.' },
  ],
  'circuits:live-sensor-dashboard': [
    { q: 'Where does the dashboard page come from?', a: ['The ESP32 builds it and serves it itself', 'A website on the internet', 'An app store'], ok: 0, why: 'The board is the web server; any phone on the same Wi-Fi can open it.' },
    { q: 'How does it keep the last 30 readings?', a: ['In an array, shifting the oldest out', 'On a memory card', 'In the phone'], ok: 0, why: 'Each new reading pushes the oldest one off the end.' },
    { q: 'Why does the page reload every 2 seconds?', a: ['To show the newest reading', 'To save battery', 'To log in again'], ok: 0, why: 'A line in the page asks the phone to fetch it again.' },
  ],
  'circuits:gas-leak-alarm': [
    { q: 'Why does the gas sensor sit low, near the tank?', a: ['Propane is heavier than air and sinks', 'It is out of sight there', 'Sensors work better on the floor'], ok: 0, why: 'Leaking gas spreads along the floor, so that is where it is found first.' },
    { q: 'Why divide the sensor\'s output with two resistors?', a: ['It can reach over 4 V, too much for a 3.3 V pin', 'To make it more sensitive', 'To slow it down'], ok: 0, why: 'Two thirds of 4.5 V is safe for the ESP32.' },
    { q: 'Why does the sketch wait before trusting the sensor?', a: ['Its heater needs time to warm up', 'The Wi-Fi is slow', 'Gas takes time to exist'], ok: 0, why: 'A cold sensor gives false readings.' },
  ],
  'circuits:intruder-alert': [
    { q: 'How does a reed switch know the shutter opened?', a: ['A magnet on the shutter holds it closed; lifting the shutter lets it open', 'It hears the noise', 'It sees light'], ok: 0, why: 'Two metal strips in a glass tube snap together near a magnet and apart without it.' },
    { q: 'Why add a PIR as well?', a: ['Thieves can come in through the ceiling, not the shutter', 'To light the shop', 'To count customers'], ok: 0, why: 'Two sensors cover two ways in.' },
    { q: 'What does "armed" mean here?', a: ['The sensors will set off the siren and alert', 'The board is switched off', 'The door is locked by the board'], ok: 0, why: 'You arm it when you lock up and disarm it in the morning.' },
  ],
  'circuits:sink-leak-alarm': [
    { q: 'How does the water sensor feel a leak?', a: ['Water bridges its bare copper fingers', 'It weighs the water', 'It hears dripping'], ok: 0, why: 'Dry, nothing joins the fingers; wet, current flows and the reading rises.' },
    { q: 'Where should the sensor lie?', a: ['Flat on the floor where a drip would land', 'On top of the sink', 'Inside the tap'], ok: 0, why: 'It can only feel water that actually reaches it.' },
    { q: 'Why does the alarm keep going until someone presses the button?', a: ['A leak doesn\'t fix itself', 'To save power', 'The buzzer can\'t stop'], ok: 0, why: 'A beep that stops by itself is easy to miss.' },
  ],
  'circuits:fridge-door-alarm': [
    { q: 'What tells the board the fridge door is open?', a: ['A reed switch and the magnet in the door', 'A camera', 'The temperature alone'], ok: 0, why: 'The magnet holds the switch closed; when the door swings away it opens.' },
    { q: 'Above about what temperature does food start to spoil?', a: ['46 °F (8 °C)', '70 °F (21 °C)', '32 °F (0 °C)'], ok: 0, why: 'That is when the phone alert goes out.' },
    { q: 'Why does the sketch read the DHT22 on a timer?', a: ['It needs two seconds between readings', 'It runs out of battery', 'It only works at night'], ok: 0, why: 'The door is checked in between, so neither job waits for the other.' },
  ],
  'circuits:keypad-door-lock': [
    { q: 'How do 8 pins read 16 keys?', a: ['Keys sit at the crossings of 4 rows and 4 columns', 'Each key shares a pin with its neighbour', 'It reads them by sound'], ok: 0, why: 'The library sets one row LOW at a time and reads the columns.' },
    { q: 'What happens after three wrong PINs?', a: ['It refuses to listen for half a minute', 'The door opens anyway', 'The board resets the PIN'], ok: 0, why: 'A lockout makes guessing the code very slow.' },
    { q: 'What draws the bolt back?', a: ['A servo', 'A magnet in the key', 'The buzzer'], ok: 0, why: 'For five seconds, then it locks again.' },
  ],
  'circuits:fall-alert': [
    { q: 'Standing still, an accelerometer feels about…', a: ['1 g, gravity', '0 g', '10 g'], ok: 0, why: 'Gravity pulls down at 1 g all the time.' },
    { q: 'What shape in the numbers means a fall?', a: ['A drop toward zero, then a hard hit, then lying still', 'One small bump', 'A slow steady rise'], ok: 0, why: 'Sitting down hard has the hit but not the drop, so it doesn\'t count.' },
    { q: 'Why can grandma press "I\'m OK" first?', a: ['A pendant that cries wolf soon gets left in a drawer', 'To charge it', 'To call the family faster'], ok: 0, why: 'Fewer false alarms means she keeps wearing it.' },
  ],
  'circuits:pill-reminder': [
    { q: 'How does the box know a dose was taken?', a: ['A switch under each lid reads HIGH when the lid opens', 'A camera watches', 'It weighs the pills'], ok: 0, why: 'Shut, the switch joins the pin to ground; open, the pull-up makes it HIGH.' },
    { q: 'Why a clock module?', a: ['It keeps time even through power cuts', 'It is louder', 'It holds the pills'], ok: 0, why: 'The dose times must stay right whatever happens to the power.' },
    { q: 'What happens if half an hour passes with the lid still shut?', a: ['Her daughter\'s phone gets a message', 'The box opens itself', 'Nothing'], ok: 0, why: 'A missed dose is worth a call.' },
  ],
  'circuits:ir-remote-tv-ac': [
    { q: 'How does a TV remote talk to the TV?', a: ['Flashes of infrared light in a pattern', 'Bluetooth', 'Sound too high to hear'], ok: 0, why: 'The flashes are too fast and too red for our eyes, but the TV reads them as a code.' },
    { q: 'An NEC code carries…', a: ['An address (which machine) and a command (which button)', 'A picture', 'The time'], ok: 0, why: 'So one board can be every remote in the house if it knows the codes.' },
    { q: 'Why do air-conditioner remotes send the whole setting each time?', a: ['So the AC never gets out of step with the remote', 'To use more battery', 'They are older'], ok: 0, why: 'Mode, temperature and fan go together in every message.' },
  ],
  'circuits:auto-water-garden': [
    { q: 'Why water by soil moisture instead of the clock?', a: ['A timer wastes water on cloudy days and starves plants on hot ones', 'Timers are expensive', 'Plants like surprises'], ok: 0, why: 'Ask the soil how wet it is, then water.' },
    { q: 'Why switch on at 30 % but off at 60 %?', a: ['The gap stops the pump flicking on and off all day', 'The sensor is wrong', 'To save the battery'], ok: 0, why: 'One threshold would make it chatter around 30 %.' },
    { q: 'Why water in short bursts and wait?', a: ['Water takes time to soak down to the probe', 'The pump overheats instantly', 'Plants drink in sips'], ok: 0, why: 'Otherwise the bed floods before the probe notices.' },
  ],
  'circuits:smart-bin': [
    { q: 'How does the bin know how full it is?', a: ['An ultrasonic sensor times its echo off the top of the trash', 'It weighs itself', 'A camera counts bags'], ok: 0, why: 'A short echo means the trash is near the rim.' },
    { q: 'Why does the lid stay shut at 95 %?', a: ['A bag forced into a full bin just falls out again', 'To keep it warm', 'The servo is tired'], ok: 0, why: 'A red light says full instead.' },
    { q: 'When does it alert the collectors?', a: ['At 80 %, before it overflows', 'Every hour', 'Only when it is empty'], ok: 0, why: 'Early warning gives them time to come.' },
  ],
  'circuits:fan-follows-heat': [
    { q: 'What do map() and constrain() do here?', a: ['Stretch the temperature into a speed and keep it between 0 and 255', 'Draw a map of the room', 'Slow the board down'], ok: 0, why: 'Off below 26 °C, full speed at 38 °C, and in proportion in between.' },
    { q: 'Why does any speed start from about a third of full power?', a: ['Below that a small motor only hums and won\'t turn', 'To save power', 'The thermistor needs it'], ok: 0, why: 'So the fan always actually starts.' },
    { q: 'What reads the room temperature?', a: ['A thermistor', 'A light sensor', 'A microphone'], ok: 0, why: 'Its resistance changes with heat.' },
  ],
  'circuits:rain-gauge': [
    { q: 'What happens each time the tipping bucket fills?', a: ['It tips, and a magnet passes the reed switch', 'It beeps', 'It sends a photo'], ok: 0, why: 'Each tip means 0.28 mm (about a hundredth of an inch) of rain.' },
    { q: 'Why count tips with an interrupt?', a: ['So the board never misses one', 'To use more power', 'Because loop() can\'t count'], ok: 0, why: 'An interrupt runs the moment the pin changes, whatever loop() is doing.' },
    { q: 'The time between two tips tells you…', a: ['How hard it is raining right now', 'The temperature', 'The wind direction'], ok: 0, why: 'Tips close together mean heavy rain.' },
  ],
  'circuits:visitor-counter': [
    { q: 'Why two beams instead of one?', a: ['To tell coming in from going out', 'To count twice as fast', 'One is a spare'], ok: 0, why: 'In breaks A then B; out breaks B then A.' },
    { q: 'What happens when the count reaches the limit?', a: ['A red light tells the next customer to wait', 'The door locks', 'The count resets'], ok: 0, why: 'It shows how many are inside right now.' },
    { q: 'Why might the owner check the daily total?', a: ['To know the busy hours and how many staff to have on', 'To pay the electricity bill', 'For fun only'], ok: 0, why: 'Counts turn into decisions about staff and adverts.' },
  ],
  'circuits:update-over-wifi': [
    { q: 'What does OTA ("over the air") let you do?', a: ['Send a new sketch to the board over Wi-Fi', 'Charge it wirelessly', 'Fly it like a drone'], ok: 0, why: 'No ladder, no USB cable, even if the board is up a lamp post.' },
    { q: 'What does ArduinoOTA.handle() in loop() do?', a: ['Checks whether a new sketch is arriving', 'Blinks the LED', 'Reads the light sensor'], ok: 0, why: 'If one is, the ESP32 stores it, checks it and restarts with it.' },
    { q: 'Why does version 2 wait five seconds before switching?', a: ['So a passing car\'s headlights can\'t turn the street lamp off', 'To save power', 'The Wi-Fi is slow'], ok: 0, why: 'A short flash of light is ignored; real daylight lasts.' },
  ],
  'circuits:sms-alert-gsm': [
    { q: 'Why use a GSM module on a farm?', a: ['There may be no Wi-Fi, but there is usually a phone signal', 'It is faster than Wi-Fi', 'It measures soil'], ok: 0, why: 'Text messages work over the plain phone network.' },
    { q: 'How does the ESP32 tell the GSM module what to do?', a: ['By typing "AT commands" to it over serial', 'With a USB cable', 'By flashing a light'], ok: 0, why: 'The module is a tiny phone with no screen, driven by text commands.' },
    { q: 'Why does the sketch check the sender\'s number?', a: ['So only the farmer can start the pump', 'To save money', 'Numbers must be even'], ok: 0, why: 'A stranger who learns the word WATER can\'t use it.' },
  ],
  'circuits:esp-now-two-boards': [
    { q: 'What is ESP-NOW?', a: ['ESP32 boards talking straight to each other, with no router', 'A phone app', 'A faster USB cable'], ok: 0, why: 'A little like walkie-talkies over the Wi-Fi radio.' },
    { q: 'What is a callback here?', a: ['A function the radio calls by itself when a packet arrives', 'A phone call back', 'A reset button'], ok: 0, why: 'The house board doesn\'t have to keep asking; the radio tells it.' },
    { q: 'What do the numbers in the message mean?', a: ['1 is "someone at the gate", 2 is "coming"', 'The temperature', 'The battery level'], ok: 0, why: 'A tiny agreed code is all two boards need.' },
  ],
  'circuits:sd-weather-logger': [
    { q: 'What is a CSV file?', a: ['Lines of values separated by commas, which a spreadsheet can open', 'A photo', 'A sound file'], ok: 0, why: 'Time, temperature and humidity on each line.' },
    { q: 'Why close the file after every line?', a: ['If the power goes, everything written so far is safe', 'To save ink', 'The card is small'], ok: 0, why: 'An open file can be lost or corrupted in a power cut.' },
    { q: 'Why does the sensor sit in a white slatted box?', a: ['To keep the sun off it while air flows through', 'To hide it', 'To keep it dry inside water'], ok: 0, why: 'Sun on a sensor measures the sun, not the air.' },
  ],
  'circuits:roadside-air-quality': [
    { q: 'What is PM2.5?', a: ['Specks of dust and soot smaller than 2.5 micrometres', 'A kind of gas', 'A time of day'], ok: 0, why: 'Small enough to go deep into the lungs.' },
    { q: 'How does the dust sensor work?', a: ['It measures how much infrared light the dust scatters', 'It weighs the dust', 'It smells it'], ok: 0, why: 'More dust in the little hole means more scattered light.' },
    { q: 'Why average the last 30 readings?', a: ['One reading jumps about with every bus that passes', 'To save power', 'The display is slow'], ok: 0, why: 'The average shows the real air, not one puff of exhaust.' },
  ],
  'circuits:vaccine-fridge-monitor': [
    { q: 'Vaccines must stay between…', a: ['36 and 46 °F (2 and 8 °C)', '32 and 70 °F', 'Below freezing'], ok: 0, why: 'Too warm and they weaken; frozen and some are ruined at once.' },
    { q: 'Why does the probe sit in a small bottle of water?', a: ['It warms and cools slowly, like the vaccines', 'To keep it clean', 'So it floats'], ok: 0, why: 'Opening the door for a minute won\'t set off a false alarm, but a power cut will.' },
    { q: 'What does the monitor catch that a paper chart misses?', a: ['Everything that happens at night', 'The colour of the vaccines', 'The patients'], ok: 0, why: 'A chart filled in twice a day sees nothing in between.' },
  ],
  'circuits:farm-sensor-mesh': [
    { q: 'What is a mesh?', a: ['Each node passes on its neighbours\' messages, so they hop home', 'One big radio for everything', 'A fence around the farm'], ok: 0, why: 'The far rows reach the office by hopping through closer nodes.' },
    { q: 'Why does every message carry a number that counts up?', a: ['So a node that hears the same message twice passes it on only once', 'To show the time', 'For fun'], ok: 0, why: 'Without it, messages would echo round forever.' },
    { q: 'Why stop after three hops?', a: ['So the mesh doesn\'t drown in its own messages', 'Radios can only hop three times', 'To save soil'], ok: 0, why: 'A hop limit keeps old messages from circling.' },
  ],
  'circuits:community-weather-station': [
    { q: 'Why count the rain gauge and wind meter with interrupts?', a: ['The board may be busy serving a page when a tip comes', 'They are too slow', 'To save memory'], ok: 0, why: 'An interrupt never misses a pulse.' },
    { q: 'How does the wind meter measure speed?', a: ['Its cups close a reed switch once a turn; turns a second give the speed', 'It weighs the wind', 'A camera watches the trees'], ok: 0, why: 'One turn a second is 2.4 km/h, about 1.5 mph.' },
    { q: 'Why put a weather station on a school roof?', a: ['People want the weather where they live, not in a city far away', 'Roofs are warmer', 'It is quieter there'], ok: 0, why: 'Local readings help farmers, families and the school.' },
  ],
  'circuits:smart-water': [
    { q: 'How does the echo sensor tell how full the tank is?', a: ['It measures the gap down to the water', 'It weighs the tank', 'It counts the taps'], ok: 0, why: 'A small gap means a full tank; map() turns it into a percentage.' },
    { q: 'Why stop the pump if the level hasn\'t risen after a while?', a: ['The well is dry or a pipe is broken, and a dry pump burns out', 'To save the phone battery', 'The tank is shy'], ok: 0, why: 'No rise means no water is arriving.' },
    { q: 'What switches the mains pump?', a: ['A relay, so the board never touches the mains', 'The board pin directly', 'The echo sensor'], ok: 0, why: 'The relay\'s coil is driven by the board; its contacts carry the pump\'s power.' },
  ],
  'circuits:shop-security-system': [
    { q: 'What is the exit delay for?', a: ['Time to step out and pull the shutter down after arming', 'Time for the siren to warm up', 'Time to call the police'], ok: 0, why: 'Ten seconds to leave before the alarm is live.' },
    { q: 'Why does the PIR have no delay at all?', a: ['A thief through the ceiling never touches the shutter', 'PIRs are slow', 'It saves power'], ok: 0, why: 'Movement inside while the shutter is shut is always an alarm.' },
    { q: 'Why send an alert after three wrong PINs?', a: ['Someone may be guessing', 'The keypad is broken', 'To reset it'], ok: 0, why: 'Repeated wrong codes are a warning sign.' },
  ],
  'circuits:afrobeats-beat-box': [
    { q: 'How does the sketch store each drum\'s pattern?', a: ['Eight true-or-false values in an array', 'A recording', 'One long number'], ok: 0, why: 'Each value says whether that drum hits on that step.' },
    { q: 'What sets the tempo?', a: ['A knob the board reads', 'The keypad colour', 'The buzzer size'], ok: 0, why: 'About 100 to 115 beats a minute for hip-hop.' },
    { q: 'Why is a drum machine "a loop that never stops"?', a: ['It walks through the eight steps of a bar, again and again', 'It runs out of battery', 'It only plays once'], ok: 0, why: 'At each step it plays whatever is switched on.' },
  ],
  'circuits:automatic-estate-gate': [
    { q: 'Why does the gate need a limit switch at each end?', a: ['The board can\'t see the gate, so the switches say when to stop', 'To lock it', 'To light it'], ok: 0, why: 'Without them the motor grinds against the end of the rail.' },
    { q: 'What does the infrared beam do?', a: ['Stops and reopens the gate if anything breaks it while closing', 'Counts cars', 'Opens the gate from far away'], ok: 0, why: 'It is the safety: a gate must never close on a car or a child.' },
    { q: 'What is a state machine?', a: ['A sketch that is always in one state (shut, opening, open, closing) and only watches for what can happen next', 'A machine owned by the state', 'A random program'], ok: 0, why: 'Each state has its own small list of jobs.' },
  ],
  'circuits:bean-sorter': [
    { q: 'What does the colour sensor actually give?', a: ['Three numbers: how much red, green and blue comes back', 'The word "brown"', 'A photo'], ok: 0, why: 'The sketch decides what those numbers mean.' },
    { q: 'How does a stone or a spoilt bean look to the sensor?', a: ['Little light comes back and no colour stands out', 'Very bright red', 'Exactly like a good bean'], ok: 0, why: 'That is how the sorter rejects it.' },
    { q: 'Why does the second servo move before the bean drops?', a: ['To aim the chute at the right bowl in time', 'To shake the hopper', 'To weigh the bean'], ok: 0, why: 'The chute must be in place before the bean falls.' },
  ],
  'circuits:bird-scarer': [
    { q: 'Why scare only when birds are there?', a: ['A scare that goes off all the time soon means nothing to them', 'To save the battery', 'Birds like it'], ok: 0, why: 'Birds learn fast; a surprise keeps working.' },
    { q: 'What sees the flock land?', a: ['A PIR sensor facing the field', 'A microphone', 'A rain gauge'], ok: 0, why: 'It feels the movement of warm bodies.' },
    { q: 'What does the board do when birds come?', a: ['Sweeps a flag on a servo and sounds a buzzer', 'Sends a text only', 'Turns on the sprinklers'], ok: 0, why: 'Movement and noise together lift the flock off.' },
  ],
  'circuits:borehole-pump-timer': [
    { q: 'Why turn the time into minutes since midnight?', a: ['So "is it pump time?" is one simple comparison', 'Clocks only count minutes', 'To save power'], ok: 0, why: '6:00 is 360, 6:20 is 380: one number is easy to compare.' },
    { q: 'Why use a clock module?', a: ['It keeps time through every power cut', 'It pumps the water', 'It is cheaper than a button'], ok: 0, why: 'The schedule must survive outages.' },
    { q: 'What does the wall button do?', a: ['Starts an extra 20 minutes of pumping', 'Stops the clock', 'Resets the tank'], ok: 0, why: 'For days when the house needs more water.' },
  ],
  'circuits:brt-arrival-board': [
    { q: 'How does the board know how far away each bus is?', a: ['It asks the bus company\'s server, which tracks every bus by GPS', 'It listens for engines', 'It guesses'], ok: 0, why: 'The board only shows what the server already knows.' },
    { q: 'What do indexOf and substring do with each line?', a: ['Find the comma and cut out the name and the minutes', 'Encrypt it', 'Make it louder'], ok: 0, why: 'Then toInt turns "4" into the number 4.' },
    { q: 'How often does the board ask?', a: ['Every 10 seconds', 'Once a day', 'Only when someone presses a button'], ok: 0, why: 'Often enough that the minutes stay right.' },
  ],
  'circuits:car-battery-voltage': [
    { q: 'Why can\'t A0 read a 12 V battery directly?', a: ['A pin takes 5 V at most', 'Batteries give AC', 'A0 only reads light'], ok: 0, why: 'More than 5 V can damage the board.' },
    { q: 'The voltage sensor divides by 5. 12.6 V reaches A0 as about…', a: ['2.5 V', '12.6 V', '63 V'], ok: 0, why: 'Multiply the reading by 5 again to get the battery\'s voltage.' },
    { q: 'A healthy, fully charged 12 V car battery reads about…', a: ['12.6 V', '9 V', '5 V'], ok: 0, why: 'Much lower and the car may not start.' },
  ],
  'circuits:catfish-pond': [
    { q: 'When is a pond lowest on oxygen?', a: ['Just before dawn', 'At noon', 'Right after rain'], ok: 0, why: 'At night the algae stop making oxygen and start using it.' },
    { q: 'Why run the air pump above 86 °F (30 °C)?', a: ['Warm water holds less oxygen', 'Fish like bubbles', 'To cool the pump'], ok: 0, why: 'The bubbles mix air back into the water.' },
    { q: 'What two things decide when the pump runs?', a: ['The water temperature and the time of night', 'The fish count and the price', 'The colour of the water'], ok: 0, why: 'A thermistor probe and a clock module tell the board.' },
  ],
  'circuits:charging-kiosk-billing': [
    { q: 'How does the kiosk know a phone is really charging?', a: ['A current sensor sees more than 0.15 A flowing', 'It asks the phone', 'It counts minutes no matter what'], ok: 0, why: 'A full phone draws almost nothing, so those minutes aren\'t billed.' },
    { q: 'Why is billing by the minute fairer?', a: ['A nearly full phone doesn\'t pay for 30 minutes it doesn\'t need', 'It is cheaper to build', 'Phones prefer it'], ok: 0, why: 'You pay for the charging you actually get.' },
    { q: 'What happens when the current stays low for a while?', a: ['The relay switches the port off: the phone is full or gone', 'The price goes up', 'Nothing'], ok: 0, why: 'That frees the port for the next customer.' },
  ],
  'circuits:charging-kiosk-timer': [
    { q: 'What does each button press buy?', a: ['30 minutes of charging', 'One phone call', 'A new battery'], ok: 0, why: 'The display counts the time down.' },
    { q: 'What switches the charging strip on and off?', a: ['A relay', 'The display', 'The buzzer'], ok: 0, why: 'The board drives the relay; the relay carries the charger\'s power.' },
    { q: 'When does the buzzer beep?', a: ['When the time runs out', 'Every minute', 'When a phone is full'], ok: 0, why: 'So the kiosk keeper knows a slot is finished.' },
  ],
  'circuits:chick-brooder': [
    { q: 'Day-old chicks want about…', a: ['91 °F (33 °C) in the first week', '60 °F (16 °C)', '120 °F (49 °C)'], ok: 0, why: 'Then about 5 °F (3 °C) less each week until their feathers come in.' },
    { q: 'Why does the probe sit on the floor, not by the lamp?', a: ['That is where the chicks are', 'It is cooler there', 'Lamps break probes'], ok: 0, why: 'You want the temperature the chicks actually feel.' },
    { q: 'Chicks crowded at the walls, away from the lamp, mean…', a: ['Too hot', 'Too cold', 'Just right'], ok: 0, why: 'Huddled under the lamp is too cold; spread out is right.' },
  ],
  'circuits:clinic-queue-caller': [
    { q: 'Why does a numbered ticket make the queue fair?', a: ['Patients are seen in order, not by who shouts loudest', 'It is faster to print', 'Doctors like numbers'], ok: 0, why: 'Everyone can see their place.' },
    { q: 'What does the ticket tell the patient?', a: ['Their number, how many are ahead and roughly how long', 'Their diagnosis', 'The doctor\'s name'], ok: 0, why: 'Knowing the wait helps people plan.' },
    { q: 'Why serve a small web page as well?', a: ['A patient waiting outside can see the number being seen now', 'To book appointments', 'To pay bills'], ok: 0, why: 'They don\'t have to crowd the door.' },
  ],
  'circuits:drip-irrigation-timer': [
    { q: 'Why water at 6:00 and 17:00?', a: ['Less water is lost to the sun in the cool of the morning and evening', 'The pump is cheaper then', 'Plants sleep at noon'], ok: 0, why: 'A little and often, at the roots, at the coolest times.' },
    { q: 'What does a drip line do?', a: ['Puts water at the roots through a tiny hole at each plant', 'Sprays the leaves', 'Floods the whole field'], ok: 0, why: 'Very little water is wasted.' },
    { q: 'Why does the smarter version ask the soil first?', a: ['After a night of rain there is no need to water', 'Soil likes questions', 'To charge the battery'], ok: 0, why: 'Too much water splits the fruit and rots the roots.' },
  ],
  'circuits:egg-incubator': [
    { q: 'An incubator holds the eggs at about…', a: ['99.5 °F (37.5 °C)', '70 °F (21 °C)', '120 °F (49 °C)'], ok: 0, why: 'Like a sitting hen, for 21 days.' },
    { q: 'Why switch the heater on at 37.3 °C and off at 37.7 °C?', a: ['The small gap stops it clicking every second', 'The sensor is wrong', 'Eggs like it'], ok: 0, why: 'Two limits instead of one give the relay a rest.' },
    { q: 'What does the servo do?', a: ['Tilts the egg tray one way, then the other, every few hours', 'Opens the lid', 'Feeds the chicks'], ok: 0, why: 'A hen turns her eggs, so the incubator must too.' },
  ],
  'circuits:fridge-surge-guard': [
    { q: 'What hands the board a safe copy of the mains wave?', a: ['A small transformer module', 'A bare wire', 'The fridge'], ok: 0, why: 'The board never touches the dangerous mains itself.' },
    { q: 'What happens outside the safe voltage band?', a: ['The relay cuts the fridge off at once', 'The fridge runs faster', 'Nothing'], ok: 0, why: 'Very high or very low voltage can burn a compressor.' },
    { q: 'Why wait before switching the fridge back on?', a: ['To let the mains settle and the compressor\'s pressures even out', 'To save money', 'The relay is slow'], ok: 0, why: 'A compressor started too soon can stall and burn out.' },
  ],
  'circuits:generator-fuel-gauge': [
    { q: 'What is a fuel sender?', a: ['A float that turns a variable resistor', 'A pump', 'A spark plug'], ok: 0, why: 'About 240 Ω empty and 33 Ω full.' },
    { q: 'How does the board read the sender?', a: ['It sits in a divider, so its ohms become a voltage A0 can read', 'It counts drops', 'It listens to the engine'], ok: 0, why: 'A little maths turns the reading back into a percentage.' },
    { q: 'Why does a fuel gauge matter in a blackout?', a: ['So the generator doesn\'t die in the middle of the night', 'It makes the generator quieter', 'It cools the engine'], ok: 0, why: 'You can refill before it runs dry.' },
  ],
  'circuits:generator-fumes-alarm': [
    { q: 'Why is carbon monoxide so dangerous?', a: ['You can\'t see or smell it, and it stops your blood carrying oxygen', 'It is very loud', 'It is hot'], ok: 0, why: 'People fall asleep near a running generator and don\'t wake up.' },
    { q: 'What does the alarm do at about 150 ppm?', a: ['Goes red, sounds the buzzer and sends a phone alert', 'Nothing yet', 'Turns the generator up'], ok: 0, why: 'At that level, get everyone out.' },
    { q: 'Where should a generator never run?', a: ['Inside a garage, a hallway or by an open window', 'Far from the house outdoors', 'On a driveway away from doors'], ok: 0, why: 'Fumes can fill a room within minutes.' },
  ],
  'circuits:generator-hour-counter': [
    { q: 'Why store the hours in EEPROM?', a: ['It keeps its contents with the power off', 'It is faster', 'It holds more numbers'], ok: 0, why: 'So the count survives every restart.' },
    { q: 'How does the board know the generator is running?', a: ['A phone charger on its socket gives pin 2 a voltage', 'It listens for the engine', 'It reads the fuel'], ok: 0, why: 'The charger is a safe way to sense the generator\'s output.' },
    { q: 'What does the red light say at 100 hours?', a: ['Change the oil', 'Out of fuel', 'Too hot'], ok: 0, why: 'Small generators want fresh oil about every 100 hours.' },
  ],
  'circuits:grain-store-humidity': [
    { q: 'Above about what humidity does mould start in a grain store?', a: ['70 %', '20 %', '5 %'], ok: 0, why: 'Some moulds make aflatoxin, a poison you can\'t see or cook away.' },
    { q: 'When should the vent fan run?', a: ['Only when the outside air is clearly drier than inside', 'All the time', 'Only on rainy nights'], ok: 0, why: 'Pulling in damp air would make the store wetter.' },
    { q: 'Why two humidity sensors?', a: ['One inside and one outside, to compare them', 'One is a spare', 'To measure twice as fast'], ok: 0, why: 'The decision depends on the difference.' },
  ],
  'circuits:gutter-flood-warning': [
    { q: 'How does the echo sensor find the water depth?', a: ['Height of the sensor minus the gap down to the water', 'It weighs the water', 'It counts raindrops'], ok: 0, why: 'The sensor times the echo off the water surface.' },
    { q: 'Why also check how fast the water is rising?', a: ['Half full and rising fast is more dangerous than three-quarters full and steady', 'To save power', 'Rising water is quieter'], ok: 0, why: 'Speed gives an earlier warning.' },
    { q: 'What do green, yellow and red show?', a: ['How full the gutter is', 'The temperature', 'The time of day'], ok: 0, why: 'A glance tells you whether it is safe.' },
  ],
  'circuits:h-bridge-toy-car': [
    { q: 'Why does reversing a motor need an H-bridge?', a: ['The current must flow through the motor the other way', 'Motors only go forward', 'To make it faster'], ok: 0, why: 'Four switches in an H can send the current either way.' },
    { q: 'On the L298N, what do IN1 and IN2 choose?', a: ['The direction', 'The speed', 'The colour'], ok: 0, why: 'A PWM signal on ENA sets the speed.' },
    { q: 'Where do the motors get their power?', a: ['Their own battery; the board only gives orders', 'The board\'s 5 V pin', 'The USB cable'], ok: 0, why: 'Motors want far more current than a board can give.' },
  ],
  'circuits:harmattan-heat-index': [
    { q: 'What does the heat index tell you?', a: ['How hot it actually feels', 'How hot the sun is', 'Tomorrow\'s weather'], ok: 0, why: 'Humidity changes how hot the same temperature feels.' },
    { q: 'How does a DHT sensor send its readings?', a: ['Down one data wire', 'Over Wi-Fi', 'As a sound'], ok: 0, why: 'A library decodes the pulses into temperature and humidity.' },
    { q: 'In very dry desert air, humidity can fall below…', a: ['15 %', '90 %', '60 %'], ok: 0, why: 'Dry air pulls water from your body fast, so drink more.' },
  ],
  'circuits:inverter-battery-monitor': [
    { q: 'Charge left divided by amps being drawn gives…', a: ['Hours left', 'The voltage', 'The temperature'], ok: 0, why: '100 amp-hours at 10 amps lasts about 10 hours.' },
    { q: 'The current sensor\'s output moves how much per amp?', a: ['66 mV', '5 V', '1 mV'], ok: 0, why: 'The sketch divides by 0.066 to get amps.' },
    { q: 'Why a divider on the battery voltage?', a: ['12 V is too much for a 5 V pin', 'To charge it', 'To make it last longer'], ok: 0, why: 'The divider brings it into range for A0.' },
  ],
  'circuits:is-the-water-clean': [
    { q: 'What does a TDS probe measure?', a: ['How well the water conducts, from dissolved salts and minerals', 'Germs', 'The water\'s colour'], ok: 0, why: 'More dissolved stuff means better conduction.' },
    { q: 'Low TDS means the water is…', a: ['Low in dissolved salts, not necessarily safe', 'Certainly safe to drink', 'Full of germs'], ok: 0, why: 'TDS can\'t see germs at all.' },
    { q: 'TDS is given in…', a: ['Parts per million', 'Degrees', 'Volts'], ok: 0, why: 'The maker\'s curve turns the voltage into ppm.' },
  ],
  'circuits:keke-tracker': [
    { q: 'How often does the GPS module say where it is?', a: ['Once a second', 'Once an hour', 'Only when asked by text'], ok: 0, why: 'Latitude, longitude and speed, every second.' },
    { q: 'How does the board get the distance driven today?', a: ['It adds up the distance from each point to the next', 'It reads the odometer', 'It asks the driver'], ok: 0, why: 'Many small steps add up to the day\'s total.' },
    { q: 'Why send alerts as plain text messages over GSM?', a: ['No data plan is needed, just a phone signal', 'It is faster than the internet', 'GPS needs it'], ok: 0, why: 'A text gets through almost anywhere there is phone coverage.' },
  ],
  'circuits:lamp-battery-meter': [
    { q: 'Why can A0 read the lantern\'s lithium cell directly?', a: ['Its 3.0 to 4.2 V is under 5 V', 'Lithium is special', 'A0 can read any voltage'], ok: 0, why: 'No divider needed when the voltage is already in range.' },
    { q: 'A lithium cell spends most of its life at about…', a: ['3.7 V', '1.5 V', '9 V'], ok: 0, why: '4.2 V full, 3.7 V most of the time, 3.0 V empty.' },
    { q: 'What does the last bar do when charge is low?', a: ['Blinks', 'Turns blue', 'Beeps a tune'], ok: 0, why: 'A blinking bar catches the eye: time to charge.' },
  ],
  'circuits:line-following-robot': [
    { q: 'How does each eye tell white from black?', a: ['White bounces infrared light back; black tape swallows it', 'It reads colours like a camera', 'It feels the tape'], ok: 0, why: 'More reflected light means white floor.' },
    { q: 'The left eye sees black. What should the robot do?', a: ['Slow the left wheel so it turns back over the line', 'Speed up both wheels', 'Stop forever'], ok: 0, why: 'The line has drifted left, so steer left.' },
    { q: 'Steering by speeding up one wheel and slowing the other is called…', a: ['Differential drive', 'Cruise control', 'Four-wheel drive'], ok: 0, why: 'Most small robots steer this way.' },
  ],
  'circuits:load-shedding-scheduler': [
    { q: 'Why run the well pump only in the middle of the day?', a: ['That is when solar is charging the battery', 'Water is warmer then', 'The pump is quieter'], ok: 0, why: 'Big loads should run while energy is coming in.' },
    { q: 'Why can the fridge rest from 11 pm to 5 am?', a: ['With its door shut it stays cold for hours', 'Food doesn\'t spoil at night', 'The fridge needs sleep'], ok: 0, why: 'Insulation keeps the cold in while it rests.' },
    { q: 'What happens below 12 V?', a: ['The pump and fridge are shed so the lights last till morning', 'Everything turns on', 'The battery explodes'], ok: 0, why: 'Shedding big loads protects the essentials.' },
  ],
  'circuits:lora-village-radio': [
    { q: 'What is LoRa good at?', a: ['Carrying a few words for miles on very little power', 'Streaming video', 'Fast internet'], ok: 0, why: 'Slow but far, with no SIM card and no network.' },
    { q: 'How does the station find the river\'s depth?', a: ['Sensor height above the riverbed minus the gap to the water', 'A float on a rope', 'A camera'], ok: 0, why: 'The echo sensor hangs from the footbridge.' },
    { q: 'Why is an upstream warning so useful?', a: ['The town downstream may not see any rain before the flood arrives', 'Rivers flow uphill', 'It is cheaper than a siren'], ok: 0, why: 'It buys time to move to higher ground.' },
  ],
  'circuits:market-stall-fire-alarm': [
    { q: 'Why can\'t the flame sensor raise the alarm alone?', a: ['It also sees the sun\'s infrared', 'It is too slow', 'It only works in daylight'], ok: 0, why: 'On its own it would cry wolf every sunny afternoon.' },
    { q: 'When does the alarm go off?', a: ['When the flame sensor and the smoke sensor agree', 'Whenever it is dark', 'Every hour'], ok: 0, why: 'Two different sensors agreeing means a real fire.' },
    { q: 'Who gets the phone alert?', a: ['The seller at home', 'Every customer', 'Nobody'], ok: 0, why: 'Fires often start at night, when the stall is locked.' },
  ],
  'circuits:nepa-is-back': [
    { q: 'Why use a phone charger as the mains sensor?', a: ['It gives 5 V only when the mains is on, and keeps the board away from mains voltage', 'It charges the board', 'It is louder'], ok: 0, why: 'A safe, simple way to know when the power is on.' },
    { q: 'What does the 10 kΩ pull-down do?', a: ['Holds pin 2 LOW when the power is off', 'Makes the sign brighter', 'Slows the board'], ok: 0, why: 'Without it the pin would float and read nonsense.' },
    { q: 'Why wait before cheering?', a: ['Power often comes, goes and comes again', 'The tune is long', 'To save the speaker'], ok: 0, why: 'Only cheer once it has stayed on.' },
  ],
  'circuits:okada-helmet': [
    { q: 'Why put a brake light on the helmet?', a: ['It sits at a driver\'s eye level, where it is easy to see', 'Helmets need decoration', 'It replaces the bike\'s light'], ok: 0, why: 'A small brake light low on a bike is easy to miss.' },
    { q: 'How does the helmet know the bike is braking?', a: ['An accelerometer feels the pull forward', 'A wire to the brake lever', 'It hears the brakes'], ok: 0, why: 'Braking is felt, not wired.' },
    { q: 'Why does the sketch smooth the readings?', a: ['A pothole gives a sharp jolt that isn\'t braking', 'To save battery', 'To blink faster'], ok: 0, why: 'Each new reading only nudges the average.' },
  ],
  'circuits:pepper-soup-thermometer': [
    { q: 'What is a thermistor?', a: ['A resistor that changes with heat', 'A tiny heater', 'A light sensor'], ok: 0, why: '10 kΩ at 77 °F (25 °C), much less when hot.' },
    { q: 'How does A0 read the thermistor?', a: ['It sits in a divider, so its changing ohms become a changing voltage', 'Directly as ohms', 'Over Wi-Fi'], ok: 0, why: 'A short formula turns the reading into degrees.' },
    { q: 'A pot of chili is simmering at about…', a: ['185 to 205 °F (85 to 95 °C)', '120 °F (49 °C)', '300 °F (150 °C)'], ok: 0, why: 'Just below boiling.' },
  ],
  'circuits:phone-drop-detector': [
    { q: 'What is inside a tilt switch?', a: ['Metal balls that close the contacts when upright', 'A spring and a magnet', 'A tiny camera'], ok: 0, why: 'Tip or shake it and the balls roll away, opening the contacts.' },
    { q: 'What does the board watch?', a: ['The tilt switch\'s DO pin', 'The phone\'s screen', 'The table\'s weight'], ok: 0, why: 'A change on that pin means the phone moved.' },
    { q: 'What two things can set off the alarm?', a: ['Being knocked off or picked up by the wrong hand', 'Rain or wind', 'Low battery'], ok: 0, why: 'Either one tips or shakes the switch.' },
  ],
  'circuits:poultry-feeder-timer': [
    { q: 'How does the feeder give a measured portion?', a: ['A servo opens the hopper flap for three seconds', 'A scale weighs each grain', 'The hens press a button'], ok: 0, why: 'The same time open gives about the same amount.' },
    { q: 'What keeps the drinker topped up?', a: ['A float switch opens a valve when the water drops', 'A timer every hour', 'Rain'], ok: 0, why: 'Water all the time: a thirsty hen can stop laying for days.' },
    { q: 'What tells the board when to feed?', a: ['A clock module', 'The rooster', 'A light sensor'], ok: 0, why: 'At 6, 12 and 5 o\'clock every day.' },
  ],
  'circuits:prepaid-energy-meter': [
    { q: 'A 1,000-watt iron left on for an hour uses…', a: ['One kilowatt-hour', 'One watt', '1,000 kilowatt-hours'], ok: 0, why: 'Kilowatts × hours = kilowatt-hours.' },
    { q: 'Why use a PZEM-004T module?', a: ['It does the dangerous mains measuring; the ESP32 only talks to it over serial', 'It is a battery', 'It prints receipts'], ok: 0, why: 'The board stays safely apart from the mains.' },
    { q: 'What happens when the credit runs out?', a: ['The relay opens and the power goes off', 'It keeps going for free', 'It doubles the price'], ok: 0, why: 'Prepaid means you use what you paid for.' },
  ],
  'circuits:pump-stops-when-full': [
    { q: 'What does a float switch do?', a: ['Closes a little switch when the water lifts it', 'Measures the water temperature', 'Pumps water'], ok: 0, why: 'It is the simplest water-level sensor there is.' },
    { q: 'Why start low and stop high, with a gap between?', a: ['It keeps the pump from clicking on and off every minute', 'It uses more water', 'Floats need exercise'], ok: 0, why: 'One level would make the pump chatter.' },
    { q: 'What happens if the pump runs too long with no water arriving?', a: ['The guard stops it: the well may be dry', 'It speeds up', 'Nothing'], ok: 0, why: 'A pump running dry burns out.' },
  ],
  'circuits:pure-water-vending': [
    { q: 'How does an RFID card answer the reader with no battery?', a: ['The reader\'s radio field powers its chip, and it sends back its ID', 'It has a hidden battery', 'It uses Wi-Fi'], ok: 0, why: 'A tiny coil in the card picks up energy from the reader.' },
    { q: 'Where is each card\'s credit kept?', a: ['In the ESP32\'s memory, by card ID', 'On the card', 'In the bottle'], ok: 0, why: 'The card only carries its number.' },
    { q: 'What happens when stock runs low?', a: ['The cafeteria\'s phone gets a message to refill it', 'The machine closes for good', 'Prices go up'], ok: 0, why: 'Someone comes before it runs out.' },
  ],
  'circuits:rainwater-tank-switcher': [
    { q: 'Why drink the rainwater first?', a: ['It is free; well water costs electricity or fuel to pump', 'It tastes sweeter', 'The well is broken'], ok: 0, why: 'Use the free water, keep the paid water as backup.' },
    { q: 'Why switch back only past a second, higher float?', a: ['So one shower doesn\'t make the valves click back and forth all day', 'To save the valves\' paint', 'The low float is broken'], ok: 0, why: 'A gap between switch points stops chattering.' },
    { q: 'How many valves are open at once?', a: ['Only one', 'Both', 'None'], ok: 0, why: 'Two valves feed one pipe to the taps.' },
  ],
  'circuits:robot-arm': [
    { q: 'What does each position of the arm boil down to?', a: ['A list of four servo angles', 'One speed', 'A photo'], ok: 0, why: 'Base, shoulder, elbow and gripper.' },
    { q: 'Why not write all four new angles at once?', a: ['Each servo races at full speed and the arm flings the bar away', 'Servos can\'t move together', 'It wastes code'], ok: 0, why: 'Moving in small steps keeps it smooth.' },
    { q: 'What job does the arm do here?', a: ['Packs soap bars from the end of the line', 'Paints cars', 'Sorts mail'], ok: 0, why: 'Pick and place: a classic job for a factory robot.' },
  ],
  'circuits:scale-with-receipt': [
    { q: 'How does a thermal printer print with no ink?', a: ['It heats special paper that darkens where it is warmed', 'It burns holes', 'It uses invisible ink'], ok: 0, why: 'Store receipts are printed this way.' },
    { q: 'What gives the weight?', a: ['A load cell and its HX711 amplifier', 'A spring and a ruler', 'The customer'], ok: 0, why: 'The load cell bends a hair under weight; the HX711 reads the tiny change.' },
    { q: 'What three things make a weighing shop fair?', a: ['An honest weight, the right price and a record', 'Speed, noise and colour', 'A big screen only'], ok: 0, why: 'The receipt is the record the customer keeps.' },
  ],
  'circuits:school-water-dispenser': [
    { q: 'Why count flow pulses instead of opening the valve for a fixed time?', a: ['The flow slows as the tank empties, so timed cups get smaller', 'Timers are expensive', 'Pulses are louder'], ok: 0, why: 'Counting gives the same 250 ml (about a cup) every time.' },
    { q: 'What does the float switch in the tank do?', a: ['Stops the dispenser pouring air when the tank is empty', 'Measures temperature', 'Counts students'], ok: 0, why: 'No water, no pour.' },
    { q: 'What does the screen count?', a: ['How many cups were poured today', 'The time', 'Who drank'], ok: 0, why: 'Useful for knowing how much water the school uses.' },
  ],
  'circuits:smart-farm': [
    { q: 'When does the farm water the rows?', a: ['When the soil drops below 30 %, unless it is raining', 'Every hour', 'Only at night'], ok: 0, why: 'Sensors decide, so no water is wasted.' },
    { q: 'Why keep the time of each rain-gauge tip?', a: ['To know how much fell in the last few minutes', 'To print it', 'For fun'], ok: 0, why: 'Recent rain means no need to water.' },
    { q: 'How does the farmer hear from the farm?', a: ['By text message over GSM', 'By letter', 'By shouting'], ok: 0, why: 'Anywhere with a phone signal.' },
  ],
  'circuits:solar-charge-tracker': [
    { q: 'Why don\'t volts alone tell you what a panel is giving?', a: ['A panel shows nearly full voltage even on a dull day', 'Volts are always zero', 'Panels make AC'], ok: 0, why: 'The current is what follows the sun.' },
    { q: 'Volts × amps gives…', a: ['Watts, the power right now', 'Ohms', 'Hours'], ok: 0, why: 'Add the watts up through the day for watt-hours.' },
    { q: 'Watt-hours tell you…', a: ['How much energy went into the battery', 'The panel\'s size', 'The weather tomorrow'], ok: 0, why: 'Power over time is energy.' },
  ],
  'circuits:solar-dryer-monitor': [
    { q: 'How does a solar dryer dry food?', a: ['The sun heats the air inside, and the hot air carries the water out', 'It freezes it', 'It blows cold air'], ok: 0, why: 'A black box under a clear lid gets to 120 to 140 °F (50 to 60 °C).' },
    { q: 'What does the vent fan do?', a: ['Takes the damp air away so fresh air can pick up more water', 'Cools the food', 'Turns the food over'], ok: 0, why: 'Air full of water can\'t take any more.' },
    { q: 'Low humidity inside on a hot afternoon means…', a: ['The food has little water left to give: nearly dry', 'The dryer is broken', 'It is about to rain'], ok: 0, why: 'While the food is still wet, the air inside stays damp.' },
  ],
  'circuits:solar-home-kit': [
    { q: 'Why divide the panel\'s voltage by 11?', a: ['So 21 V reaches the ESP32 as less than 2 V', 'To charge faster', 'To make it AC'], ok: 0, why: 'ESP32 pins must never see more than 3.3 V.' },
    { q: 'When does the charge relay join panel and battery?', a: ['When the panel is well above the battery and the battery isn\'t full', 'Always', 'Only at night'], ok: 0, why: 'At night it lets go so the battery doesn\'t drain back.' },
    { q: 'What is the board acting as here?', a: ['A charge controller', 'A radio', 'A clock'], ok: 0, why: 'It decides when to charge and when to cut the loads.' },
  ],
  'circuits:stepper-camera-slider': [
    { q: 'Why is a stepper motor good for a camera slider?', a: ['It moves in exact steps and stays put between them', 'It is the fastest motor', 'It needs no power'], ok: 0, why: '2048 steps make one turn of this motor.' },
    { q: 'How does the board move the camera a set distance?', a: ['By counting steps: each turn moves the belt a fixed distance', 'By timing it with a stopwatch', 'By watching the camera'], ok: 0, why: 'One turn is 3.2 cm (about 1.25 inches) of travel.' },
    { q: 'Why does it first creep back until it presses a switch?', a: ['A stepper can\'t tell where it is when it starts', 'To test the switch', 'To warm up'], ok: 0, why: 'This "homing" gives it a known starting point.' },
  ],
  'circuits:sweep-a-servo': [
    { q: 'What sets a servo\'s angle?', a: ['The length of a pulse sent 50 times a second', 'The voltage', 'How long you wait'], ok: 0, why: '1 millisecond for 0°, 2 for 180°.' },
    { q: 'What does the Servo library do for you?', a: ['The pulse timing: you just write the angle', 'Builds the servo', 'Charges it'], ok: 0, why: 'myServo.write(90) is all you need.' },
    { q: 'How does a knob aim the servo by hand?', a: ['map() turns 0–1023 into 0–180', 'The knob is wired to the motor', 'It sends a text'], ok: 0, why: 'Read the knob, map it, write the angle.' },
  ],
  'circuits:tank-level-gauge': [
    { q: 'How does the ultrasonic probe tell how full the tank is?', a: ['It times the echo off the water: fuller means a shorter trip', 'It weighs the tank', 'It floats'], ok: 0, why: 'Sound travels down, bounces off the water, and comes back.' },
    { q: 'What two gaps do you measure to calibrate it?', a: ['Full and empty', 'Morning and night', 'Top and side'], ok: 0, why: 'map() turns any gap in between into a percentage.' },
    { q: 'Why does a gauge help?', a: ['The taps no longer run dry without warning', 'It fills the tank', 'It cleans the water'], ok: 0, why: 'You see the level before it\'s too late.' },
  ],
  'circuits:tomato-cold-box': [
    { q: 'Why does evaporating water cool the box?', a: ['Water takes heat with it when it evaporates', 'Water is always cold', 'The fan is cold'], ok: 0, why: 'The same reason you feel cold coming out of a bath.' },
    { q: 'Where does this work best?', a: ['In dry air, like Arizona or Nevada', 'In damp air, like Florida', 'Underwater'], ok: 0, why: 'In damp air the water can\'t evaporate much.' },
    { q: 'What do people call this kind of cooler in the Southwest?', a: ['A swamp cooler', 'A freezer', 'A heat pump'], ok: 0, why: 'An evaporative cooler: a wet pad and a fan.' },
  ],
  'circuits:tomato-market-scale': [
    { q: 'What is a load cell?', a: ['A metal bar that bends a hair under weight, with strain gauges on it', 'A battery', 'A spring and a pointer'], ok: 0, why: 'The gauges change resistance by a tiny amount as it bends.' },
    { q: 'What does the HX711 do?', a: ['Amplifies the tiny change and hands the board a number', 'Prints receipts', 'Weighs by itself'], ok: 0, why: 'The signal is far too small for A0 on its own.' },
    { q: 'How does the number become pounds or kilograms?', a: ['A calibration with a known weight', 'It is already in pounds', 'The customer tells it'], ok: 0, why: 'Weigh something you know, and the sketch learns the scale factor.' },
  ],
  'circuits:ugu-soil-moisture': [
    { q: 'How does the probe sense moisture?', a: ['Wet soil conducts better between its two prongs', 'It weighs the soil', 'It sees the colour'], ok: 0, why: 'More water, more current.' },
    { q: 'With this probe, wetter soil makes the A0 reading…', a: ['Fall', 'Rise', 'Stay the same'], ok: 0, why: 'That is how this module is wired: wet soil pulls the reading down.' },
    { q: 'What does the red light mean?', a: ['Water me', 'Too much water', 'All is well'], ok: 0, why: 'Green says all is well.' },
  ],
  'circuits:village-mini-grid': [
    { q: 'Why does the board shed lines as the battery falls?', a: ['There is only so much energy, so it decides who gets it', 'To save the relays', 'Lines get tired'], ok: 0, why: 'The clinic keeps power longest.' },
    { q: 'Why does each line come back at a higher level than it was cut?', a: ['So it doesn\'t flicker on and off', 'To waste energy', 'Relays like it'], ok: 0, why: 'A gap between cut and return stops chattering.' },
    { q: 'Why do remote Alaskan villages run their own grids?', a: ['They are too far from any power line to join one', 'They like being different', 'Grids don\'t work in cold'], ok: 0, why: 'Panels, batteries and an inverter make a small grid of their own.' },
  ],
  'circuits:water-vendor-flow-meter': [
    { q: 'How does the flow sensor measure water?', a: ['Water spins a paddle wheel that sends a pulse every turn', 'It weighs the water', 'It listens to the pipe'], ok: 0, why: 'About 450 pulses for every litre.' },
    { q: 'Why count the pulses with an interrupt?', a: ['They come too fast for loop() to watch', 'To save money', 'Interrupts are prettier'], ok: 0, why: 'An interrupt runs the instant each pulse arrives.' },
    { q: 'How does the board work out the price?', a: ['Litres from the pulses, times the price per litre', 'It guesses from the jug size', 'The customer types it'], ok: 0, why: 'Exact water, exact price.' },
  ],
  'circuits:your-own-invention': [
    { q: 'What does the starter sketch do?', a: ['Shows every part on the bench working', 'Nothing', 'Deletes your code'], ok: 0, why: 'Then you start from the blank sketch and build your own idea.' },
    { q: 'What is the best first step for your own invention?', a: ['Get one part working, then add the next', 'Wire everything at once and hope', 'Skip testing'], ok: 0, why: 'Small steps make problems easy to find.' },
    { q: 'Which tool shows what your sketch is thinking?', a: ['The serial monitor', 'The breadboard', 'The USB plug'], ok: 0, why: 'Print values to see what the board really reads.' },
  ],
};
