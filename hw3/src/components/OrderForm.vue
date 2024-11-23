<template>
  <div>
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      class="form"
    >
      <label>
        Имя:
        <Field name="firstName" v-model="form.firstName" placeholder="Введите имя" class="form-input" />
        <ErrorMessage name="firstName" class="error" />
      </label>

      <label>
        Фамилия:
        <Field name="lastName" v-model="form.lastName" placeholder="Введите фамилию" class="form-input" />
        <ErrorMessage name="lastName" class="error" />
      </label>

      <label>
        Email:
        <Field name="email" v-model="form.email" placeholder="Введите email" class="form-input" />
        <ErrorMessage name="email" class="error" />
      </label>

      <label>
        Мобильный номер:
        <Field name="phone" v-model="form.phone" placeholder="Введите номер телефона" class="form-input" />
        <ErrorMessage name="phone" class="error" />
      </label>

      <div>
        <h4>Адрес</h4>
        <label>
          Город:
          <Field name="address.city" v-model="form.address.city" placeholder="Введите город" class="form-input" />
          <ErrorMessage name="address.city" class="error" />
        </label>
        <label>
          Улица:
          <Field name="address.street" v-model="form.address.street" placeholder="Введите улицу" class="form-input" />
          <ErrorMessage name="address.street" class="error" />
        </label>
        <label>
          Дом:
          <Field name="address.house" v-model="form.address.house" placeholder="Введите номер дома" class="form-input" />
          <ErrorMessage name="address.house" class="error" />
        </label>
        <label>
          Квартира:
          <Field name="address.apartment" v-model="form.address.apartment" placeholder="Введите номер квартиры" class="form-input" />
          <ErrorMessage name="address.apartment" class="error" />
        </label>
      </div>

      <div>
        <h4 class="title">Доставка</h4>
        <label>
          <Field type="radio" name="delivery" value="pickup" class="form-radio" /> Самовывоз
        </label>
        <label>
          <Field type="radio" name="delivery" value="courier" class="form-radio" /> Курьер
        </label>
        <label>
          <Field type="radio" name="delivery" value="post" class="form-radio" /> Почта
        </label>
        <ErrorMessage name="delivery" class="error" />
      </div>

      <div>
        <h4 class="title">Оплата</h4>
        <label>
          <Field type="radio" name="payment" value="offline" class="form-radio" /> При получении
        </label>
        <label>
          <Field type="radio" name="payment" value="online" class="form-radio" /> Предоплата
        </label>
        <ErrorMessage name="payment" class="error" />
      </div>

      <div>
        <label>
          <Field type="checkbox" name="agreement" class="form-checkbox" :value="true" :unchecked-value="false" />
          Согласен с правилами обработки заказов
        </label>
        <ErrorMessage name="agreement" class="error" />
      </div>

      <button type="submit" class="submit">Оформить заказ</button>
    </Form>
  </div>
</template>


<script setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

const form = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    city: "",
    street: "",
    house: "",
    apartment: "",
  },
  delivery: "",
  payment: "",
  agreement: false,
};

const schema = yup.object({
  firstName: yup.string().required("Введите имя"),
  lastName: yup.string().required("Введите фамилию"),
  email: yup.string().email("Введите корректный email").required("Введите email"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Телефон должен содержать только цифры")
    .min(10, "Минимальная длина телефона 10 символов")
    .required("Введите телефон"),
  address: yup.object({
    city: yup.string().required("Введите город"),
    street: yup.string().required("Введите улицу"),
    house: yup.string().required("Введите номер дома"),
    apartment: yup.string().required("Введите номер квартиры"),
  }),
  delivery: yup.string().required("Выберите способ доставки"),
  payment: yup.string().required("Выберите способ оплаты"),
  agreement: yup
    .boolean()
    .oneOf([true], "Вы должны согласиться с правилами обработки заказов")
    .required("Вы должны согласиться"),
});

const onSubmit = async (values) => {
  console.log("Отправка формы:", values);

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      alert("Заказ успешно оформлен!");
    } else {
      alert("Произошла ошибка при отправке заказа.");
    }
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    alert("Произошла ошибка.");
  }
};
</script>

<style>

</style>
