<template>
    <div>
      <b-modal id="modal-instructions" title="Instrucciones" ok-only ok-title="Entendido! :)">
        <ul class="mb-0">
          <li>Por favor, ingrese el grado en que se presenta el síntoma.</li>
          <li>El rango va de 0 a 10 (en donde 0 signifca que NO se presenta el síntoma y 10 significa que se presenta el síntoma con mucha gravedad.</li>
        </ul>
      </b-modal>
      <div v-show="showStartScreen" class="container">
        <div class="row">
          <div class="col-sm-12 pt-5 pb-4">
            <h2 v-if="currentSymptonIndex < symptons.length" class="text-center">
              {{ symptons[currentSymptonIndex].question }}
            </h2>
          </div>
          <div class="col-sm-12 offset-md-2 col-md-8 my-5 text-center">
            <span class="severity-text">Gravedad: <b>{{ currentSeverity }}</b></span>
            <b-form-input v-model.number="currentSeverity" type="range" min="0" max="10"></b-form-input>
          </div>
          <div class="col-sm-12 offset-md-2 col-md-8 mt-5">
            <b-button @click="prevSympton()" v-if="currentSymptonIndex > 0" pill variant="outline-primary" class="float-left">
              <i class="fas fa-chevron-left"></i>
              Regresar
            </b-button>
            <b-button @click="nextSympton()" v-if="currentSymptonIndex !== (this.symptons.length - 1)" pill variant="primary" class="float-right">
              Siguiente
              <i class="fas fa-chevron-right"></i>
            </b-button>
            <b-button @click="finishDiagnostic()" v-if="currentSymptonIndex === (this.symptons.length - 1)" pill variant="success" class="float-right">
              Finalizar
              <i class="fas fa-check"></i>
            </b-button>
          </div>
        </div>
      </div>
      <div v-show="showResultScreen" class="container">
        {{ diseases }}
      </div>
    </div>
</template>

<script>
import { symptons } from './symptons.json';

export default {
  name: 'GeneralDiagnostic',
  props: {},
  data: function() {
    return {
      showStartScreen: false,
      showResultScreen: false,
      symptons: symptons.slice(0, 5),
      answers: [],
      currentSymptonIndex: 0,
      currentSeverity: 0,
      diseases: null
    };
  },
  mounted() {
      this.startScreen();
  },
  methods: {
    showInstructions: function() {
      this.$bvModal.show('modal-instructions');
    },
    startScreen: function() {
      this.showInstructions();
      this.answers = new Array(this.symptons.length);
      this.showStartScreen = true;
    },
    prevSympton: function() {
      this.currentSymptonIndex -= 1;
      this.currentSeverity = this.answers[this.currentSymptonIndex];
      window.console.log(this.currentSeverity);
    },
    nextSympton: function() {
      this.answers[this.currentSymptonIndex] = this.currentSeverity;
      this.currentSymptonIndex += 1;

      this.currentSeverity = this.answers[this.currentSymptonIndex] === undefined ? 0 : this.answers[this.currentSymptonIndex];
      window.console.log(this.answers);
    },
    calculateResult: function() {
      alert('Calculating...');
    },
    resultScreen: function() {
      this.showStartScreen = false;
      this.showResultScreen = true;
    },
    finishDiagnostic: function() {
      this.nextSympton();
      this.calculateResult();
      this.resultScreen();
    }
  }
}
</script>

<style scoped>
#modal-instructions ul li {
  margin-top: 15px;
  margin-bottom: 15px;
}

.severity-text {
  font-size: 22px;
  display: block;
  margin-bottom: 30px;
}
</style>
