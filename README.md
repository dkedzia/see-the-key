# See the Key

On-screen keyboard with text-to-speech for people with motor disabilities who control the computer via eye-tracking and clicking software.

## For whom

The application is designed for AAC (Augmentative and Alternative Communication) users who cannot use their hands but can control the mouse cursor (e.g. via eye-tracking) and perform clicks using dedicated software.

## Requirements

- **Windows 11** (target platform)
- Cursor control (e.g. eye-tracking with clicking software)
- Works **offline** – no internet required

## Usage

1. **Typing**: Click letters on the on-screen keyboard. The entered text appears in the line above the keyboard.

2. **Read**: Accepts the line, adds it to history and plays it using the system speech synthesizer.

3. **Accept**: Accepts the line and moves it to history (without playback).

4. **Clear**: When the line has content – clears it. When empty – highlights the newest history item; the next click removes it from history.

5. **Restore**: Inserts the next history item into the edit field.

Each history item has buttons: Read, Restore, Delete.

## Languages

The application is available in Polish and English. Polish diacritic characters (ą, ł, ó, ż, ź, ć, ń, ę) are available in Polish mode – each letter is split into an upper part (base) and lower part (diacritic).

## Building from source

### Development prerequisites

- Node.js (LTS)
- Rust (rustup)
- System dependencies (Linux): `libwebkit2gtk-4.1-dev`, `build-essential`, `libssl-dev`, etc.
- For TTS on Linux: `sudo apt install speech-dispatcher libspeechd-dev`

### Commands

```bash
npm install
npm run tauri:dev    # Dev mode
npm run tauri:build # Build
```

### Cross-compiling for Windows from Linux

```bash
rustup target add x86_64-pc-windows-gnu
sudo apt install gcc-mingw-w64-x86-64
npm run tauri build -- --target x86_64-pc-windows-gnu
```

The `.exe` file is located at:
`src-tauri/target/x86_64-pc-windows-gnu/release/app.exe`

## License

MIT
