<template>
  <div>
    <Form :validation-schema="schema" @submit="onSubmit" class="form">
      <label>
        Имя на карте:
        <Field name="cardHolder" placeholder="Введите имя владельца" class="form-input" />
        <ErrorMessage name="cardHolder" class="error" />
      </label>

      <label>
        Номер карты:
        <Field name="cardNumber" placeholder="Введите номер карты" class="form-input" />
        <ErrorMessage name="cardNumber" class="error" />
      </label>

      <label>
        Дата окончания (MM/YY):
        <Field name="expiryDate" placeholder="Введите дату окончания" class="form-input" />
        <ErrorMessage name="expiryDate" class="error" />
      </label>

      <label>
        CVC/CVV:
        <Field name="cvc" type="password" placeholder="Введите CVC" class="form-input" />
        <ErrorMessage name="cvc" class="error" />
      </label>

      <button type="submit" class="submit">Оплатить</button>
    </Form>
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  cardHolder: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Имя может содержать только буквы и пробелы")
    .required("Введите имя владельца карты"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Номер карты должен содержать 16 цифр")
    .required("Введите номер карты"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Введите дату в формате MM/YY")
    .test("expiryDate", "Карта просрочена", (value) => {
      if (!value) return false;
      const [month, year] = value.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      return year > currentYear || (year === currentYear && month >= currentMonth);
    })
    .required("Введите дату окончания"),
  cvc: yup
    .string()
    .matches(/^[0-9]{3}$/, "CVC должен содержать ровно 3 цифры")
    .required("Введите CVC"),
});

function onSubmit(values) {
  console.log("Данные карты:", JSON.stringify(values, null, 2));
  alert("Оплата успешно проведена!");
}
</script>

<style >
/* .form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

label {
  margin-bottom: 15px;
}

.form-input {
  border-radius: 10px;
  padding: 5px;
  font-size: 16px;
  line-height: 24px;
  margin-top: 5px;
  width: 300px;
  display: inline-block;
  border: 1px solid grey
}

.submit {
  border-radius: 20px;
  background: rgb(9, 216, 9);
  margin-top: 20px;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
} */
</style>
