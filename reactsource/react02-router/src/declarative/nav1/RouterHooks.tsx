import { useLocation, useSearchParams } from "react-router-dom";

const RouterHooks = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // ? 로 전달되는 파라메터를 가져옴
  // http://localhost:5173/intro/router?mode=list&pageNum=1 이런 형식
  const mode = searchParams.get("mode");
  const pageNum = searchParams.get("pageNum");

  const changeMode = () => {
    const nextMode = mode === "list" ? "view" : "list";
    setSearchParams({
      mode: nextMode,
      pageNum: pageNum ?? "", // pageNum 이 null 이거나 undifined 라면 "" 사용, 아니면 pageNum 사용
    });
  };
  const nextPage = () => {
    const pageTemp =
      pageNum === null || isNaN(Number(pageNum)) ? 1 : parseInt(pageNum) + 1;
    setSearchParams({
      mode: mode ?? "",
      pageNum: pageTemp.toString(),
    });
  };
  const prevPage = () => {
    const pageTemp =
      pageNum === null || isNaN(Number(pageNum)) ? 1 : parseInt(pageNum) - 1;
    setSearchParams({
      mode: mode ?? "",
      pageNum: pageTemp.toString(),
    });
  };

  return (
    <div>
      <h2>라우터 관련 Hook</h2>
      <div>
        <ul>
          <li>URL : {location.pathname}</li>
          <li>쿼리스트링 : {location.search}</li>
          <li>mode : {mode}</li>
          <li>pageNum : {pageNum}</li>
        </ul>
        <button onClick={changeMode}>mode 변경</button>
        <button onClick={prevPage}>이전 Page</button>
        <button onClick={nextPage}>다음 page</button>
      </div>
    </div>
  );
};

export default RouterHooks;
