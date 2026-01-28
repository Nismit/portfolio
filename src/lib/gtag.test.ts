import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GA_TRACKING_ID, pageview } from './gtag';

describe('gtag', () => {
  beforeEach(() => {
    vi.stubGlobal('gtag', vi.fn());
  });

  describe('GA_TRACKING_ID', () => {
    it('should be defined from environment variable', () => {
      expect(GA_TRACKING_ID).toBe(process.env.NEXT_PUBLIC_GA_ID);
    });
  });

  describe('pageview', () => {
    it('should call gtag with correct parameters', () => {
      const url = '/test-page';
      pageview(url);

      expect(window.gtag).toHaveBeenCalledWith('config', GA_TRACKING_ID, {
        page_path: url,
      });
    });

    it('should call gtag for different URLs', () => {
      pageview('/page-1');
      pageview('/page-2');

      expect(window.gtag).toHaveBeenCalledTimes(2);
    });
  });
});
