<script setup>
// Our logic will go here
import { Column, DataTable } from 'primevue';
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true);
  validatePassword(true);
  validateGender(true);
  if (!errors.value.username) {
    submittedCards.value.push({
      ...formData.value
    })
    clearForm();
  }


}

function clearForm() {
  // console.log(11)
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    isAustralian: null,
    reason: null,
    gender: null,
    suburb: null
  }

}

function clearAll() {
  clearForm()
  submittedCards.value = []
}


const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  isAustralian: null,
  reason: null,
  gender: null,
  suburb: null

})

const validateName = (input) => {
  if (formData.value.username.length < 3) {
    if (input) {
      errors.value.username = "name must be at least 3 characters"
    }
  } else {
    errors.value.username = null
  }
}

const validateConfirmPassword = (input) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = "password not matched."
  } else if (errors.value.password !== null) {
    errors.value.confirmPassword = errors.value.password
  } else {
    errors.value.confirmPassword = null
  }
}

const validateSuburb = (input) => {
  
}


const validatePassword = (input) => {
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (input) {
      errors.value.password = `password must have at least ${minLength} characters long.`;
    }
  } else if (!hasUppercase) {
    if (input) errors.value.password = "password must have at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (input) errors.value.password = "password must have at least one lowercase letter.";
  } else if (!hasNumber) {
    if (input) errors.value.password = "password must have at least one number.";
  } else if (!hasSpecialChar) {
    if (input) errors.value.password = "password must have at least one special character.";
  } else {
    errors.value.password = null
  }
}

const validateGender = (input) => {

  if (!formData.value.gender) {
    if (input) {
      errors.value.gender = "Gender input is not selected.";
    }
  } else {
    errors.value.gender = null;
  }
}

</script>


<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-10 col-md-8 offset-md-1 col-lg-10">
        <h1 class="text-center">🗄️Library Registration Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">User name</label>
              <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                @input="() => validateName(false)" v-model="formData.username">
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Gender</label>
              <select class="form-select" id="gender" @blur="() => validateGender(true)"
                @input="() => validateGender(false)" v-model="formData.gender">

                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }} </div>
            </div>

          </div>
          <div class="row mb-3">

            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input type="text" class="form-control" id="password" @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)" v-model="formData.password">
              <div v-if="errors.password" class="text-danger">{{ errors.password }} </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input type="text" class="form-control" id="confirmPassword" @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)" v-model="formData.confirmPassword">
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }} </div>
            </div>
            <div class="mt-4 col-md-6">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
          </div>


          <div class="mb-3">
            <label for="reason">Reason For Joining:</label><br>
            <textarea class="form-control" id="reason" rows="3" @blur="() => validateReason(true)"
              v-model="formData.reason">

                        </textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }} </div>


            <div class="mt-2 col-md-8 col-sm-8 offset-2">
              <label for="confirmPassword" class="form-label">Suburb</label>
              <input type="text" class="form-control" id="confirmPassword" 
                @blur="() => validateSuburb(true)"
                @input="() => validateSuburb(false)" v-model="formData.suburb">
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.suburb }} </div>
            </div>


          </div>



          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary me-2" @click="clearForm">Clear</button>
            <button type="button" class="btn btn-danger" @click="clearAll">Clear All</button>

          </div>

        </form>


      </div>
    </div>

    <DataTable class="mt-5" :value="submittedCards" tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Is Australian"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>

    </DataTable>

    <div class="row mt-5" v-if="submittedCards.length">
      <div class="d-flex flex-wrap justify-content-start">
        <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
          <div class="card-header">
            User Information
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div>

  </div>






</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275FDA;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>
