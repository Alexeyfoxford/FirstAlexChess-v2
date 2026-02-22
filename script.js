const move = () => {
    // Обработка видимости пароля
    togglePasswordTwo(document.getElementById('togglePassword'), document.getElementById('password'))
    togglePasswordTwo(document.getElementById('toggleRegPassword'), document.getElementById('regPassword'))
    
    function togglePasswordTwo(togglePassword, password) {
        if (togglePassword && password)
        togglePassword.addEventListener('click', togglePasswordClick)
        else return;

        let indexPass = 0;
        function togglePasswordClick() {
            indexPass++;
            if (indexPass===1) password.type = 'text';
            else if (indexPass===2) {
                password.type = 'password';
                indexPass = 0
            }
        }
    }

    // Переключение окон авторизации и регистрации при клике на ссылки
    reg(
        document.getElementById('switchToRegister'), 
        document.getElementById('authForm'), 
        document.getElementById('registerForm')
    )
    login(
        document.getElementById('switchToLogin'), 
        document.getElementById('authForm'), 
        document.getElementById('registerForm')
    )

    function reg(switchToRegister, authForm, registerForm) {
        if (switchToRegister && authForm && registerForm)
        switchToRegister.addEventListener('click', switchToRegisterClick)
        function switchToRegisterClick() {
            registerForm.style.display = 'block'
            authForm.style.display = 'none'
        }
    }
    function login(switchToLogin, authForm, registerForm) {
        if (switchToLogin && authForm && registerForm)
        switchToLogin.addEventListener('click', switchToLoginClick)
        function switchToLoginClick() {
            registerForm.style.display = 'none'
            authForm.style.display = 'block'
        }
    }

    //Регистрация в форме 
    const registerBtn = document.getElementById('registerBtn')
    if (registerBtn) registerBtn.addEventListener('click', registerBtnClick)
    
    function registerBtnClick(e) {
        e.preventDefault()
        const regUsername = document.getElementById('regUsername')
        const regPassword = document.getElementById('regPassword')
        const confirmPassword = document.getElementById('confirmPassword')
        
        if (regUsername.value == '') {
            alert('Вы не можете оставлять пустое поле Имя при регистрации')
            return
        }

        if (regPassword.value.length < 6) {
            alert('При регистрации пользователь не может вводить пароль менее 6 символов')
            return
        }

        if (regPassword.value !== confirmPassword.value) {
            alert('Пароль и подтверждение пароля не совпадают')
            return
        }

        const dataReg = {
            name: regUsername.value, 
            pass: regPassword.value
        }

        localStorage.setItem('reg', JSON.stringify(dataReg))

        // Сохраняем на сервер в txt файл
        saveToServer(regUsername.value, regPassword.value)

        const localReg = localStorage.getItem('reg')
        if (localReg) {
            alert('Вы успешно зарегистрировались')
            document.getElementById('registerForm').style.display = 'none'
            document.getElementById('authForm').style.display = 'block'
            window.location.href = "site.html";
        }
        return
    }

    // Функция для сохранения данных на сервер
    function saveToServer(username, password) {
        // Создаем FormData для отправки
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        
        // Отправляем на сервер
        fetch('save_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Данные сохранены на сервере')
            }
        })
        .catch(error => {
            console.error('Ошибка при сохранении:', error)
        })
    }

    //Авторизация в форме 
    const loginBtn = document.getElementById('loginBtn')
    if (loginBtn) loginBtn.addEventListener('click', loginBtnClick)
    
    function loginBtnClick(e) {
        e.preventDefault()
        
        const username = document.getElementById('username')
        const password = document.getElementById('password')

        if (username.value == '') {
            alert('Вы не можете оставлять пустое поле Имя при авторизации')
            return
        }
        if (password.value.length < 6) {
            alert('При авторизации пользователь не может вводить пароль менее 6 символов')
            return
        }
        const localReg = localStorage.getItem('reg')
        if (localReg) {
            const local = JSON.parse(localReg)
            if (local.name !== username.value) {      
                username.value = ''         
                alert('Имя пользователя не совпадает')
                return
            }
            if (local.pass !== password.value) {
               alert('Пароль не совпадает')
                return 
            } else {
                alert("Вы авторизовались,добро пожаловать на сайт!")
                window.location.href = "site.html";
               
            }

        }
        else {
            alert('Вы не зарегистрированы')
             document.getElementById('authForm').style.display = 'none'
             document.getElementById('registerForm').style.display = 'block'
        }

    }

    // проверка авторизации пользователя
    if (localStorage.getItem('autorization') == 'true') {
        document.getElementById('registerForm').style.display = 'none'
        document.getElementById('authForm').style.display = 'none'
        document.getElementById('userInfo').style.display = 'block'
    }

    //выход из авторизации
    const logoutBtn = document.getElementById('logoutBtn')
    if (logoutBtn) logoutBtn.addEventListener('click', logoutBtnClick)
    
    function logoutBtnClick(e) {
        e.preventDefault()
        localStorage.clear()
        location.reload()
    }
}

document.addEventListener('DOMContentLoaded', move);