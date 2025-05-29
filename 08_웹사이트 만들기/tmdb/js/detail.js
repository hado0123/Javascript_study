const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

// 특정 쿼리 스트링 값 가져오기 (movie_id 값)
const urlParams = new URLSearchParams(location.search)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

// 1. 영화 상세정보 바인딩

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
               <div class="row">
                  <div class="col-sm-4">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" />
                  </div>
                  <div class="col-sm-8 movie-detail">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>${data.genres.map((genre) => genre.name)}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p>${data.overview}</p>
                  </div>
               </div> 
      `

      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

// 2. 출연 배우 데이터 바인딩

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      console.log(data.cast)

      let castRowHtml = `<div class="row" style="margin-top:30px">`

      // 출연배우 6명만 출력
      for (let i = 0; i < 6; i++) {
         console.log(data.cast[i])

         castRowHtml += `
             <div class='col-sm-2 p-3'>
                <div class="card">
                  <img src="https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}" class="card-img-top" alt="${data.cast[i].name}">
                     <div class="card-body">
                       <p class="card-text">${data.cast[i].name}</p>
                     </div>
                </div>
             </div>
         `
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getCreditsMovie(movieCreditsUrl)
