<template>
  <div class="app__wrapper">
    <h1 class="app__header">What connects you?</h1>
    <div class="name-form" v-if="sessions.length === 0">
      <input
        type="text"
        name="name-input"
        id="name-input"
        v-model="attendee"
        @keypress.enter="addAttendee"
        class="name-input"
        placeholder="Enter Name"
      />
      <label for="name-input"></label>
      <button class="button" @click="addAttendee()">Add</button>
      <button
        class="button"
        @click="createSessions()"
        :disabled="!isValidSession"
      >
        Create Sessions
      </button>
    </div>
    <button class="button" @click="resetSession" v-if="sessions.length != 0">
      Reset
    </button>
    <div class="added-attendees" v-if="sessions.length === 0">
      <h3 v-if="attendees.length != 0" class="added-attendees__header">
        Added attendees:
      </h3>
      <h3 v-if="attendees.length === 0" class="added-attendees__header">
        No attendees added
      </h3>
      <ol class="added-attendees__list">
        <li
          v-for="attendee in attendees"
          :key="attendee"
          class="added-attendees__list-item"
        >
          {{ attendee }}
        </li>
      </ol>
    </div>
    <div class="sessions">
      <ol class="sessions__list">
        <li
          v-for="(session, i) in sessions"
          :key="i"
          class="sessions__list-item"
          :class="{ finished: isSessionCompleted(session) }"
        >
          <h2 class="sessions__heading">Session {{ i + 1 }}</h2>
          <div class="sessions__pairings">
            <p v-for="(singleSession, j) in session" :key="j">
              {{ session[j][0] + " - " + session[j][1] }}
            </p>
          </div>
          <button @click="finishSession(session)" class="button">
            Session finished
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
// todo: add missing unit tests
import { defineComponent } from "vue";
import { createSessions, Sessions, Session } from "./round-robin-matching";

export default defineComponent({
  name: "App",
  components: {},

  data(): {
    attendees: string[];
    attendee: string;
    sessions: Sessions;
    completedSessions: Sessions;
  } {
    return {
      attendees: [],
      attendee: "",
      sessions: [],
      completedSessions: [],
    };
  },

  computed: {
    isValidSession: function (): boolean {
      return this.attendees.length > 1 && this.attendees.length % 2 === 0;
    },
  },
  methods: {
    addAttendee() {
      if (this.attendee) {
        this.attendees.push(this.attendee);
        this.attendee = "";
      }
    },
    createSessions() {
      this.sessions = createSessions(this.attendees);
    },
    finishSession(session: Session) {
      this.completedSessions.push(session);
    },
    isSessionCompleted(session: Session) {
      return this.completedSessions.includes(session);
    },
    resetSession() {
      this.sessions = [];
      this.attendees = [];
    },
  },
});
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic);

:root {
  --primary: #6a1cc3;
  --primary-inactive: rgba(106, 28, 195, 0.38);
  --secondary: #8849cf;

  --primary-text: rgba(0, 0, 0, 0.87);

  --bg-white: #fbfbfb;

  --font-primary: "Source Sans Pro", sans-serif;
  --font-secondary: "Montserrat", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: var(--font-primary);
  margin: 0;
}
.app__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app__header {
  font-family: Montserrat;
  font-size: 2rem;
  color: var(--bg-white);
  background-color: var(--primary);
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  height: 100%;
  margin: 0 0 2rem 0;
  padding: 2rem 0;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .app__header {
    font-size: 3rem;
  }
}

.name-form {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.name-input {
  min-width: 16rem;
  height: 3rem;
  border: 2px solid var(--primary);
  border-radius: 2px;
  font-size: 1.5rem;
  color: var(--primary-text);
  margin: 0.5rem;
  padding: 0 0.5rem;
}

.name-input::placeholder {
  color: var(--primary-inactive);
}

.button {
  border: 2px solid var(--primary);
  border-radius: 2px;
  box-shadow: 3px 3px 0 var(--primary);
  font-size: 1.5rem;
  font-weight: 600;
  height: 3rem;
  margin: 0.5rem;
  padding: 0 1rem;
  background-color: var(--bg-white);
  color: var(--primary);
  cursor: pointer;
  transition: 0.1s all;
}

.button:active {
  background-color: var(--primary);
  color: var(--bg-white);
  box-shadow: 0px 0px 0 var(--primary);
  transform: translate(3px, 3px);
}

.added-attendees {
  margin-top: 2.5rem;
}

.added-attendees__header {
  margin: 0;
  font-weight: 600;
  font-size: 1.5rem;
}

@media screen and (min-width: 768px) {
  .added-attendees__header {
    font-size: 2rem;
  }
}

.added-attendees__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin: 0.5rem 0;
  padding: 0;
}

.added-attendees__list-item {
  font-size: 1.5rem;
}

.sessions {
  margin-top: 1.5rem;
  margin-bottom: 4rem;
  width: 100%;
}

.sessions__heading {
  font-size: 1.5rem;
  font-weight: 600;
}

@media screen and (min-width: 768px) {
  .sessions__heading {
    font-size: 2rem;
  }
}

.sessions__list {
  padding: 0;
  width: 80%;
  margin: 0 auto;
}

.sessions__list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid black;
  padding: 2rem 0;
}

.sessions__pairings {
  margin: 1rem;
}

@media screen and (min-width: 768px) {
  .sessions__pairings {
    font-size: 1.5rem;
  }
}

.finished {
  text-decoration: line-through;
}
</style>
