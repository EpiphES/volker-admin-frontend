# Фронтенд админки для проекта Volker
## О проекте

Volker - это лайфстайл-приложение для современных горожан: в нем есть карта, которая в разных режимах показывает, где можно бесплатно набрать воды или сдать вторсырье, помогает найти места выгула собак и пет френдли заведения, а также узнать, где проходят интересные городские события.

Точки (интересные места) на карте города - это "маркеры". Информация о маркере включает в себя фотографии, название, координаты, город нахождения, режим отображения и различные дополнительные параметры (адрес, часы работы, ссылки на соцсети и т.д.).

Для удобства отображения маркеров на карте имеются режимы. Каждый маркер относится к определенному режиму. Например, режим 'Переработка' - объединяет точки, где можно сдать вторсырье, режим 'Активная зима' - места, где можно заняться зимними видами спорта и развлечениями. Внутри режимов есть типы, например, в режиме 'Переработка' есть такие типы, как 'бумага', 'стекло', 'пластик' и т.д. Один маркер может относиться к нескольким типам, например, если в пункте приема можно сдать бумагу и пластик, то такая точка будет иметь, соотвественно, типы 'бумага', 'пластик'.
Информация о режиме включает в себя название, иконку-изображение и список типов.
Информация о типе содержит название, иконку и цвет отображения на карте. 

В приложении имеется постоянно пополняющийся список городов. Информация о городе включает в себя название, координаты, описание и список режимов. 

Также в приложении есть истории (сторисы) - это группы слайдов, посвященные определенной теме.

## Функционал админки

* Страница входа в приложение (форма для ввода логина и пароля)

* Главная страница с формой для отправки Push-уведомлений

* Боковая панель профиля с данными о пользователе, с функцией выбора текущего города, кнопками создания, редактирования и удаления города и кнопкой выхода из аккаунта

* Страница с формой для создания нового города

* Страница с формой редактирования города

* Страница со списком режимов. Все имеющиеся в базе режимы представлены в виде карточек с иконкой и названием режима. При нажатии на карточку - переход на страницу редактирования режима. Есть кнопка для создания нового режима.

* Страница с формой создания нового режима.

* Страница с формой редактирования режима. Содержит, кроме всего прочего, список типов в виде галереи карточек. На корточке типа отображено его название, цвет на карте (в виде цветной полоски) и есть кнопка для редактирования/удаления. В галерее типов есть кнопка для создания нового типа. Формы создания и редактирования типов появляются в модальных окнах. На странице редактирования режима есть кнопка для удаления режима.

* Страница маркеров - отображает список маркеров текущего города в виде галереи карточек. Корточка маркера содержит фото, название, адрес и список типов к которым относится маркер. На странице есть кнопка для создания нового маркера. При нажатии на карточку маркера - переход на страницу редактирования маркера.

* На странице маркеров реализована функция поиска по названию с фильтрацией (по публикации, режиму и типу).

* Страница с формой создания нового маркера.

* Страница с формой редактирования маркера. Содержит также кнопку удаления маркера.

* Страница историй. Содержит список историй, привязанных к выбранному городу, сгруппированных в виде отдельных блоков. Блоки историй можно создавать, редактировать и удалять, соответствующие формы появляются в модальных окнах. При нажатии на карточку истории происходит переход на страницу редактирования. Есть кнопки для создания новых историй в блоках.

* Страница создания истории.

* Страница редактирования истории. Содержит, кроме всего прочего, галерею слайдов в виде карусели. Слайд содержит изображение, заголовок и кнопку для редактирования/удаления. Есть кнопка для создания нового слайда. Формы создания и редактирования слайдов появляются в модальных окнах.

* Удаление объектов происходит после подтверждения действия во всплывающем модальном окне. 

* Имеются всплывающие сообщения, информирующие пользователя об удачных операциях (при создании, редактировании и удалении объектов) и о возникших ошибках.

* Реализована компрессия изображений при отправке на сервер с помощью библиотеки Browser Image Compression

## Стек: 

* JavaScript, HTML, CSS
* React.js
* Redux, Redux Toolkit
* React Bootstrap
* React Router v.6
* Formik
* Browser Image Compression

## Инструкция по установке приложения:

  git clone https://github.com/EpiphES/volker-admin-frontend

  npm ci

  npm start

