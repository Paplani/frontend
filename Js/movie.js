const myKey = "7c3573ffeda9c585881c4a045c0b54c9";

async function load(targetDate) {
  try {
    const response = await fetch(
      `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${myKey}&targetDt=${targetDate}`,
    );

    const data = await response.json();
    const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;

    let result = "";
    dailyBoxOfficeList.forEach((item) => {
      result += `<li>${item.rank}등 : <a href='${item.movieCd}'>${item.movieNm}</a></li>`;
    });
    document.querySelector(".resultDate").innerHTML = result;
  } catch (err) {}
}

const form = document.querySelector("#search");
const input = form.querySelector("#targetDate");

// date 날짜 항상 어제 날짜까지만 가능하도록

function getYesterday() {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

input.max = getYesterday();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   input의 값은 yyyy-mm-dd 형식임. 파라미터로는 yyyymmdd 형태로 줘야함
  // 따라서 .rjeplaceAll("-", "") 사용해서 - 제거함.
  const date = input.value.replaceAll("-", "");
  load(date);
});

// document.querySelector("date").max = today();

// 영화명 클릭시 영화상세정보 가져와서 화면에 보여주기.
// 1) movieCd 값 가져오기 : href
// 2) a 태그 기능 중지 : e.preventDefault()

// url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=82ca741a2844c5c180a208137bb92bd7&movieCd=20124079"

// movieCd를 하이퍼링크 자체에 속성값으로 저장한 다음에 getAttribute를 통해 바로 가져옴!

const resultDate = document.querySelector(".resultDate");

resultDate.addEventListener("click", (e) => {
  if (e.target.tagName !== "A") return;

  e.preventDefault();

  const targetMovieCd = e.target.getAttribute("href");

  loadDetail(targetMovieCd);

  // window.open(url);
});

async function loadDetail(targetMovie) {
  try {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${myKey}&movieCd=${targetMovie}`;

    const response = await fetch(url);
    const data = await response.json();

    const info = data.movieInfoResult.movieInfo;

    let result = "<ul>";

    result += `<li>영화 이름 : ${info.movieNm}</li>`;
    result += `<li>개봉일 : ${info.openDt}</li>`;

    // 장르
    let genres = "";
    info.genres.forEach((genre) => {
      genres += `${genre.genreNm},`;
    });
    result += `<li>장르 : ${genres}</li>`;

    let directors = "";
    info.directors.forEach((director) => {
      directors += `${director.peopleNm},`;
    });
    result += `<li>감독 : ${directors}</li>`;

    // 출연배우
    let actors = "";
    info.actors.forEach((actor) => {
      actors += `${actor.peopleNm},`;
    });

    result += `<li>출연배우 : ${actors}</li>`;
    result += `<li>영화등급 : ${info.audits[0].watchGradeNm}</li>`;
    result += `</ul>`;

    document.querySelector("#detail").innerHTML = result;
  } catch {}
}
