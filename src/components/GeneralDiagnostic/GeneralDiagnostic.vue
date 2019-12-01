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
          <div class="col-sm-12 offset-md-2 col-md-8 pt-4 pb-2">
            <b-badge pill variant="dark" class="float-right sympton-question-number">
              {{ (currentSymptonIndex + 1) }} / {{ symptons.length }}
            </b-badge>
          </div>
          <div class="col-sm-12 offset-md-2 col-md-8 pt-5 pb-4">
            <h2 v-if="currentSymptonIndex < symptons.length" class="text-center">
              {{ symptons[currentSymptonIndex].question }}
              <span class="mx-1 sympton-emoji">
                <i v-show="currentSeverity <= 3" class="far fa-smile"></i>
                <i v-show="currentSeverity > 3 && currentSeverity <= 6" class="far fa-meh"></i>
                <i v-show="currentSeverity > 6" class="far fa-frown"></i>
              </span>
            </h2>
          </div>
          <div class="col-sm-12 offset-md-2 col-md-8 my-5 text-center">
            <span class="severity-text">
              Gravedad: <b>{{ currentSeverity }}</b>
            </span>
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
        <div class="row">
          <div class="col-sm-12 pt-5 pb-1">
            <h2 class="text-center">Resultados del Diagnóstico:</h2>
          </div>
        </div>
        <div v-for="diseaseIndex of results.diseaseIndexes" :key="`disease-${diseaseIndex}-name`" class="row">
          <div class="col-sm-12 offset-md-1 col-md-10">
            <h3 class="text-center mt-5 mb-4">
              {{ preloadedModel[diseaseIndex].name }}
            </h3>
            <h4 class="my-3">Origen:</h4>
            <p class="mb-5">
              {{ preloadedModel[diseaseIndex].origin }}
            </p>
            <h4 class="mt-4 mb-3">Tratamiento:</h4>
            <p class="mb-4">
              {{ preloadedModel[diseaseIndex].treatment }}
            </p>
          </div>
        </div>
        <div v-if="results.diseaseIndexes.length == 0">
          <div class="col-sm-12 offset-md-2 col-md-8">
            <h3 class="text-center mt-5 mb-4">
              ¡Te encuentras completamente saludable!
              <i class="far fa-smile"></i>
            </h3>
            <p class="mb-5 text-center">
              El cuadro que presentas no coincide con ninguna enfermedad oftalmológica.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="text-center my-5">
              <b-button @click="goBackToHome()" pill variant="outline-primary" class="mx-2">
                <i class="fas fa-home"></i>
                Regresar al inicio
              </b-button>
              <b-button @click="restartDiagnostic()" pill variant="primary" class="mx-2">
                <i class="fas fa-redo"></i>
                Hacer otro diagnóstico
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { symptons } from './symptons.json';
import { preloadedModel } from './preloadedModel.json';

export default {
  name: 'GeneralDiagnostic',
  props: {},
  data: function() {
    return {
      showStartScreen: false,
      showResultScreen: false,
      preloadedModel: preloadedModel,
      symptons: symptons,
      answers: [],
      currentSymptonIndex: 0,
      currentSeverity: 0,
      results: {
        diseaseIndexes: []
      }
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
    },
    formatAnswers: function(answers) {
      return answers.map(function(x) { return x / 10; });
    },
    sumArray: function(arr) {
      return arr.reduce(function(total, currentVal) {
        return total + currentVal;
      }, 0);
    },
    isValidResult: function(result) {
      return ! isNaN(result) && result >= 0.5;
    },
    calculateResults: function() {
      var ans = this.formatAnswers(this.answers),
          maxResult = 0, 
          results = {
            diseaseIndexes: []
          };

      for (var i = 0; i < preloadedModel.length; ++i) {
        var disease = preloadedModel[i],
            minValuesByDisease = [];

        for (var j = 0; j < disease.values.length; ++j) {
          var val = disease.values[j],
              minVal = Math.min(val, ans[j]);

          minValuesByDisease.push(minVal);
        }

        var sumByDisease = this.sumArray(minValuesByDisease),
            maxSumByDisease = this.sumArray(disease.values),
            resultByDisease = sumByDisease / maxSumByDisease;
        
        if (this.isValidResult(resultByDisease) && resultByDisease > maxResult) {
          maxResult = resultByDisease;
          results.diseaseIndexes = [ i ];
        } else if (resultByDisease == maxSumByDisease) {
          results.diseaseIndexes.push(i);
        }
      }

      return results;
    },
    resultScreen: function() {
      this.showStartScreen = false;
      this.showResultScreen = true;
    },
    showResults: function() {
      this.results = this.calculateResults();
      window.console.log(this.results);
      this.resultScreen();
    },
    finishDiagnostic: function() {
      this.nextSympton();
      this.showResults();
    },
    restartDiagnostic: function() {
      this.$router.go();
    },
    goBackToHome: function() {
      this.$router.replace('/');
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

.sympton-question-number {
  font-size: 14px;
  font-weight: 500;
  padding: 4px 10px;
}

.sympton-emoji {
  margin-right: -14px !important;
}
</style>
