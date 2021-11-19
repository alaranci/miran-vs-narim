const app = Vue.createApp({
  data() {
    return {
      isInfoVisible: true,
      stage: "choosing-level",
      level: 1,
      medkit: 3,
      narimHealth: 100,
      miranHealth: 100,
      attackLaunch: 0,
      isSurrender: false,
      winner: null,
      isGameOver: false,
    };
  },

  watch: {
    miranHealth(value) {
      if (value <= 0 && this.narimHealth <= 0) {
        this.winner = "draw";
        this.isGameOver = true;
      } else if (value <= 0) {
        this.winner = "narim";
        this.isGameOver = true;
      }
    },

    narimHealth(value) {
      if (value <= 0 && this.miranHealth <= 0) {
        this.winner = "draw";
        this.isGameOver = true;
      } else if (value <= 0) {
        this.winner = "miran";
        this.isGameOver = true;
        this.medkit++;
      }
    },
  },

  computed: {
    miranHealthBar() {
      if (this.miranHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.miranHealth + "%" };
    },
    narimHealthBar() {
      if (this.narimHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.narimHealth + "%" };
    },
  },

  methods: {
    attackPower(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    miranAttack() {
      this.attackLaunch++;
      const attackValue = this.attackPower(12, 5);
      this.narimHealth -= attackValue;
      if (this.narimHealth < 0) {
        this.narimHealth = 0;
      }
      this.narimAttack();
    },

    narimAttack() {
      const attackValue = this.attackPower(10 * this.level, 5 * this.level);
      this.miranHealth -= attackValue;
      if (this.miranHealth < 0) {
        this.miranHealth = 0;
      }
    },

    miranSpecialAttack() {
      this.attackLaunch++;
      const attackValue = this.attackPower(25, 10);
      this.narimHealth -= attackValue;
      if (this.narimHealth < 0) {
        this.narimHealth = 0;
      }
      this.narimAttack();
    },

    heal() {
      if (this.miranHealth !== 100) {
        this.miranHealth = 100;
        this.medkit -= 1;
      }
    },

    surrenderHandle() {
      this.isSurrender = !this.isSurrender;
    },

    startGame() {
      this.stage = "game-start";
    },

    chooseLevel() {
      this.stage = "choosing-level";
      this.narimHealth = 100;
      this.miranHealth = 100;
      this.attackLaunch = 0;
      this.isSurrender = false;
      this.winner = null;
      this.isGameOver = false;
    },

    setInfoVisible() {
      this.isInfoVisible = !this.isInfoVisible;
    },
  },
});

app.mount("#app");
