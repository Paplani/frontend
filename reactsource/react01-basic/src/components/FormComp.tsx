const FormComp = () => {
  return (
    <form action="">
      <select name="gubun">
        <option value="front">프론트엔드</option>
        <option value="back">백엔드</option>
      </select>
      <input type="text" name="title" />
      <input type="submit" value="추가" />
    </form>
  );
};

export default FormComp;
