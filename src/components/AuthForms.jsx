import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import Container from "./Container";

const emailPattern =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function AuthForms() {
  const { login, registerUser } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [registerStatus, setRegisterStatus] = useState(null);

  const {
    register: registerLoginField,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginPending },
    reset: resetLoginForm,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    register: registerSignUpField,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterPending },
    getValues,
    reset: resetRegisterForm,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const loginSubmit = useCallback(
    (values) => {
      const result = login(values);

      if (!result.success) {
        setLoginError(result.message || "Ошибка авторизации");
        return;
      }

      setLoginError("");
      resetLoginForm();
    },
    [login, resetLoginForm]
  );

  const registerSubmit = useCallback(
    (values) => {
      const { confirmPassword, ...payload } = values;
      const result = registerUser(payload);

      if (!result.success) {
        setRegisterStatus({
          type: "error",
          text: result.message || "Ошибка регистрации",
        });
        return;
      }

      setRegisterStatus({
        type: "success",
        text: "Регистрация выполнена, вы уже авторизованы",
      });
      resetRegisterForm();
    },
    [registerUser, resetRegisterForm]
  );

  const registerPasswordValidation = useMemo(
    () => ({
      required: "Пароль обязателен",
      minLength: {
        value: 6,
        message: "Минимум 6 символов",
      },
    }),
    []
  );

  return (
    <Container>
      <div className="p-4">
        <h2 className="mb-4 text-center">Добро пожаловать</h2>
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="border rounded p-4 h-100">
              <h4 className="mb-3">Авторизация</h4>
              <form
                onSubmit={handleLoginSubmit(loginSubmit)}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      loginErrors.email ? "is-invalid" : ""
                    }`}
                    {...registerLoginField("email", {
                      required: "Email обязателен",
                      pattern: {
                        value: emailPattern,
                        message: "Некорректный email",
                      },
                    })}
                  />
                  {loginErrors.email && (
                    <div className="invalid-feedback">
                      {loginErrors.email.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Пароль</label>
                  <input
                    type="password"
                    className={`form-control ${
                      loginErrors.password ? "is-invalid" : ""
                    }`}
                    {...registerLoginField("password", registerPasswordValidation)}
                  />
                  {loginErrors.password && (
                    <div className="invalid-feedback">
                      {loginErrors.password.message}
                    </div>
                  )}
                </div>

                {loginError && (
                  <div className="alert alert-danger py-2">{loginError}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoginPending}
                >
                  {isLoginPending ? "Входим..." : "Войти"}
                </button>
              </form>

              <p className="mt-3 text-muted small mb-0">
                Демо-доступ: admin@example.com / admin123
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="border rounded p-4 h-100">
              <h4 className="mb-3">Регистрация</h4>
              <form
                onSubmit={handleRegisterSubmit(registerSubmit)}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label className="form-label">Имя</label>
                  <input
                    type="text"
                    className={`form-control ${
                      registerErrors.name ? "is-invalid" : ""
                    }`}
                    {...registerSignUpField("name", {
                      required: "Имя обязательно",
                      minLength: {
                        value: 2,
                        message: "Минимум 2 символа",
                      },
                    })}
                  />
                  {registerErrors.name && (
                    <div className="invalid-feedback">
                      {registerErrors.name.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      registerErrors.email ? "is-invalid" : ""
                    }`}
                    {...registerSignUpField("email", {
                      required: "Email обязателен",
                      pattern: {
                        value: emailPattern,
                        message: "Некорректный email",
                      },
                    })}
                  />
                  {registerErrors.email && (
                    <div className="invalid-feedback">
                      {registerErrors.email.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Пароль</label>
                  <input
                    type="password"
                    className={`form-control ${
                      registerErrors.password ? "is-invalid" : ""
                    }`}
                    {...registerSignUpField("password", registerPasswordValidation)}
                  />
                  {registerErrors.password && (
                    <div className="invalid-feedback">
                      {registerErrors.password.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label">Повторите пароль</label>
                  <input
                    type="password"
                    className={`form-control ${
                      registerErrors.confirmPassword ? "is-invalid" : ""
                    }`}
                    {...registerSignUpField("confirmPassword", {
                      required: "Повторите пароль",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Пароли должны совпадать",
                    })}
                  />
                  {registerErrors.confirmPassword && (
                    <div className="invalid-feedback">
                      {registerErrors.confirmPassword.message}
                    </div>
                  )}
                </div>

                {registerStatus && (
                  <div
                    className={`alert py-2 ${
                      registerStatus.type === "success"
                        ? "alert-success"
                        : "alert-warning"
                    }`}
                  >
                    {registerStatus.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-outline-success"
                  disabled={isRegisterPending}
                >
                  {isRegisterPending ? "Отправляем..." : "Зарегистрироваться"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

