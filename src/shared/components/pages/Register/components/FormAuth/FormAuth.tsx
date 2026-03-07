'use client'

import Button from "@UI/Button";
import Input from "@UI/Input";
import s from "./FormAuth.module.scss";
import { useStore } from "@stores/context";
import { observer } from "mobx-react-lite";
import { RegisterStore } from "./../../store/RegisterStore";
import { useLocalObservable } from "mobx-react-lite";

const FormAuth = observer(() => {
  const { authStore } = useStore();
  const formStore = useLocalObservable(() => new RegisterStore())
  return (
    <>
      <div className={s.form}>
        {formStore.isRegister &&
          <Input
            className={s.input}
            placeholder="username"
            value={formStore.username}
            onChange={(e) => formStore.setUsername(e)}
          />
        }
        <Input
          className={s.input}
          placeholder="email"
          value={formStore.email}
          onChange={(e) => formStore.setEmail(e)}
        />
        <Input
          className={s.input}
          placeholder="password"
          type="password"
          value={formStore.password}
          onChange={(e) => formStore.setPassword(e)}
        />

        <Button className={s.button} onClick={() => {
          if (formStore.isRegister) {
            authStore.register(formStore.username, formStore.email, formStore.password);
          } else {
            authStore.login(formStore.email, formStore.password);
          }
        }}>
          {formStore.isRegister ?
            'Register' :
            'Log in'
          }
        </Button>
        {authStore.error && <div className={s.error}>{authStore.error}</div>}
      </div>

      <div className={s.toggle} onClick={() => {
        formStore.setIsRegister(!formStore.isRegister);
      }}>
        <span>
          {formStore.isRegister ?
            "Login" :
            "Register"
          }
        </span>
      </div>
    </>
  )
})

export default FormAuth