import { CircularBuffer } from '../src/index';

test('CircularBuffer - Overwrite not allowed', () => {
  const buffer = new CircularBuffer(5, false);
  expect(buffer.capacity).toBe(5);
  expect(buffer.size).toBe(0);
  expect(buffer.allowOverwrite).toBe(false);

  // Fill the buffer
  expect(buffer.put(1)).toBe(true);
  expect(buffer.put(2)).toBe(true);
  expect(buffer.put(3)).toBe(true);
  expect(buffer.put(4)).toBe(true);
  expect(buffer.put(5)).toBe(true);

  expect(buffer.size).toBe(5);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(0);

  // Read the buffer
  expect(buffer.get()).toBe(1);
  expect(buffer.get()).toBe(2);
  expect(buffer.get()).toBe(3);
  expect(buffer.get()).toBe(4);
  expect(buffer.get()).toBe(5);

  expect(buffer.size).toBe(0);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(0);

  // Fill the buffer again
  expect(buffer.put(6)).toBe(true);
  expect(buffer.put(7)).toBe(true);
  expect(buffer.put(8)).toBe(true);
  expect(buffer.put(9)).toBe(true);
  expect(buffer.put(10)).toBe(true);
  expect(buffer.put(11)).toBe(false);

  expect(buffer.size).toBe(5);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(0);

  // Read the buffer again (6 should be overwritten)
  expect(buffer.get()).toBe(6);
  expect(buffer.get()).toBe(7);
  expect(buffer.get()).toBe(8);
  expect(buffer.get()).toBe(9);
  expect(buffer.get()).toBe(10);

  expect(buffer.size).toBe(0);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(0);
});

test('CircularBuffer - Overwrite allowed', () => {
  const buffer = new CircularBuffer(5, true);
  expect(buffer.capacity).toBe(5);
  expect(buffer.size).toBe(0);
  expect(buffer.allowOverwrite).toBe(true);

  // Fill the buffer
  expect(buffer.put(1)).toBe(true);
  expect(buffer.put(2)).toBe(true);
  expect(buffer.put(3)).toBe(true);
  expect(buffer.put(4)).toBe(true);
  expect(buffer.put(5)).toBe(true);

  expect(buffer.size).toBe(5);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(0);

  // Read the buffer
  expect(buffer.get()).toBe(1);
  expect(buffer.get()).toBe(2);
  expect(buffer.get()).toBe(3);
  expect(buffer.get()).toBe(4);
  expect(buffer.get()).toBe(5);

  expect(buffer.size).toBe(0);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(0);

  // Fill the buffer again
  expect(buffer.put(6)).toBe(true);
  expect(buffer.put(7)).toBe(true);
  expect(buffer.put(8)).toBe(true);
  expect(buffer.put(9)).toBe(true);
  expect(buffer.put(10)).toBe(true);
  expect(buffer.put(11)).toBe(true);

  expect(buffer.size).toBe(5);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(1);

  // Read the buffer again (6 should be overwritten)
  expect(buffer.get()).toBe(11);
  expect(buffer.get()).toBe(7);
  expect(buffer.get()).toBe(8);
  expect(buffer.get()).toBe(9);
  expect(buffer.get()).toBe(10);

  expect(buffer.size).toBe(0);
  expect(buffer._readIndex).toBe(0);
  expect(buffer._writeIndex).toBe(1);
});
