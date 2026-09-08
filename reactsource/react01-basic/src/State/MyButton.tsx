type MyButtonProps = {
  style: React.CSSProperties;
  onClick: () => void;
  count: number;
};

const MyButton = ({ style, onClick, count }: MyButtonProps) => {
  //   const [count, setCount] = useState(0);

  return (
    <div>
      <button style={style} onClick={onClick}>
        Clicked {count} times
      </button>
    </div>
  );
};

export default MyButton;
