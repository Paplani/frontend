async function load(targetDate) {
  const response = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=7c3573ffeda9c585881c4a045c0b54c9&targetDt=${targetDate}`,
  );

  const data = await response.json();
  const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;

  let result = "";
  dailyBoxOfficeList.forEach((item) => {
    result += `<li>${item.rank}등 : ${item.movieNm}</li>`;
  });
  document.querySelector(".resultDate").innerHTML = result;
}

const form = document.querySelector("#search");
const input = form.querySelector("#targetDate");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   input의 값은 yyyy-mm-dd 형식임. 파라미터로는 yyyymmdd 형태로 줘야함
  // 따라서 .rjeplaceAll("-", "") 사용해서 - 제거함.
  const date = input.value.replaceAll("-", "");
  load(date);
});
