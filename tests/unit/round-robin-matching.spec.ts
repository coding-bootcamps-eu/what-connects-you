import { createSessions } from "@/round-robin-matching";

test("should create correct number of sessions", () => {
  const attendees = ["a", "b", "c", "d"];
  const sessions = createSessions(attendees);

  expect(sessions.length).toEqual(3);
});

test("should throw error if attendee-list-length is below 2", () => {
  const attendees = ["a"];

  expect(() => {
    createSessions(attendees);
  }).toThrow();
});
