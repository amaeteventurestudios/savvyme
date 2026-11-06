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
};
