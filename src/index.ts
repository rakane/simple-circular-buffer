export class CircularBuffer<T> {
  // The maximum number of items the buffer can hold
  _capacity: number;

  // The current number of items in the buffer
  _size: number;

  // The buffer
  _buffer: (T | null)[];

  // The index of the next item to be read
  _readIndex: number;

  // The index of the next item to be written
  _writeIndex: number;

  // Allow overwriting of items in the buffer
  _allowOverwrite: boolean;

  constructor(size: number, allowOverwrite: boolean = false) {
    // Initialize sizes and buffer
    this._capacity = size;
    this._size = 0;
    this._buffer = new Array<T | null>(size);

    for (let i = 0; i < size; i++) {
      this._buffer[i] = null;
    }

    // Set the read and write indices
    this._readIndex = 0;
    this._writeIndex = 0;

    // Set the overwrite flag
    this._allowOverwrite = allowOverwrite;
  }

  put(item: T): boolean {
    const canWrite = this._allowOverwrite || this._size < this._capacity;

    if (canWrite) {
      this._buffer[this._writeIndex++] = item;
      this._writeIndex = this._writeIndex % this._capacity;

      // Increase the size if we're not overwriting
      if (this._size < this._capacity) {
        this._size++;
      }
    }

    return canWrite;
  }

  get(): T | null {
    if (this._size === 0) return null;

    const item = this._buffer[this._readIndex++];

    this._readIndex = this._readIndex % this._capacity;
    this._size--;

    return item;
  }

  clear() {
    this._size = 0;
    this._readIndex = 0;
    this._writeIndex = 0;
  }

  isEmpty() {
    return this._size === 0;
  }

  isFull() {
    return this._size === this._capacity;
  }

  get capacity() {
    return this._capacity;
  }

  get size() {
    return this._size;
  }

  get allowOverwrite() {
    return this._allowOverwrite;
  }
}
