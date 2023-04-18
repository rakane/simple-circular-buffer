# simple-circular-buffer

A simple circular buffer implementation in Typescript. More information about a circular buffer can be found [here](https://en.wikipedia.org/wiki/Circular_buffer).

## Installation

```bash
npm install simple-circular-buffer
```

## Usage

```typescript
import { CircularBuffer } from 'simple-circular-buffer';

const buffer = new CircularBuffer<number>(3);

buffer.push(1);
const item = buffer.get(); // 1

buffer.push(2);
```

## API

### `CircularBuffer<T>(size: number, allowOverwrite: boolean = false)`:

Creates a new circular buffer with the given size. Can optionally allow overwriting the oldest item when the buffer is full.

### `push(item: T): boolean`:

Pushes an item into the buffer. Returns `true` if the item was successfully pushed, `false` if the buffer is full and `allowOverwrite` is `false`.

### `get(): T | null`:

Returns the oldest item in the buffer, or `null` if the buffer is empty.

### `clear(): void`:

Clears the buffer.

### `isEmpty(): boolean`:

Returns `true` if the buffer is empty, `false` otherwise.

### `isFull(): boolean`:

Returns `true` if the buffer is full, `false` otherwise.

### `capacity(): number`:

Returns the maximum number of items the buffer can hold.

### `size(): number`:

Returns the current number of items in the buffer.

## License

MIT

## Author

[Ryan Kane](www.ryankane.io)
