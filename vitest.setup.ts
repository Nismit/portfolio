import "@testing-library/dom";
import "@testing-library/jest-dom/vitest";

// Mock ResizeObserver for cmdk
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

// Mock scrollIntoView for cmdk
Element.prototype.scrollIntoView = () => {};
