import Tracker from "./index";

async function testFile() {
  const tracker = new Tracker(
    {
      name: "My first tracker",
      locale: "en-US",
      version: "1.0.0",
    },
    "MC-1234567890",
    "error",
    "Testing message on this first tracker",
  );

  tracker.logOnly();

  tracker.track("Hello world");

  tracker.track("Hello world 2");

  tracker.track({ abacate: "azul" });

  tracker.logMessageOnly();

  tracker.logOnly();

  tracker.track({ abacate: "azul", banana: "verde" });

  tracker.trace("testFile.ts");

  tracker.flushTracker({
    data: true,
    trace: false,
    temporaryMessage: "Some random message",
  });

  tracker.trace("after testFile.ts");

  tracker.flushTracker({
    data: false,
    trace: true,
  });
}

testFile();
