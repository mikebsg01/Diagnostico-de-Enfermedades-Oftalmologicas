<template>
    <div>
        <template v-if="! showDiagnosticScreen">
            <div class="container">
                <div class="row">
                <div class="col-sm-12 offset-md-2 col-md-8 pt-5 pb-3">
                    <h3 class="text-center">
                    Selecciona las enfermedades para realizar el diagnóstico:
                    </h3>
                </div>
                <div class="col-sm-12 offset-md-2 col-md-8 mt-4 mb-3">
                    <b-form-group>
                        <b-form-checkbox-group id="checkbox-group-1" v-model="selectedDiseases" :options="diseases" name="input-select-diseases" stacked required></b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div class="col-sm-12 offset-md-2 col-md-8 my-4">
                    <div class="float-right">
                        <b-button @click="startDiagnostic()" pill variant="primary" class="float-right">
                            Continuar
                            <i class="fas fa-chevron-right"></i>
                        </b-button>
                    </div>
                </div>
                </div>
            </div>
        </template>
        <template v-else>
            <general-diagnostic :specificDiseases="selectedDiseases"></general-diagnostic>
        </template>
    </div>
</template>

<script>
import { symptons } from './../GeneralDiagnostic/symptons.json';
import { preloadedModel } from './../GeneralDiagnostic/preloadedModel.json';
import GeneralDiagnostic from './../GeneralDiagnostic/GeneralDiagnostic.vue';

export default {
    name: 'SpecificDiagnostic',
    props: {},
    components: {
        GeneralDiagnostic
    },
    data: function() {
        return {
            diseases: [],
            selectedDiseases: [],
            symptons: symptons,
            preloadedModel: preloadedModel,
            showDiagnosticScreen: false
        }
    },
    methods: {
        extractDiseases: function(preloadedModel) {
            return preloadedModel.map(function(disease) {
                return disease.name;
            });
        },
        startDiagnostic() {
            if (this.selectedDiseases.length == 0) {
                alert('Debes seleccionar al menos una enfermedad!');
                return;
            }

            this.showDiagnosticScreen = true;
        }
    },
    mounted: function() {
        this.diseases = this.extractDiseases(this.preloadedModel);
    }
}
</script>

<style scoped>
</style>
