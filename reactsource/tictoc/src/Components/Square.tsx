type SquareProp = {
  value: "X" | "O" | null;
  handleClick: () => void;
};

const Square = ({ value, handleClick }: SquareProp) => {
  //   const [input, setInput] = useState("");

  //   const handleClick = () => setInput("X");
  return (
    <div>
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    </div>
  );
};

export default Square;
