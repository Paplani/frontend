type Button = {
  onClick: () => void;
  children: string;
};

type PlayButtonProps = { movieName: string };

const Button3 = ({ onClick, children }: Button) => {
  return (
    <div>
      <button className="p-4 bg-amber-400 m-2" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

const PlayButton = ({ movieName }: PlayButtonProps) => {
  return (
    <div>
      <Button3 onClick={() => alert(`Playing ${movieName}`)}>Play</Button3>
    </div>
  );
};

const UploadButton = () => {
  return (
    <div>
      <Button3 onClick={() => alert("Uploading!")}>Upload Image</Button3>
    </div>
  );
};

const Toolbar = () => {
  return (
    <div>
      <PlayButton movieName={"SpiderMan"} />
      <UploadButton />
    </div>
  );
};

export default Toolbar;
