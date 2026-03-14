'use client'

import { useStore } from "@stores/context";
import { observer } from "mobx-react-lite";
import s from "./Register.module.scss";
import FormAuth from "./components/FormAuth";
import Button from "@UI/Button";


const Register = observer(() => {

  const { authStore } = useStore();


  return (
    <div className={s.container}>
      {authStore.isAuthenticated ? (
        <div className={s.loggedIn}>
          <h2>Profile: {authStore.user?.username}</h2>
          <Button onClick={() => authStore.logout()}>LogOut</Button>
        </div>
      ) : (
        <FormAuth />
      )}
    </div>
  )
});

export default Register