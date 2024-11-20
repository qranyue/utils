import { describe, expect, it } from "vitest";
import { createEvents } from ".";

describe("createEvents", () => {
  it("should add and run an event", () => {
    const events = createEvents();
    let count = 0;
    events.on("test", () => {
      count++;
    });
    events.emit("test");
    expect(count).toBe(1);
  });

  it("should add and run multiple events", () => {
    const events = createEvents();
    let count = 0;
    events.on("test", () => {
      count++;
    });
    events.on("test", () => {
      count++;
    });
    events.emit("test");
    expect(count).toBe(2);
  });

  it("should add and run an event once", () => {
    const events = createEvents();
    let count = 0;
    events.once("test", () => {
      count++;
    });
    events.emit("test");
    events.emit("test");
    expect(count).toBe(1);
  });

  it("should add and run an event with arguments", () => {
    const events = createEvents();
    let count = 0;
    events.on("test", (arg1: number, arg2: number) => {
      count += arg1 + arg2;
    });
    events.emit("test", 1, 2);
    expect(count).toBe(3);
  });

  it("should add and run an event with rest parameter", () => {
    const events = createEvents();
    let count = 0;
    events.on("test", (...args: number[]) => {
      count += args.reduce((a, b) => a + b, 0);
    });
    events.emit("test", 1, 2, 3);
    expect(count).toBe(6);
  });

  it("should remove an event", () => {
    const events = createEvents();
    let count = 0;
    const fn = () => {
      count++;
    };
    events.on("test", fn);
    events.off("test", fn);
    events.emit("test");
    expect(count).toBe(0);
  });

  it("should remove all events", () => {
    const events = createEvents();
    let count = 0;
    events.on("test", () => {
      count++;
    });
    events.off("test");
    events.emit("test");
    expect(count).toBe(0);
  });
});
