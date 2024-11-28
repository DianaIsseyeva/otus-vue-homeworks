<template>
  <div class="form-container">
    <Form :validation-schema="schema" @submit="onSubmit" class="form">
      <div class="form-group">
        <label for="login" class="form-label">Логин:</label>
        <Field name="login" id="login" placeholder="Введите логин" class="form-input" />
        <ErrorMessage name="login" class="error" />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Пароль:</label>
        <Field name="password" id="password" type="password" placeholder="Введите пароль" class="form-input" />
        <ErrorMessage name="password" class="error" />
      </div>

      <button type="submit" class="submit">Войти</button>
    </Form>
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const router = useRouter();

const schema = yup.object({
  login: yup.string().required("Введите логин"),
  password: yup.string().required("Введите пароль"),
});

function onSubmit(values) {
  localStorage.setItem("isAuthorized", "true");
  router.push({ name: "create-products" });
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.form {
  background: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100vw;
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.submit {
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit:hover {
  background-color: #0056b3;
}

.submit:active {
  background-color: #003f7f;
}
</style>
