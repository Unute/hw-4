'use client';

// import { NavLink } from "react-router-dom";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import s from "./../../Header.module.scss";
import { useStore } from "@stores/context";
const Profile = observer(() => {
  const { authStore } = useStore();
  return (
    <Link
      href="/register"
      className={`${s.profileLink} ${authStore.user ? s.hasUser : ""}`}
    >
      {
        authStore.user?.username ? (
          <span className={s.username}>{authStore.user.username}</span>
        ) : (
          <img src="/svg/user.svg" alt="Профиль" />
        )
      }
    </Link>
  )
})

export default Profile