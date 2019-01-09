<template>
  <v-app>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl4>
        <v-form>
          <h2>Új kutya feltöltése</h2>
          <br>
          <v-text-field v-model="name" label="Kutya törzskönyvi neve:" required/>
          <br>
          <v-text-field v-model="image" label="Kép URL címe:" required/>
          <br>
          <v-text-field v-model="chip" label="Chipszám:" type="number" required/>
          <br>
          <select v-model="Breed" required>
            <option disabled value>Kérjük válasszon fajtát!</option>
            <option>Szibériai husky</option>
            <option>Alaszkai malamut</option>
            <option>Szamojéd</option>
            <option>Grönlandi kutya</option>
            <option>Kanadai eszkimókutya</option>
            <option>Keverék</option>
          </select>
          <br>
          <br>
          <v-btn color="info" block @click="addLocation(name, image, chip, Breed)">Add</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex v-for="(location, index) in Dogs" :key="index" xs12 sm6 md4 lg3 xl3>
        <v-card>
          <v-img class="white--text image-title" height="200px" :src="location.image">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex align-end flexbox>
                  <span class="headline">{{ location.name }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Kutya {{ index + 1 }}</span>
              <br>
              <span>Típus: {{ location.Breed }}</span>
              <br>
              <span>Chipszám: {{ location.chip }}</span>
              <br>
              <span>Elérhetőség: {{ location.uploader }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn
              v-if="getUserEmail === location.uploader"
              flat
              color="red"
              @click="deleteLocation(location.id)"
            >Törlés</v-btn>
            <v-btn v-if="getUserEmail === location.uploader" flat color="orange">Elrejtés</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import firebase from "firebase";
import db from "@/firebaseApp";

@Component({
  firestore: {
    Dogs: db.collection("Dogs")
  }
})
export default class Demo extends Vue {
  private name: string = "";
  private image: string = "";
  private chip: number = 10000;
  private Breed: string = "";
  private Dogs: any = [];
  private orderedDogs: any = [];

  //Új elem hozzáadása az adatbázishoz
  private addLocation(
    name: string,
    image: string,
    chip: number,
    Breed: string
  ): void {
    const createdAt = new Date();
    const user = firebase.auth().currentUser;
    let uploader;
    if (user) {
      uploader = user.email; // A feltöltő (a bejelentkezett felhasználó) e-mail címe
    }

    db.collection("Dogs") // Elem feltöltése az adatbázisba
      .add({ name, image, createdAt, uploader, chip, Breed })
      .then(docRef => {
        alert(`Document written with ID: ${docRef.id}`);
      })
      .catch(error => {
        alert(`Error adding document: ${error}`);
      });
    this.name = "";
    this.image = "";
  }

  //Elem törlése az adatbázisból
  private deleteLocation(id: any): void {
    db.collection("Dogs")
      .doc(id)
      .delete()
      .then(() => {
        alert("Document deleted!");
      })
      .catch(error => {
        alert(`Error deleting document: ${error}`);
      });
  }
  @Watch("Dogs")
  private onDogsChanged(value: number, oldValue: number) {
    //alert("invoke: onDogsChanged");
  }

  private get getUserEmail(): string | null {
    return firebase.auth().currentUser!.email;
  }
}
</script>

<style scoped>
.image-title {
  text-shadow: 0px 0px 8px black;
}
</style>
