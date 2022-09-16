export type Pairing = string[];
export type Session = Array<Pairing>;
export type Sessions = Array<Session>;

export const createPairs = (attendeeNames: string[]) => {
  const attendeeArray = Array.from(attendeeNames);
  const pairs = [];
  while (attendeeArray.length != 0) {
    const firstName = attendeeArray.shift();
    const lastName = attendeeArray.pop();
    if (firstName != undefined && lastName != undefined) {
      pairs.push([firstName, lastName]);
    }
  }
  return pairs;
};

export const rotateAttendeeArray = (array: string[]) => {
  const baseArray = Array.from(array);

  const firstName = baseArray.shift();
  const lastName = baseArray.pop();

  if (firstName && lastName) {
    return [firstName, lastName, ...baseArray];
  }
  return baseArray;
};

export const createSessions = (attendeeNames: string[]): Sessions => {
  if (attendeeNames.length < 2) {
    throw new Error("Lenght of Attendeelist should be atleast 2");
  }
  const sessions: Sessions = [];
  let namesArray = Array.from(attendeeNames);

  for (let i = 0; i < namesArray.length - 1; i++) {
    sessions.push(createPairs(namesArray));
    namesArray = rotateAttendeeArray(namesArray);
  }
  return sessions;
};
