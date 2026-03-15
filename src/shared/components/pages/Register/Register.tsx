'use client'

import { useStore } from "@stores/context";
import { observer } from "mobx-react-lite";
import s from "./Register.module.scss";
import FormAuth from "./components/FormAuth";
import Button from "@UI/Button";
import Text from "@UI/Text";


const Register = observer(() => {

  const { authStore, purchaseStore } = useStore();


  return (
    <div className={s.container}>
      {authStore.isAuthenticated ? (
        <div className={s.loggedIn}>
          <div className={s.userInfo}>
            <Text view="p-20" weight="bold">{authStore.user?.username}</Text>
            <Text view="p-14" color="secondary">{authStore.user?.email}</Text>
          </div>
          <div className={s.stats}>
            <div className={s.stat}>
              <Text view="p-20" weight="bold">{purchaseStore.totalItems}</Text>
              <Text view="p-14" color="secondary">items purchased</Text>
            </div>
            <div className={s.stat}>
              <Text view="p-20" weight="bold">${purchaseStore.totalSpent}</Text>
              <Text view="p-14" color="secondary">total spent</Text>
            </div>
          </div>
          <Button onClick={() => authStore.logout()}>LogOut</Button>
        </div>
      ) : (
        <FormAuth />
      )}
    </div>
  )
});

export default Register