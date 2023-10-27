(()=>{"use strict";const e="cfd8ad8f2d19b724a21ca2510b450da9",t="https://api.themoviedb.org/3/";(async()=>{const a=window.location.search.split("=")[1],n=await(async(a,n=1,i)=>{const s=e,l=t;let o;return o=i?await fetch(`${l}${a}?query=${i}&api_key=${s}&language=sv-SE&page=${n}`):await fetch(`${l}${a}?api_key=${s}&language=sv-SE&page=${n}`),await o.json()})(`movie/${a}`),i=document.createElement("div");console.log(i),i.innerHTML=`\n    <div class="details-top">      \n      <div>${n.poster_path?`<img src="https://image.tmdb.org/t/p/w500${n.poster_path}" alt="${n.title}"/>`:`<img src="./assets/images/No-Image.jpg" alt="${n.title}" />`}</div>\n      <div  class="info">\n        <h2>${n.title}</h2>\n        <p>\n          <i class="fas fa-star rating"></i>\n          ${n.vote_average.toFixed(1)} / 10\n        </p>\n        <p class="text-muted">Premiär: ${n.release_date}</p>\n        <p>${n.overview}</p>\n        <h5>Genre</h5>\n        <ul>\n          ${n.genres.map((e=>`<li>${e.name}</li>`)).join("")}\n        </ul>\n        <p class="text-muted">Längd ${Math.floor(n.runtime/60)} tim ${n.runtime%60} min</p>\n      </div>\n    </div>\n  `,document.querySelector("#details").appendChild(i);const s=document.createElement("div");s.style.backgroundImage=n.backdrop_path?`url(https://image.tmdb.org/t/p/original/${n.backdrop_path})`:null,s.style.backgroundSize="cover",s.style.backgroundPosition="center",s.style.backgroundRepeat="no-repeat",s.style.height="100vh",s.style.width="100vw",s.style.position="absolute",s.style.top="0",s.style.left="0",s.style.zIndex="-1",s.style.opacity="0.4",document.querySelector("#details").appendChild(s)})()})();