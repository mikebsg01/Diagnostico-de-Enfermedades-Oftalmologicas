<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 app-header">
                    <div class="pl-5 col-sm-12 col-md-5">
                        <h1 class="app-title">
                            <span>Diagnósticos de</span>
                            <span>Enfermedades</span>
                            <span>Oftalmológicas</span> 
                            <span>Aplicando</span>
                            <span>Lógica Difusa</span>
                        </h1>
                        <a href="#select-diagnostic" class="btn-start-diagnostic btn btn-outline-light rounded-pill">
                            Empezar
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div id="select-diagnostic" class="row">
                <div class="col-sm-12 p-5 col-md-6">
                    <h2 class="text-center my-5">Diagnóstico General</h2>
                    <p>Permite al usuario obtener una diagnóstico en base a un conjunto amplio y general de enfermedades.</p>
                    <p>En la mayoría de los casos este diagnóstico puede ser el más acertado.</p>
                    <div class="text-center mt-5">
                        <button @click="startGeneralDiagnostic()" class="btn-start-diagnostic btn btn-primary rounded-pill">
                            Comenzar Diagnóstico General &nbsp;&nbsp;
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div class="col-sm-12 p-5 col-md-6">
                    <h2 class="text-center my-5">Diagnóstico Específico</h2>
                    <p>Permite al usuario obtener un diagnóstico en base a un conjunto específico de enfermedades (previamente seleccionado).</p>
                    <p>Es comúnmente utilizado cuando ya se tiene una idea clara de la posible enfermedad que se presenta en el usuario.</p>
                    <div class="text-center mt-5">
                        <button @click="startSpecificDiagnostic()" class="btn-start-diagnostic btn btn-primary rounded-pill">
                            Comenzar Diagnóstico Específico &nbsp;&nbsp;
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 py-5 app-developers">
                    <div class="mb-5 col-sm-12">
                        <h2 class="text-center">Desarrolladores</h2>
                    </div>
                    <div class="col-sm-12 offset-md-1 col-md-10">
                        <div class="row">
                            <div class="col-sm-3 px-5">
                                <img src="../../assets/img/picture-victoria-jesus.jpg" class="img-fluid rounded-circle developer-picture mb-4" alt="">
                                <h3 class="developer-name text-center">Aida Victoria Ortiz de Jesús</h3>
                            </div>
                            <div class="col-sm-3 px-5">
                                <img src="../../assets/img/picture-michael-serrato.jpg" class="img-fluid rounded-circle developer-picture mb-4" alt="">
                                <h3 class="developer-name text-center">Michael Brandon Serrato Guerrero</h3>
                            </div>
                            <div class="col-sm-3 px-5">
                                <img src="../../assets/img/picture-brenda-rodriguez.jpg" class="img-fluid rounded-circle developer-picture mb-4" alt="">
                                <h3 class="developer-name text-center">Brenda Angélica Rodríguez Estrada</h3>
                            </div>
                            <div class="col-sm-3 px-5">
                                <img src="../../assets/img/picture-erik-mora.jpg" class="img-fluid rounded-circle developer-picture mb-4" alt="">
                                <h3 class="developer-name text-center">Erik Yael Mora Alcocer</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  props: {},
  methods: {
    startGeneralDiagnostic: function() {
        this.$router.push('generaldiagnostic');
    },
    startSpecificDiagnostic: function() {
        alert('Specific');
    }
  }
}
</script>

<style scoped>
.app-header {
    height: 430px;
    background-color: #f1f1f1;
    background-image: linear-gradient(to left, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(../../assets/img/wallpaper-3.jpg);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.app-header h1 {
    color: #fff;
    text-shadow: 1px 1px 8px rgba(0, 0, 0, .8);
}

.app-header .app-title {
    margin-top: 60px;
    font-size: 36px;    
}

.app-header .app-title span {
    display: block;
}

.app-header .btn-start-diagnostic {
    margin-top: 20px;
}

.app-developers .developer-name {
    font-size: 16px;
    line-height: 140%;
}
</style>
