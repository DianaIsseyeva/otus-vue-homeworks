<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" class="form">
      <label>
        Товар:
        <Field name='title' placeholder='Введите название товара' class="form-input" />
        <ErrorMessage name='title' class="error"/>
      </label>
      <label>
        Категория:
        <Field name='category' placeholder='Введите название категории' class="form-input" />
        <ErrorMessage name='category' class="error"/>
      </label>
      <label>
        Описание:
        <Field  as="textarea" rows="4" name='description' placeholder='Введите описание' class="form-input" />
        <ErrorMessage name='description' class="error"/>
      </label>
      <label>
        Цена:
        <Field name='price' placeholder='Введите цену товара' class="form-input" />
        <ErrorMessage name='price' class="error"/>
      </label>
    </Form>
  </div>
</template>

<script setup>

import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  title: yup
    .string()
    .required("Введите название товара"),
  category: yup
    .string()
    .required("Введите категорию товара"),
  description: yup
    .string()
    .required("Введите описание товара"),
  price: yup
    .string()
    .matches(/^\d+$/, "Цена должна быть числом и больше нуля")
    .test("is-positive", "Цена должна быть больше нуля", (value) => parseFloat(value) > 0)
    .required("Введите цену товара"),
});

const onSubmit =(values)=> {
  console.log("Форма отправлена:", JSON.stringify(values, null, 2));

}
</script>

<style>
.form {
  background-color: #494953;
  padding: 60px 80px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 50px auto;
  font-family: 'Roboto', sans-serif;
  color: #f0f0f0;
}
</style>