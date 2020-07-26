---
title: 'Async/Await for AVR with Rust'
description:
    "With the recent ability for Rust to target AVR, it's time for me to bring my favorite feature
    of Rust to Arduino: async/await. Asynchronous code allows for doing (seemingly) multiple things
    at once, without the memory or CPU overhead of threads."
date: 2020-07-25
updated: 2020-07-26
---

With the recent ability for Rust to compile for AVR microcontrollers, I thought that it's time for
me to bring my favorite feature of Rust to Arduino: async/await.

> **TL;DR:** final code is at https://github.com/lights0123/async-avr. [Here's an example of a
> simple task that does two things at once][example-serial].

# Introduction

The [age-old][millis1] [question][millis2] [when][millis3] [learning][millis4] [Arduino][millis5]:
_"[How can I do][millis6] [multiple things at once][millis7]"_? When programming for full operating
systems, like any desktop, mobile, or higher-end embedded platforms, the answer is easy—threads.
They're built into the OS, and you typically _have_ to use them to take advantage of features like
multiple CPU cores. Or, when programming for an embedded target, you may reach for a lightweight
RTOS like [FreeRTOS], which gives you full threads without much work.

But what if you have a 16MHz microcontroller with 2 KB of RAM?

The Arduino Uno is known for being ubiquitous, cheap, and easy to program. Although there are more
and more reasons to use competing products, such as the various ARM Cortex-M and Espressif boards
(which I use almost exclusively), the Microchip (formerly Atmel) ATMega series is sometimes still
preferred for low power applications, cutting cents off a BOM, and its widespread support.

Typically, one checks in a loop repeatedly to see if the task is ready to activate. This can be
checking if there's data in a serial buffer, if a certain time period has passed, or a GPIO pin has
toggled. However, I'm going to present an alternative to doing this—`async`/`await`.

[millis1]: https://www.arduino.cc/en/Tutorial/BlinkWithoutDelay
[millis2]:
	https://arduino.stackexchange.com/questions/49300/blink-without-delay-for-5-times-every-20-seconds
[millis3]:
	https://arduino.stackexchange.com/questions/44497/how-to-flash-blink-i2c-lcd-backlight-without-delay-function
[millis4]:
	https://arduino.stackexchange.com/questions/35436/arduino-blink-two-leds-without-delayamount-of-repetitions
[millis5]: https://arduino.stackexchange.com/questions/37032/how-to-blink-2-led-strips-without-delay
[millis6]: https://arduino.stackexchange.com/questions/73164/blink-not-working
[millis7]:
	https://arduino.stackexchange.com/questions/49950/how-to-replace-the-delay-function-in-my-code
[freertos]: https://freertos.org/

# What even is `async`/`await`, anyways?

Many modern languages are implementing `async`/`await`. C# was one of the first big languages to do
it, and then Python, JavaScript, Dart, Kotlin quickly followed. The big difference between threads
and `async` functions is that `async`hronous code is handled by the program itself, usually
cooperatively, while synchronous operations on threads rely on the OS to do it. The first obvious
reason for it, then, is when threads aren't available—just like what we're about to get into soon.
However, asynchronous code is typically faster than synchronous code because it is able to avoid the
overhead of spawning threads and context switches, as well as the memory overhead, as the amount of
space needed on the stack can be calculated ahead of time.

Internally, the compiler turns the code into a state machine, typically using the language's
generators feature if it has one. Here, every time you write `.await` and the data is not available
immediately, the compiler inserts a `return` statement, and adds a parameter that allows you to jump
right back to where it was. Rust uses `Pin`ning, where it is guaranteed that the generated struct
that holds the stack will always be in the same place in memory at all times. This avoids a problem
where a pointer is taken to a local variable, the function returns and comes back, and is suddenly
pointing to something completely different.

# Prior work

C++20 has similar features to Rust's `async`/`await` with the `co_await` keyword, although the
[available documentation][co-awaiting-coroutines] is [not quite as good as Rust's][async-book].
However, there's a total of... [1 search result][co_await_arduino] on the Arduino forums, _and_ it's
in German with no code. And even if there _was_ code, it would be largely unaccessable as Arduino
ships with an old compiler:

```bash
❱ ~/.arduino15/packages/arduino/tools/avr-gcc/*/bin/avr-gcc --version
avr-gcc (GCC) 7.3.0
Copyright (C) 2017 Free Software Foundation, Inc.
```

GCC 7.3.0 ships with ["almost full support"][cpp-17] for C++17 (although not by default), but a
total of 0 C++20 additions. And if you're on PlatformIO, you'll have even less luck:

```bash
❱ ~/.platformio/packages/toolchain-atmelavr/bin/avr-gcc --version
avr-gcc (AVR_8_bit_GNU_Toolchain_3.6.2_1759) 5.4.0
Copyright (C) 2015 Free Software Foundation, Inc.
```

However, Rust has been able to compile `async`/`await` code for [almost a year now on the _stable
compiler build_][async-await-stable]. There's been steadily increasing interest in using these
features on embedded platforms with Rust, and many projects have been using it as a result.

[co-awaiting-coroutines]: https://blog.panicsoftware.com/co_awaiting-coroutines/
[async-book]: https://rust-lang.github.io/async-book/02_execution/04_executor.html
[co_await_arduino]: https://www.arduino.cc/search?q=%22co_await%22&tab=forum
[cpp-17]: https://gcc.gnu.org/projects/cxx-status.html#cxx17
[async-await-stable]: https://blog.rust-lang.org/2019/11/07/Async-await-stable.html

## Pseudo-`async`/`await`

These libraries actually implement a _very_ similar thing to `async`/`await` with a state machine,
and jumping to different positions in code based on where it's already been. For example,
[AceRoutine] has a macro, `COROUTINE`, that internally converts the function into a state machine
that jumps to different places using `goto`. This is actually almost identical to how tools like
Babel in the JavaScript world convert `async` functions to traditional functions that can be used
with old browsers.

However, there are a few very critical problems:

-   **Local variables are not preserved across yields**.
-   You can't use certain statements in some libraries (not AceRoutine), such as `switch`.
-   Destructors don't run properly, and will **`free` uninitialized memory** if not done correctly
    (due to the first point).
-   Tasks can't return values.

These limitations are because simple preprocessor macros, which is the only option in C/C++, are
only "glorified copy-paste", and have no real computing power. Although `async` is built into the
Rust compiler, it wasn't before, and a (less-than-ideal, but still usable) macro could implement
most of the feature itself. Hopefully, new C++20 features will lead to more use in the embedded
world.

[aceroutine]: https://github.com/bxparks/AceRoutine

# Putting it together

## Getting started

It looks like there's a few packages (known as "crates" in the Rust world) to interface with the
hardware:

-   [ruduino], which only supports the Arduino Uno
-   [avr-device], which provides low-level hardware control
-   [avr-hal], which provides higher-level board and MCU support, and depends on avr-device

Although [ruduino] is by the avr-rust team that worked on getting Rust working on AVR, I ultimately
decided to go with [avr-hal]:

-   It supports many more boards, and has a structure that allows it to expand further
-   It supports [embedded-hal], which allows us to share code between boards: for example, the
    [`apa102_spi`] crate will let us control APA102 LED strips on an Arduino Uno and a Raspberry Pi
    running Linux, using the exact same code!
    -   embedded-hal also has a bigger focus on nonblocking operations, which is exactly what we're
        looking for
-   It has a cleaner and safer API

To set that up:

**(Update 2020-07-26)**: this is much simpler now with the latest nightly. All that is required:

```bash
rustup install nightly
rustup +nightly component add rust-src
```

[ruduino]: https://github.com/avr-rust/ruduino
[avr-hal]: https://github.com/Rahix/avr-hal
[avr-device]: https://github.com/Rahix/avr-device
[embedded-hal]: https://docs.rs/embedded-hal/0.2.*/embedded_hal/
[`apa102_spi`]: https://docs.rs/apa102-spi

## Compiling and Running

We can compile by running

```bash
cargo +nightly build -Z build-std=core --release --target avr-atmega328p.json
# or, in my repository which has some helpers configured
cargo +nightly build --release
```

Then, to upload it to a device, assuming that you have `avrdude` installed, run:

```bash
avrdude -v -patmega328p -carduino -P/dev/ttyACM0 -b115200 -D -Uflash:w:target/avr-atmega328p/release/examples/serial.elf:e
```

Change the upload path (`target/avr-atmega328p/release/examples/serial.elf`) to meet what you want
to upload.

## If you only have the Arduino IDE installed

Enable "Show verbose output during: upload" in the Arduino IDE. Observe the build logs for an
`avrdude` command—it should look something like:

```bash
/path/to/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/bin/avrdude -C/path/to/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/etc/avrdude.conf -v -patmega328p -carduino -P/dev/ttyACM0 -b115200 -D -Uflash:w:/tmp/arduino_build_721874/Blink.ino.hex:i
```

Copy that command, but delete everything after `-Uflash:w:`. Then, without spaces, add the path to
your binary. This will typically be `target/avr-atmega328p/release/project_name.elf`, or
`target/avr-atmega328p/release/examples/example_name.elf`. Finally, add `:e`. Your final command
will probably look something like:

```bash
/path/to/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/bin/avrdude -C/path/to/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/etc/avrdude.conf -v -patmega328p -carduino -P/dev/ttyACM0 -b115200 -D -Uflash:w:target/avr-atmega328p/release/project_name.elf:e
```

> ### What about converting to hex first?
>
> Arduino typically converts the compiled binary to raw hex, and many AVR-Rust projects have
> [followed that pattern][avr-objcopy]. However, there's generally no need to do that, as `avrdude`
> has the ability to upload ELF binaries directly.

[avr-objcopy]: https://github.com/Rahix/avr-hal/blob/bfc5dfe67107a68b4a673e54532354af126cb3ba/mkhex.sh#L32

## Onto `async` operations

As I mentioned earlier, [embedded-hal] is implemented in such a way that asynchronous operations is
quite easy. When you attempt to read or write a value, you can get three results:

-   `WouldBlock`: I can't complete this operation right now.
-   `Ok`: The operation succeeded. If reading something, this gives you the read value.
-   `Err`: An error occurred while performing this operation.

This maps very nicely to Rust's `Future` trait, which is used to implement asynchronous code. For
example, reading from a serial port is implemented like this:

```rust
fn poll_read(
    mut self: Pin<&mut Self>,
    cx: &mut Context<'_>,
    buf: &mut [u8],
) -> Poll<Result<usize, T::Error>> {
    if let Some(ptr) = buf.first_mut() {
        match self.0.read() {
            Ok(byte) => {
                *ptr = byte;
                Poll::Ready(Ok(1))
            }
            Err(nb::Error::WouldBlock) => Poll::Pending,
            Err(nb::Error::Other(err)) => Poll::Ready(Err(err)),
        }
    } else {
        Poll::Ready(Ok(0))
    }
}
```

Although there's a bit of weirdness in terms of checking if the buffer is big enough, for the most
part, this works pretty well.

> ### Why do I always return 1 byte read?
>
> I'm mostly mirroring the `AsyncRead` and `AsyncWrite` in the `futures` crate, which typically is
> used on machines with full operating systems. Typically, the overhead of a syscall is somewhat
> high, so you might request e.g. 1024 bytes at a time. Obviously, that isn't the case for an 8-bit
> MCU. However, I'm keeping that pattern for ease of porting and to allow for networking, e.g. the
> Arduino Ethernet shield.

Then, I copied and pasted the `AsyncReadExt` and `AsyncWriteExt` traits from the `futures` crate as
well. The way this is set up is that you just implement the low-level functions, and the `Ext`
traits take care of the more user-friendly functions. This is done instead of default
implementations to allow the main trait to be small in case it is added to the standard library,
much like how `Future` is in `std`/`core`, but many functions require the extension trait
`FutureExt` from the `futures` crate. The functions that `AsyncReadExt` and the like provide allow
for tasks like reading and writing a fixed number of bytes, and `await`ing until that is complete.

## Writing an executor

Thankfully, there's a few places we can get code from—the Rust embedded team has been working on a
[generic executor][async-embedded-executor], and [I have my own executor][ndless-async] that I've
used for third-party code on TI calculators. I started off with a way to safely share state between
interrupts. Typically, this is done with atomic instructions, but AVR does not have those (or
necessarily have a need for it, as it is single-core). So, I used `volatile` operations:

```rust
#[derive(Debug)]
#[repr(transparent)]
struct Volatile<T: Copy>(UnsafeCell<T>);

impl<T: Copy> Volatile<T> {
    pub fn new(value: T) -> Volatile<T> {
        Volatile(UnsafeCell::new(value))
    }

    pub fn read(&self) -> T {
        unsafe { ptr::read_volatile(self.0.get()) }
    }

    pub fn write(&self, value: T) {
        unsafe { ptr::write_volatile(self.0.get(), value) };
    }
}
```

> ### Why not the `vcell` crate?
>
> The above code is functionally identical to the [`VolatileCell`] that [`vcell`] provides—in fact,
> I wrote the above code and realized that it is _almost identical_ to that crate. However, I will
> probably want more control in the future, as the above code is **unsound** if used with a type
> that is bigger than 1 byte. This is because AVR can write or read one byte in one instruction, so
> if an interrupt occurs, it is either written or not. In the future, I'd like to expand it to
> disable interrupts when writing more than 1 byte, so state can be safely shared between contexts.

[`vcell`]: https://docs.rs/vcell/
[`VolatileCell`]: https://docs.rs/vcell/0.1.*/vcell/struct.VolatileCell.html

### Creating a VTable

We need to tell Rust how it can wake up a task. So, doing some copy-pasting from
[async-on-embedded][async-embedded-executor]:

```rust
// NOTE `*const ()` is &Volatile<bool>
static VTABLE: RawWakerVTable = {
    unsafe fn clone(p: *const ()) -> RawWaker {
        RawWaker::new(p, &VTABLE)
    }
    unsafe fn wake(p: *const ()) {
        wake_by_ref(p)
    }
    unsafe fn wake_by_ref(p: *const ()) {
        (*(p as *const Volatile<bool>)).write(true)
    }
    unsafe fn drop(_: *const ()) {
        // no-op
    }

    RawWakerVTable::new(clone, wake, wake_by_ref, drop)
};
```

Here, I adapted the code to use my own synchronization code instead of `AtomicBool`, which we don't
have access to.

### The `block_on` function

Finally, it's time for the executor:

```rust
/// Spawns a task and blocks until the future resolves, returning its result.
pub fn block_on<T>(task: impl Future<Output = T>) -> T {
    let ready = Volatile::new(true);
    let waker = unsafe { Waker::from_raw(RawWaker::new(&ready as *const _ as *const _, &VTABLE)) };
    let mut context = Context::from_waker(&waker);
    pin_mut!(task);
    let mut task = task;
    loop {
        while ready.read() {
            match task.as_mut().poll(&mut context) {
                Poll::Ready(val) => {
                    return val;
                }
                Poll::Pending => {
                    ready.write(false);
                }
            }
        }
    }
}
```

This function will accept a `Future`, which is typically automatically generated when writing an
`async` block in Rust. Then, it will poll it. The task will either say that it's done right away, or
register itself to wake up (via the `waker`) when it's ready. Then, it gets polled again, continuing
the cycle.

However, [LLVM has a bug][function-pointers] that crashes the MCU when calling a function pointer.
Unfortunately, that's entirely how `Waker`s are implemented, so let's comment out the part where I
mark it as not ready:

```diff{numberLines: 15}
-    ready.write(false);
+ // ready.write(false);
```

This will just poll the task in a busy loop. This isn't great for power usage, but is easy to
implement.

[async-embedded-executor]:
	https://github.com/rust-embedded-community/async-on-embedded/blob/master/async-embedded/src/executor.rs
[ndless-async]: https://github.com/lights0123/ndless-rs/tree/master/ndless-async

# Writing asynchronous code!

## A simple demo

Now that we have the low-level stuff working, we can get on to writing asynchronous code! Let's
start with a [basic, single-task only example][example-single-task] just to make sure everything
works:

```rust
#[no_mangle]
pub extern "C" fn main() -> ! {
    let dp = arduino_uno::Peripherals::take().unwrap();

    let mut pins = arduino_uno::Pins::new(dp.PORTB, dp.PORTC, dp.PORTD);

    let mut serial = AsyncSerial::new(arduino_uno::Serial::new(
        dp.USART0,
        pins.d0,
        pins.d1.into_output(&mut pins.ddr),
        57600,
    ));


    block_on(async {
        loop {
            serial.write_all(b"Hello World!\n").await.unwrap();
        }
    });
    loop {}
}
```

Compile and upload it:

```bash
❱ cargo +nightly build --example single-task --release && avrdude -v -patmega328p -carduino -P/dev/ttyACM0 -b115200 -D -Uflash:w:target/avr-atmega328p/release/examples/single-task.elf:e
   Compiling async-avr v0.1.0 (/home/lights0123/IdeaProjects/async-avr)
    Finished release [optimized] target(s) in 0.28s

avrdude: Version 6.3-20190619
         Copyright (c) 2000-2005 Brian Dean, http://www.bdmicro.com/
         Copyright (c) 2007-2014 Joerg Wunsch

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.00s

avrdude: Device signature = 0x1e950f (probably m328p)
avrdude: safemode: lfuse reads as 0
avrdude: safemode: hfuse reads as 0
avrdude: safemode: efuse reads as 0
avrdude: reading input file "target/avr-atmega328p/release/examples/single-task.elf"
avrdude: writing flash (380 bytes):

Writing | ################################################## | 100% 0.06s

avrdude: 380 bytes of flash written
avrdude: verifying flash memory against target/avr-atmega328p/release/examples/single-task.elf:
avrdude: load data flash data from input file target/avr-atmega328p/release/examples/single-task.elf:
avrdude: input file target/avr-atmega328p/release/examples/single-task.elf contains 380 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 0.05s

avrdude: verifying ...
avrdude: 380 bytes of flash verified

avrdude: safemode: lfuse reads as 0
avrdude: safemode: hfuse reads as 0
avrdude: safemode: efuse reads as 0
avrdude: safemode: Fuses OK (E:00, H:00, L:00)

avrdude done.  Thank you.
```

And let's check the serial output:

```bash
❱ pio device monitor -b 57600
--- Available filters and text transformations: colorize, debug, default, direct, hexlify, log2file, nocontrol, printable, send_on_enter, time
--- More details at http://bit.ly/pio-monitor-filters
--- Miniterm on /dev/ttyACM0  57600,8,N,1 ---
--- Quit: Ctrl+C | Menu: Ctrl+T | Help: Ctrl+T followed by Ctrl+H ---
Hello World!
Hello World!
Hello World!
Hello World!
Hello World!
Hello World!
Hello World!
--- exit ---
```

## A bit more powerful

Great—that worked! Now, let's try doing multiple things. Let's do [both SPI communication and
reading UART data now][example-serial]. Starting out with getting our peripherals:

```rust
let dp = arduino_uno::Peripherals::take().unwrap();

let mut pins = arduino_uno::Pins::new(dp.PORTB, dp.PORTC, dp.PORTD);

let serial = arduino_uno::Serial::new(
    dp.USART0,
    pins.d0,
    pins.d1.into_output(&mut pins.ddr),
    57600,
);

pins.d10.into_output(&mut pins.ddr); // CS must be set to output mode.

// Create SPI interface.
let spi = Spi::new(
    dp.SPI,
    pins.d13.into_output(&mut pins.ddr),
    pins.d11.into_output(&mut pins.ddr),
    pins.d12.into_pull_up_input(&mut pins.ddr),
    Settings::default(),
);
```

Converting them to async versions:

```rust
let mut spi = AsyncSpi::new(spi);

let (rx, tx) = serial.split();
let mut rx = AsyncSerial::new(rx);
let tx = RefCell::new(AsyncSerial::new(tx));
```

Some basic locking:

```rust
let serial_lock = Cell::new(false);
```

> ### Why do we need to lock?
>
> Because we may have multiple tasks trying to write to the same serial port at the same time, we
> need to add synchronization so that doesn't happen. Ideally, I would use a `Mutex` that handles
> all this for us, but I haven't written one yet (or moreso copied-and-pasted from [one that already
> exists][unsync-mutex]).

Creating a serial loop:

```rust
let serial_loop = async {
    loop {
        let mut b = [0];
        rx.read_exact(&mut b).await.unwrap();
        loop {
            if !serial_lock.get() {
                serial_lock.set(true);
                tx.borrow_mut().write_all(b"hello!\n").await.unwrap();
                serial_lock.set(false);
                break;
            }
            Yield::default().await;
        }
    }
};
```

> Note: this will not actually _run_ the loop. That comes later.

Creating an SPI loop:

```rust
let spi_loop = async {
    loop {
        spi.write_all(b"a").await.unwrap();
        let mut data = [0; 1];
        spi.read_exact(&mut data).await.unwrap();
        loop {
            if !serial_lock.get() {
                serial_lock.set(true);
                let mut tx_ref = tx.borrow_mut();
                tx_ref.write_all(b"wrote ").await.unwrap();
                tx_ref.write_all(&data).await.unwrap();
                tx_ref.write_all(b"!\n").await.unwrap();
                serial_lock.set(false);
                break;
            }
            Yield::default().await;
        }
        Yield::default().await;
    }
};
```

> ### What's with all the yielding?
>
> As Rust implements _cooperative_ multitasking, we need to explicitly give control back to other
> tasks. Otherwise, we'd be in a loop waiting for the other task to be done writing, without ever
> giving it a chance to write!

Finally running it:

```rust
block_on(async { futures_util::join!(serial_loop, spi_loop) });
```

Compile and upload it:

```bash
❱ cargo +nightly build --example serial && avrdude -v -patmega328p -carduino -P/dev/ttyACM0 -b115200 -D -Uflash:w:target/avr-atmega328p/release/examples/serial.elf:e
   Compiling async-avr v0.1.0 (/home/lights0123/IdeaProjects/async-avr)
    Finished release [optimized] target(s) in 0.28s

avrdude: Version 6.3-20190619
         Copyright (c) 2000-2005 Brian Dean, http://www.bdmicro.com/
         Copyright (c) 2007-2014 Joerg Wunsch

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.00s

avrdude: Device signature = 0x1e950f (probably m328p)
avrdude: safemode: lfuse reads as 0
avrdude: safemode: hfuse reads as 0
avrdude: safemode: efuse reads as 0
avrdude: reading input file "target/avr-atmega328p/release/examples/serial.elf"
avrdude: writing flash (2562 bytes):

Writing | ################################################## | 100% 0.43s

avrdude: 2562 bytes of flash written
avrdude: verifying flash memory against target/avr-atmega328p/release/examples/serial.elf:
avrdude: load data flash data from input file target/avr-atmega328p/release/examples/serial.elf:
avrdude: input file target/avr-atmega328p/release/examples/serial.elf contains 2562 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 0.34s

avrdude: verifying ...
avrdude: 2562 bytes of flash verified

avrdude: safemode: lfuse reads as 0
avrdude: safemode: hfuse reads as 0
avrdude: safemode: efuse reads as 0
avrdude: safemode: Fuses OK (E:00, H:00, L:00)

avrdude done.  Thank you.
```

And let's check the serial output:

```bash
❱ pio device monitor -b 57600
--- Available filters and text transformations: colorize, debug, default, direct, hexlify, log2file, nocontrol, printable, send_on_enter, time
--- More details at http://bit.ly/pio-monitor-filters
--- Miniterm on /dev/ttyACM0  57600,8,N,1 ---
--- Quit: Ctrl+C | Menu: Ctrl+T | Help: Ctrl+T followed by Ctrl+H ---
wrote a!
wrote a!
wrote a!
wrote a!
hello!
wrote a!
wrote a!
wrote a!
--- exit ---
```

Here, I pressed a key on my keyboard to send a character, which resulted in the reply of "hello!".
This successfully demonstrates multiple tasks running at the same time.

[example-single-task]: https://github.com/lights0123/async-avr/blob/main/examples/single-task.rs
[example-serial]: https://github.com/lights0123/async-avr/blob/main/examples/serial.rs
[unsync-mutex]:
	https://github.com/rust-embedded-community/async-on-embedded/blob/master/async-embedded/src/unsync/mutex.rs

# To Do

Right now, this is far from being done and usable. I only have basic for two peripherals: UART and
SPI. More work is required for timers, but once that is done, using `async`/`await` on an Arduino
will be _very_ nice—scheduling a periodic task would be as easy as surrounding it in a `timeout`
function, and waiting for e.g. serial data would not block anything else. Additionally, getting
interrupts to work will allow the MCU to go to sleep while waiting for something to occur, saving
power.

Currently, effort on this is blocked on [an LLVM issue that prevents calling function
pointers][function-pointers]. Until that is fixed, busy-loop polling is the best we can do.

However, `async`/`await` could definitely change the way Arduino code is written. It doesn't have to
be in Rust (although I would definitely not complain :) ), but this style could allow for easier to
write _and_ more power efficient projects.

[function-pointers]: https://gitter.im/avr-rust/Lobby?at=5f1ca63fbc41f3681724bbba

# Final code

https://github.com/lights0123/async-avr

# Thanks to

These are a few resources that have been helpful.

https://github.com/Rahix/avr-hal  
https://github.com/avr-rust/ruduino/issues/9  
https://github.com/shepmaster/rust-arduino-blink-led-no-core-with-cargo  
https://github.com/nh2/quadcopter-simulation/blob/8a3652b8a704877156e91c0691ce8ce37588eb53/arduino-accel-rust/src/main.rs#L300-L327

*[RTOS]: Real-Time Operating System
*[BOM]: Bill of Materials
*[MCU]: Microcontroller
*[GPIO]: General-Purpose Input/Output
