import { useState } from "react";
import { User } from "../types";
import { faker } from "@faker-js/faker";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const { username, email, avatar } = user;
  const imgUser = avatar ?? faker.image.avatar();
  const [imageError, setimageError] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="h-20 w-20 flex-shrink-0 bg-slate-700 rounded-full overflow-hidden">
        {imageError ? (
          <div className="flex w-full h-full justify-center items-center">
            <h3>{username?.charAt(0).toLocaleUpperCase()}</h3>
          </div>
        ) : (
          <LazyLoadImage
            src={imgUser}
            alt={username}
            onError={() => setimageError(true)}
            className="w-full h-full object-cover pointer-events-none "
            effect="blur"
            height="100%"
            width="100%"
          />
        )}
      </div>
      <div className="truncate flex flex-col items-center justify-center flex-1 p-1 mt-2">
        <h5>{username ? "@" + username : "Missing Username"}</h5>
        <p className="truncate text-sm text-gray-400 mt-1">{email || "Missing Email"}</p>
      </div>
    </div>
  );
}
