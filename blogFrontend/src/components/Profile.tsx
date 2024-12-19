interface Props {
  authorData: { id: string; name: string };
  createdAt: Date;
  authColor?: { char: string; color: string };
}

function Profile({ authorData, createdAt, authColor }: Props) {
  return (
    <div className="flex  gap-2 items-center">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center bg-[${authColor?.color}] border-solid border-2 border-gray-100 `}
      >
        <p className="font-bold text-xl text-gray-50">
          {" "}
          {authColor?.char.toUpperCase()}{" "}
        </p>
      </div>
      <div>
        <p className="font-semibold">{authorData.name}</p>
        <p>
          <span className="mr-4">
            {new Date(createdAt).toLocaleDateString()}{" "}
          </span>
          <span>{new Date(createdAt).toLocaleTimeString()}</span>
        </p>
      </div>
    </div>
  );
}

export default Profile;
