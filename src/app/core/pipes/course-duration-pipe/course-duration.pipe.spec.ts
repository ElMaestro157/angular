import { CourseDurationPipe } from './course-duration.pipe';

describe('CourseDurationPipe', () => {
  let pipe: CourseDurationPipe;
  beforeEach(() => {
    pipe = new CourseDurationPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should compute correctly at non-negative numbers', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform(40)).toBe('40 min');
    expect(pipe.transform(60)).toBe('1 h');
    expect(pipe.transform(80)).toBe('1 h 20 min');
  });

  it('should compute correctly at negative numbers', () => {
    expect(pipe.transform(-10)).toBe('');
  });
});
