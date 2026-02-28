import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useStore } from "@/stores/context";
import { useRef } from "react";
import { RegisterStore } from "./store/RegisterStore";
import { observer } from "mobx-react-lite";


const Register = observer(() => {
  const formStore = useRef(new RegisterStore()).current
  const { authStore } = useStore();


  return (
    <div>
      {formStore.LoginMode &&
        <Input
          placeholder="username"
          value={formStore.username}
          onChange={(e) => formStore.setUsername(e)}
        />
      }
      <Input
        placeholder="email"
        value={formStore.email}
        onChange={(e) => formStore.setEmail(e)}
      />
      <Input
        placeholder="password"
        type="password"
        value={formStore.password}
        onChange={(e) => formStore.setPassword(e)}
      />

      <Button onClick={() => authStore.login(formStore.email, formStore.password)}>
        Войти
      </Button>



      <div onClick={() => {
        formStore.setLoginMode(!formStore.LoginMode);
      }}>
        <span>
          {formStore.LoginMode ?
            "Войти" :
            "Зарегистрироваться"
          }
        </span>
      </div>
    </div>
  )
});

export default Register