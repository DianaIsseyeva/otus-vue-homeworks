<template>
  <form @submit.prevent="handleSubmit" class="form">
    <!-- Раздел данных покупателя и адреса -->
    <div class="form-section">
      <!-- Данные покупателя -->
      <div class="form-group">
        <h4 class="section-title">Данные покупателя</h4>

        <!-- Имя -->
        <div class="input-group">
          <label for="firstName">Имя:</label>
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            @input="clearError('firstName')"
            placeholder="Введите имя"
            class="form-input"
          />
          <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
        </div>

        <!-- Фамилия -->
        <div class="input-group">
          <label for="lastName">Фамилия:</label>
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            @input="clearError('lastName')"
            placeholder="Введите фамилию"
            class="form-input"
          />
          <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
        </div>

        <!-- Email -->
        <div class="input-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            @input="clearError('email')"
            placeholder="Введите email"
            class="form-input"
          />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>

        <!-- Мобильный номер -->
        <div class="input-group">
          <label for="phone">Мобильный номер:</label>
          <input
            type="text"
            id="phone"
            v-model="form.phone"
            @input="clearError('phone')"
            placeholder="Введите номер телефона"
            class="form-input"
          />
          <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Адрес -->
      <div class="form-group">
        <h4 class="section-title">Адрес</h4>

        <!-- Город -->
        <div class="input-group">
          <label for="city">Город:</label>
          <input
            type="text"
            id="city"
            v-model="form.address.city"
            @input="clearNestedError('address', 'city')"
            placeholder="Введите город"
            class="form-input"
          />
          <span v-if="errors.address.city" class="error">{{ errors.address.city }}</span>
        </div>

        <!-- Улица -->
        <div class="input-group">
          <label for="street">Улица:</label>
          <input
            type="text"
            id="street"
            v-model="form.address.street"
            @input="clearNestedError('address', 'street')"
            placeholder="Введите улицу"
            class="form-input"
          />
          <span v-if="errors.address.street" class="error">{{ errors.address.street }}</span>
        </div>

        <!-- Дом -->
        <div class="input-group">
          <label for="house">Дом:</label>
          <input
            type="text"
            id="house"
            v-model="form.address.house"
            @input="clearNestedError('address', 'house')"
            placeholder="Введите номер дома"
            class="form-input"
          />
          <span v-if="errors.address.house" class="error">{{ errors.address.house }}</span>
        </div>

        <!-- Квартира -->
        <div class="input-group">
          <label for="apartment">Квартира:</label>
          <input
            type="text"
            id="apartment"
            v-model="form.address.apartment"
            @input="clearNestedError('address', 'apartment')"
            placeholder="Введите номер квартиры"
            class="form-input"
          />
          <span v-if="errors.address.apartment" class="error">{{ errors.address.apartment }}</span>
        </div>
      </div>
    </div>

    <!-- Раздел доставки и оплаты -->
    <div class="form-section">
      <!-- Доставка -->
      <div class="form-group">
        <h4 class="section-title">Доставка</h4>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              v-model="form.delivery"
              @change="clearError('delivery')"
              class="form-radio"
            />
            Самовывоз
          </label>
          <label class="radio-label">
            <input
              type="radio"
              name="delivery"
              value="courier"
              v-model="form.delivery"
              @change="clearError('delivery')"
              class="form-radio"
            />
            Курьер
          </label>
          <label class="radio-label">
            <input
              type="radio"
              name="delivery"
              value="post"
              v-model="form.delivery"
              @change="clearError('delivery')"
              class="form-radio"
            />
            Почта
          </label>
        </div>
        <span v-if="errors.delivery" class="error">{{ errors.delivery }}</span>
      </div>

      <!-- Оплата -->
      <div class="form-group">
        <h4 class="section-title">Оплата</h4>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              name="payment"
              value="offline"
              v-model="form.payment"
              @change="handlePaymentChange"
              class="form-radio"
            />
            При получении
          </label>
          <label class="radio-label">
            <input
              type="radio"
              name="payment"
              value="online"
              v-model="form.payment"
              @change="handlePaymentChange"
              class="form-radio"
            />
            Предоплата
          </label>
        </div>
        <span v-if="errors.payment" class="error">{{ errors.payment }}</span>
      </div>

      <!-- Согласие с правилами -->
      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.agreement"
            @change="clearError('agreement')"
            class="form-checkbox"
          />
          Согласен с правилами обработки заказов
        </label>
        <span v-if="errors.agreement" class="error">{{ errors.agreement }}</span>
      </div>
    </div>

    <!-- Платежные поля, отображаются только при выборе "Предоплата" -->
    <div class="form-section" v-if="form.payment === 'online'">
      <h4 class="section-title">Данные карты</h4>

      <!-- Имя на карте -->
      <div class="input-group">
        <label for="cardHolder">Имя на карте:</label>
        <input
          type="text"
          id="cardHolder"
          v-model="form.cardHolder"
          @input="clearError('cardHolder')"
          placeholder="Введите имя владельца"
          class="form-input"
        />
        <span v-if="errors.cardHolder" class="error">{{ errors.cardHolder }}</span>
      </div>

      <!-- Номер карты -->
      <div class="input-group">
        <label for="cardNumber">Номер карты:</label>
        <input
          type="text"
          id="cardNumber"
          v-model="form.cardNumber"
          @input="clearError('cardNumber')"
          placeholder="Введите номер карты"
          class="form-input"
        />
        <span v-if="errors.cardNumber" class="error">{{ errors.cardNumber }}</span>
      </div>

      <!-- Дата окончания -->
      <div class="input-group">
        <label for="expiryDate">Дата окончания (MM/YY):</label>
        <input
          type="text"
          id="expiryDate"
          v-model="form.expiryDate"
          @input="clearError('expiryDate')"
          placeholder="Введите дату окончания"
          class="form-input"
        />
        <span v-if="errors.expiryDate" class="error">{{ errors.expiryDate }}</span>
      </div>

      <!-- CVC/CVV -->
      <div class="input-group">
        <label for="cvc">CVC/CVV:</label>
        <input
          type="password"
          id="cvc"
          v-model="form.cvc"
          @input="clearError('cvc')"
          placeholder="Введите CVC"
          class="form-input"
        />
        <span v-if="errors.cvc" class="error">{{ errors.cvc }}</span>
      </div>
    </div>

    <!-- Кнопка отправки -->
    <button type="submit" class="submit">Оформить заказ</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import * as yup from 'yup';

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    city: '',
    street: '',
    house: '',
    apartment: '',
  },
  delivery: '',
  payment: '',
  agreement: false,
  cardHolder: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
});

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: {
    city: '',
    street: '',
    house: '',
    apartment: '',
  },
  delivery: '',
  payment: '',
  agreement: '',
  cardHolder: '',
  cardNumber: '',
  expiryDate: '',
  cvc: '',
});

const schema = yup.object().shape({
  firstName: yup.string().required('Введите имя'),
  lastName: yup.string().required('Введите фамилию'),
  email: yup.string().email('Введите корректный email').required('Введите email'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'Телефон должен содержать только цифры')
    .min(10, 'Минимальная длина телефона 10 символов')
    .required('Введите телефон'),
  address: yup.object().shape({
    city: yup.string().required('Введите город'),
    street: yup.string().required('Введите улицу'),
    house: yup.string().required('Введите номер дома'),
    apartment: yup.string().required('Введите номер квартиры'),
  }),
  delivery: yup.string().required('Выберите способ доставки'),
  payment: yup.string().required('Выберите способ оплаты'),
  agreement: yup
    .boolean()
    .oneOf([true], 'Вы должны согласиться с правилами обработки заказов')
    .required('Вы должны согласиться'),
  cardHolder: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, 'Имя может содержать только буквы и пробелы')
    .test(
      'cardHolder',
      'Введите имя владельца карты',
      function (value) {
        const { payment } = this.parent;
        if (payment === 'online') {
          return value && value.trim() !== '';
        }
        return true; // Не требуется, если оплата не онлайн
      }
    ),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, 'Номер карты должен содержать 16 цифр')
    .test(
      'cardNumber',
      'Введите номер карты',
      function (value) {
        const { payment } = this.parent;
        if (payment === 'online') {
          return value && value.trim() !== '';
        }
        return true;
      }
    ),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Введите дату в формате MM/YY')
    .test(
      'expiryDate',
      'Карта просрочена',
      function (value) {
        const { payment } = this.parent;
        if (payment !== 'online') return true; // Не требуется, если оплата не онлайн
        if (!value) return false;
        const [month, year] = value.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        return year > currentYear || (year === currentYear && month >= currentMonth);
      }
    )
    .test(
      'expiryDateRequired',
      'Введите дату окончания',
      function (value) {
        const { payment } = this.parent;
        if (payment === 'online') {
          return value && value.trim() !== '';
        }
        return true;
      }
    ),
  cvc: yup
    .string()
    .matches(/^[0-9]{3}$/, 'CVC должен содержать ровно 3 цифры')
    .test(
      'cvc',
      'Введите CVC',
      function (value) {
        const { payment } = this.parent;
        if (payment === 'online') {
          return value && value.trim() !== '';
        }
        return true;
      }
    ),
});

// Функция для очистки ошибок
const clearError = (field) => {
  errors[field] = '';
};

// Функция для очистки ошибок во вложенных объектах
const clearNestedError = (parent, field) => {
  errors[parent][field] = '';
};

const handleSubmit = async () => {
  // Очистка всех ошибок перед валидацией
  Object.keys(errors).forEach((key) => {
    if (typeof errors[key] === 'object') {
      Object.keys(errors[key]).forEach((subKey) => {
        errors[key][subKey] = '';
      });
    } else {
      errors[key] = '';
    }
  });

  try {
    await schema.validate(form, { abortEarly: false });

    if (form.payment === 'online') {
      console.log('Данные карты:', {
        cardHolder: form.cardHolder,
        cardNumber: form.cardNumber,
        expiryDate: form.expiryDate,
        cvc: form.cvc,
      });
      alert('Оплата успешно проведена!');
    }

    console.log('Данные заказа:', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      delivery: form.delivery,
      payment: form.payment,
      agreement: form.agreement,
    });
    alert('Заказ успешно оформлен!');


    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        city: '',
        street: '',
        house: '',
        apartment: '',
      },
      delivery: '',
      payment: '',
      agreement: false,
      cardHolder: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    });
  } catch (validationErrors) {
    if (validationErrors.inner) {
      validationErrors.inner.forEach((error) => {
        if (error.path.includes('.')) {
          const paths = error.path.split('.');
          if (paths.length === 2) {
            errors[paths[0]][paths[1]] = error.message;
          }
        } else {
          errors[error.path] = error.message;
        }
      });
    }
  }
};

const handlePaymentChange = () => {
  if (form.payment !== 'online') {
    form.cardHolder = '';
    form.cardNumber = '';
    form.expiryDate = '';
    form.cvc = '';

    errors.cardHolder = '';
    errors.cardNumber = '';
    errors.expiryDate = '';
    errors.cvc = '';
  }
};
</script>

<style scoped>
.form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  flex: 1;
  min-width: 280px;
}

.section-title {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #333333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555555;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #646cff;
  outline: none;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #555555;
}

.form-radio {
  width: 20px;
  height: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #555555;
}

.form-checkbox {
  width: 18px;
  height: 18px;
}

.submit {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.error {
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .form-section {
    flex-direction: column;
  }

  .form-group {
    min-width: 100%;
  }
}
</style>
