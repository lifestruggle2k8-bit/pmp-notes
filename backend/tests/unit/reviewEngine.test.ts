import {
  calculateNextInterval,
  getNextReviewDate,
  isCardOverdue,
  daysUntilReview,
  getQualityFromRating
} from '../../src/services/reviewEngine';

describe('ReviewEngine', () => {
  describe('calculateNextInterval', () => {
    it('答對簡單應該大幅增加間隔', () => {
      const result = calculateNextInterval(1, 2.5, 3);
      expect(result.interval).toBe(2.5); // 1 * 2.5
      expect(result.factor).toBeGreaterThan(2.5);
      expect(result.factor).toBeCloseTo(2.6); // 2.5 + 0.1
    });

    it('答對 OK 應該輕微增加間隔', () => {
      const result = calculateNextInterval(2.5, 2.5, 2);
      expect(result.interval).toBeCloseTo(3.25); // 2.5 * 1.3
      expect(result.factor).toBe(2.5); // factor 不變
    });

    it('答對難（勉強）應該輕微增加', () => {
      const result = calculateNextInterval(5, 2.8, 1);
      expect(result.interval).toBeCloseTo(5.5); // 5 * 1.1
      expect(result.factor).toBe(2.7); // 2.8 - 0.1
    });

    it('答錯應該重置', () => {
      const result = calculateNextInterval(10, 3.0, 0);
      expect(result.interval).toBe(1);
      expect(result.factor).toBe(2.5);
    });

    it('factor 應該不低於 1.3', () => {
      const result = calculateNextInterval(1, 1.3, 1);
      expect(result.factor).toBe(1.3); // Math.max(1.3, 1.3 - 0.1)
    });

    it('應該正確處理多次複習', () => {
      let interval = 1;
      let factor = 2.5;

      // Day 1: 新卡片
      expect(interval).toBe(1);

      // Day 2: 答對簡單
      let result = calculateNextInterval(interval, factor, 3);
      interval = result.interval;
      factor = result.factor;
      expect(interval).toBe(2.5);

      // Day 4: 答對 OK
      result = calculateNextInterval(interval, factor, 2);
      interval = result.interval;
      factor = result.factor;
      expect(interval).toBeCloseTo(3.25);

      // Day 7: 答錯
      result = calculateNextInterval(interval, factor, 0);
      interval = result.interval;
      factor = result.factor;
      expect(interval).toBe(1);
      expect(factor).toBe(2.5);
    });
  });

  describe('getNextReviewDate', () => {
    it('應該正確計算下次複習日期', () => {
      const date = getNextReviewDate(5);
      const expected = new Date();
      expected.setDate(expected.getDate() + 5);
      expected.setHours(0, 0, 0, 0);

      expect(date.getTime()).toBe(expected.getTime());
    });

    it('應該向上取整天數', () => {
      const date = getNextReviewDate(2.3);
      const expected = new Date();
      expected.setDate(expected.getDate() + 3); // ceil(2.3) = 3
      expected.setHours(0, 0, 0, 0);

      expect(date.getTime()).toBe(expected.getTime());
    });

    it('應該總是返回午夜時間', () => {
      const date = getNextReviewDate(1);
      expect(date.getHours()).toBe(0);
      expect(date.getMinutes()).toBe(0);
      expect(date.getSeconds()).toBe(0);
      expect(date.getMilliseconds()).toBe(0);
    });

    it('應該處理 0 間隔', () => {
      const date = getNextReviewDate(0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(date.getTime()).toBe(today.getTime());
    });
  });

  describe('isCardOverdue', () => {
    it('應該檢測逾期卡片', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(isCardOverdue(yesterday)).toBe(true);
    });

    it('應該檢測正常卡片', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(isCardOverdue(tomorrow)).toBe(false);
    });

    it('應該將今天視為逾期', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(isCardOverdue(today)).toBe(true);
    });
  });

  describe('daysUntilReview', () => {
    it('應該計算天數直到複習', () => {
      const future = new Date();
      future.setDate(future.getDate() + 5);

      const days = daysUntilReview(future);
      expect(days).toBe(5);
    });

    it('應該返回負數表示逾期', () => {
      const past = new Date();
      past.setDate(past.getDate() - 3);

      const days = daysUntilReview(past);
      expect(days).toBeLessThan(0);
    });

    it('應該返回 0 表示今天', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const days = daysUntilReview(today);
      expect(days).toBe(0);
    });
  });

  describe('getQualityFromRating', () => {
    it('應該映射 wrong 到 0', () => {
      expect(getQualityFromRating('wrong')).toBe(0);
    });

    it('應該映射 hard 到 1', () => {
      expect(getQualityFromRating('hard')).toBe(1);
    });

    it('應該映射 ok 到 2', () => {
      expect(getQualityFromRating('ok')).toBe(2);
    });

    it('應該映射 easy 到 3', () => {
      expect(getQualityFromRating('easy')).toBe(3);
    });

    it('應該返回 0 作為無效值的默認值', () => {
      expect(getQualityFromRating('invalid' as any)).toBe(0);
    });
  });
});
