'use client';

import Link from "next/link";
import s from "./Profile.module.scss";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { useStore } from "@stores/context";

type ProfileProps = {
  showLabel?: boolean;
  onClose?: () => void;
};

const Profile = observer(({ showLabel, onClose }: ProfileProps) => {
  const { authStore } = useStore();
  const pathname = usePathname();
  const isActive = pathname === "/register";
  return (
    <Link
      href="/register"
      className={`${s.profileLink} ${isActive ? s.active : ""} ${authStore.user ? s.hasUser : ""} ${showLabel ? s.withLabel : ""}`}
      onClick={onClose}
    >
      {
        authStore.user?.username ? (
          <span className={s.username}>{authStore.user.username}</span>
        ) : (
          <>
            <img src="/svg/user.svg" alt="Профиль" />
            {showLabel && <span className={s.label}>Профиль</span>}
          </>
        )
      }
    </Link>
  )
})

export default Profile