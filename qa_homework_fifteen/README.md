# CSS та XPath селектори + Тест-кейси

Для сайту: **[https://practice.expandtesting.com/login](https://practice.expandtesting.com/login)**

---

## 1. CSS-селектори

```css
/* Поле вводу логіну */
input #username

/* Поле вводу пароля */
input #password

/* Вся форма логіну */
#login або class .card-body або #login button[type="submit"]

/* Кнопка Login у формі */
#login button[type="submit"] або id #submit-login

/* Блок повідомлення після логіну */
div #flash withText('You logged into a secure area!') або ('Your username is invalid!') або [role='alert']

/* Заголовок "Secure Area" */
h2

/* Текст привітання на сторінці */
h4

/* Повідомлення про успішний логін */
div#flash-message

/* Кнопка (посилання) Logout на захищеній сторінці */
a[href="/logout"]
```
---

## 2. XPath-селектори

```xpath
//input[@id='username']                          → поле логіну
//input[@id='password']                          → поле пароля
//*[@id='login']                                 → контейнер форми
//*[@id='login']//button[@type='submit']         → кнопка Login
//div[@id='flash-message']                       → повідомлення
//div[@id='flash-message' and contains(., 'You logged into a secure area!')]
                                                 → успішний логін
//h2[contains(text(), 'Secure Area')]                         
//h4[contains(text(), 'Welcome to the Secure Area')]
//a[@href='/logout']                             → кнопка Logout
                                                 → успішний логін   
//div[@id='flash-message' and contains(., 'Invalid password.')]
                                                 → неправильний пароль
//div[@id='flash-message' and contains(., 'Invalid username.')]
                                                 → неправильний логін
```
---

# 3. Тест-кейси з CSS селекторами

---

## **Тест-кейс 1 (CSS): Успішний логін з валідними даними**

**Кроки:**

1. Відкрити сторінку: [https://practice.expandtesting.com/login](https://practice.expandtesting.com/login)
2. Знайти `input#username` → ввести **"practice"**
3. Знайти `input#password` → ввести **"SuperSecretPassword!"**
4. Клікнути `#login button[type="submit"]`
5. Очікування:

   * відкривається сторінка `/secure`
   * відображається `div#flash-message` з текстом **"You logged into a secure area!"**

---

## **Тест-кейс 2 (CSS): Логін з порожніми полями**

**Кроки:**

1. Відкрити сторінку
2. Поле `input#username` → залишити порожнім
3. Поле `input#password` → залишити порожнім
4. Клікнути `#login button[type="submit"]`
5. Очікування:

   * користувач залишається на `/login`
   * з’являється `div#flash-message` з текстом про помилку

---

# 4. Тест-кейси з XPath селекторами

## **Тест-кейс 3 (XPath): Перевірка доступу до захищеної сторінки після логіну**

**Кроки:**

1. Виконати успішний логін і перейти на сторінку `https://practice.expandtesting.com/secure`.
2. Знайти заголовок сторінки:

   ```xpath
   //h2[contains(text(), 'Secure Area')]
   ```

   Перевірити, що елемент відображається.
3. Знайти текст привітання:

   ```xpath
   //h4[contains(text(), 'Welcome to the Secure Area')]
   ```

   Перевірити, що елемент відображається.
4. Знайти повідомлення про успішний логін:

   ```xpath
   //div[@id='flash-message' and contains(., 'You logged into a secure area!')]
   ```

   Перевірити, що повідомлення присутнє.

Очікування: користувач бачить заголовок, привітання та повідомлення про успішний вхід на сторінці `/secure`.

---

## **Тест-кейс 4 (XPath): Логаут із захищеної сторінки**

**Кроки:**

1. Перебувати на сторінці `https://practice.expandtesting.com/secure`.
2. Знайти кнопку Logout:

   ```xpath
   //a[@href='/logout']
   ```

   Натиснути на неї.
3. Очікувати перенаправлення на сторінку логіну `https://practice.expandtesting.com/login`.
4. Перевірити повідомлення про вихід:

   ```xpath
   //div[@id='flash-message' and contains(., 'You logged out of the secure area!')]
   ```

   Переконатися, що текст відображається.

Очікування: користувач повертається на сторінку логіну та бачить повідомлення про успішний вихід.
