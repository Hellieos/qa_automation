Feature: Логін на сторінці Practice Expand Testing

  Background:
    Given я відкриваю сторінку логіну

  Scenario: Успішний логін з валідними даними
    When я вводжу коректний логін і пароль
    And я натискаю кнопку "Login"
    Then я бачу повідомлення "You logged into a secure area!"
    And URL містить "/secure"

  Scenario: Логін з невалідним логіном
    When я вводжу невалідний логін і валідний пароль
    And я натискаю кнопку "Login"
    Then я бачу повідомлення "Your username is invalid!"
    And URL містить "/login"

  Scenario: Логін з порожніми полями
    When я не заповнюю поля логіну і пароля
    And я натискаю кнопку "Login"
    Then я бачу повідомлення "Your username is invalid!"
    And URL містить "/login"

  Scenario: Логаут із захищеної сторінки
    Given я зайшла у систему з валідними обліковими даними
    When я натискаю кнопку "Logout"
    Then я бачу повідомлення "You logged out of the secure area!"
    And URL містить "/login"
