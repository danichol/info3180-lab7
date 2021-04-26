/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {}    
    }, 
    components: {
        'Home': Home,
        'upload-form': uploadForm
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const uploadForm ={
    name: 'upload-form',
    data(){
        return{
            displayFlash:false,
            isSuccessUpload:false,
            successmessage:"",
            errormessage:"",
        }
    },

    template: `
    <div>
        <h1> Upload Form </h1>
        <div class ="alert alert-success" v-if="isSuccess">
            <p v-for="success in successMessage">{{ success }}</p>
        </div>

        <div class="alert alert-danger" v-if="isError">
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>

        <form @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data" id="uploadForm">
            <div class="form-group">
                <label> Description: </label>
                <textarea name="description" class="form-control"></textarea>
                <label> Photo: </label>
                <input type="file" name="photo"></input>  
            </div>
        <button class="btn btn-primary mb-2">Submit</button>
        </form>
        
    </div>
    `,
    data: function(){
        return{
            errors: [],
            successMessage: [],
            isSuccess: false,
            isError: false
        };
    },

    methods: {
        uploadPhoto(){
            let self=this;
            let uploadForm= document.getElementById('uploadForm');
            let form_data= new FormData (uploadForm);

            fetch("/api/upload",{
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
           .then(function(response) {
               return response.json();
           })
           .then(function (jsonResponse){
               console.log(jsonResponse);

               if (jsonResponse.errors){
                   self.isError=true;
                   self.isSuccess=false;
                   self.errors = jsonResponse.errors;
               }
               else if (jsonResponse.upload){
                   self.isError=false;
                   self.isSuccess = true;
                   self.successMessage = jsonResponse.upload;
               }
           })

           .catch(function (error) {
               console.log(error);
           });
        }
    },
}; 




app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});



const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');