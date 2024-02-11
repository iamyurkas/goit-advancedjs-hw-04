import{i as l,S as y,a as v}from"./assets/vendor-527658dd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const o={form:document.querySelector("#search-form"),input:document.querySelector("input"),gallery:document.querySelector(".gallery"),loadBtn:document.querySelector(".load-more")};l.settings({timeout:2e3,position:"topRight",transitionIn:"fadeInRight",transitionOut:"fadeOutLeft",maxWidth:350});var h=new y(".photo-card a",{});let u;const f=40;let c=1,d;o.form.addEventListener("submit",b);o.loadBtn.addEventListener("click",L);async function b(i){if(i.preventDefault(),d=o.form[0].value.trim().toLowerCase(),o.loadBtn.classList.add("hidden"),d){c=1,o.form.reset();try{const r=await p(d,c,f);if(!r.hits.length){l.error({message:"Sorry, there are no images matching your search query. Please try again."}),o.gallery.innerHTML="<div></div>";return}l.success({message:`Hooray! We found ${r.totalHits} images.`}),o.gallery.innerHTML=m(r.hits),h.refresh()}catch{}}else l.warning({message:"Fill in the search field!"}),o.gallery.innerHTML="<div></div>"}async function L(){c+=1;try{const i=await p(d,c,f);o.gallery.insertAdjacentHTML("beforeend",m(i.hits)),h.refresh(),u=o.gallery.firstElementChild.getBoundingClientRect(),scrollBy({top:u.height*3,behavior:"smooth"}),c>=i.totalHits/f&&o.loadBtn.classList.add("hidden")}catch{}}function m(i){return i.map(({webformatURL:r,largeImageURL:a,tags:s,likes:e,views:t,comments:n,downloads:g})=>`
    <div class="photo-card">
        <a class="gallery-link" href="${a}">
            <div class="thumb">
                <img src="${r}" alt="${s}" loading="lazy" width="360" />
            </div>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${e}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${t}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${n}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${g}
                    </p>
            </div>
        </a>
    </div>
    `).join("")}async function p(i,r=1,a){const s={params:{key:"42322545-3f83537899e903f7192654afe",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:r}},{data:e}=await v.get("https://pixabay.com/api/",s);return r<=e.totalHits/a?o.loadBtn.classList.remove("hidden"):e.totalHits&&l.error({message:"We're sorry, but you've reached the end of search results."}),e}
//# sourceMappingURL=commonHelpers.js.map
