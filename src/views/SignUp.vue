<template>
  <v-app>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm10 md8 ld6 xl4>
        <v-form>
          <h2>Regisztrállás e-mail címmel és jelszóval:</h2>
          <br>
          <v-text-field v-model="email" label="E-mail cím:" required/>
          <v-text-field v-model="password1" type="password" label="Jelszó:" required/>
          <v-text-field v-model="password2" type="password" label="Jelszó ismét:" required/>
          <br>
          <v-btn block color="info" @click="SignUp()">SignUp</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  private email: string;
  private password1: string;
  private password2: string;

  constructor() {
    super();
    this.email = "";
    this.password1 = "";
    this.password2 = "";
  }

  private SignUp() {
    // Két jelszó egyezésének ellenőrzése
    if (this.password1 == this.password2) {
      firebase
        .auth() // Felhasználó létrehozása
        .createUserWithEmailAndPassword(this.email, this.password1)
        .then(
          success => {
            if (success.user)
              //Ha sikeres regisztráció, a visszaigazoló e-mail kiküldése
              success.user.sendEmailVerification().then(
                success => {
                  alert("Megerősítő e-mail cím elküldve!!");
                },
                err => {
                  alert("NEm sikerült megerősítő e-mail-t küldeni!");
                }
              );
            alert("Sikeres regisztráció!");
            this.$router.replace("verify"); // Átirányítás a megerősítő email újraküldés oldalára
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    } else {
      alert("Nem megegyező jelszavak");
    }
  }
}
</script>

<style scoped>
v-text-field {
  max-width: 200px;
}
h2 {
  margin-top: 20px;
}
</style>
