<template>
  <div>
    <Form :validation-schema="schema" @submit="onSubmit" class="form">
      <label class="form-label">
        Имя:
        <Field name="firstName" class='form-input'/>
        <ErrorMessage name="firstName" class="error" />
      </label>

      <label>
        Фамилия:
        <Field name="lastName" class='form-input'/>
        <ErrorMessage name="lastName" class="error" />
      </label>

      <label>
        Email:
        <Field name="email" class='form-input'/>
        <ErrorMessage name="email" class="error" />
      </label>

      <label>
        Мобильный номер:
        <Field name="phone" class='form-input'/>
        <ErrorMessage name="phone" class="error" />
      </label>

      <label>
        Адрес:
        <Field name="address" class='form-input'/>
        <ErrorMessage name="address" class="error" />
      </label>

      <div>
        <h4 class="title">Доставка</h4>
        <label>
          <Field name="delivery" type="radio" value="pickup" class='form-radio'/> Самовывоз
        </label>
        <label>
          <Field name="delivery" type="radio" value="courier" class='form-radio'/> Курьер
        </label>
        <label>
          <Field name="delivery" type="radio" value="post" class='form-radio'/> Почта
        </label>
        <ErrorMessage name="delivery" class="error" />
      </div>

      <div>
        <h4 class="title">Оплата</h4>
        <label>
          <Field name="payment" type="radio" value="offline" class='form-radio'/> При получении
        </label>
        <label>
          <Field name="payment" type="radio" value="online" class='form-radio'/> Предоплата
        </label>
        <ErrorMessage name="payment" class="error" />
      </div>

      <div>
        <label>
          <Field name="agreement" type="checkbox" class='form-checkbox'/> Согласен с правилами обработки заказов
        </label>
        <ErrorMessage name="agreement" class="error" />
      </div>

      <button type="submit" class="submit">Submit</button>
    </Form>
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

// Определение схемы валидации с добавлением правила для agreement
const schema = yup.object({
  firstName: yup.string().required("Введите имя"),
  lastName: yup.string().required("Введите фамилию"),
  email: yup.string().required("Введите email").email("Введите корректный email"),
  phone: yup.string()
    .required("Введите телефон")
    .matches(/^\d+$/, "Телефон должен содержать только цифры")
    .min(10, "Минимальная длина телефона 10 символов"),
  address: yup.string().required("Введите адрес"),
  delivery: yup.string().required("Выберите способ доставки"),
  payment: yup.string().required("Выберите способ оплаты"),
  agreement: yup.boolean()
    .oneOf([true], "Вы должны согласиться с правилами обработки заказов")
    .required("Вы должны согласиться с правилами обработки заказов"),
});

// Обработчик отправки формы
function onSubmit(values) {
  console.log("Форма отправлена:", JSON.stringify(values, null, 2));
  // Здесь вы можете добавить логику отправки данных на сервер
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

label {
  margin-bottom: 15px;
}

.submit {
  border-radius: 20px;
  background: rgb(9, 216, 9);
  margin-top: 20px;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  max-width: 200px;
  min-width: 200px;
  align-self: center;
}

.form-input {
  border-radius: 10px;
  padding: 5px;
  font-size: 16px;
  line-height: 24px;
  margin-top: 5px;
}

.form-radio {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.form-checkbox {
  margin-top: 20px;
  width: 15px;
  height: 15px;
}

.title {
  margin-bottom: 10px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
