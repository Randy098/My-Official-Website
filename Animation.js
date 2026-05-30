window.addEventListener('scroll',()=>{

const header=document.querySelector('header');

if(window.scrollY>50){
header.style.background='rgba(0,0,0,0.95)';
}else{
header.style.background='rgba(0,0,0,0.82)';
}

});

const chapterDatabase = {

Genesis: [
"Chapter 1 — The Beginning & The War on Heaven"
],

Psalms: [],

Evolution: [],

Revolution: []

};

const volumeSelect=document.getElementById("volumeSelect");
const chapterSelect=document.getElementById("chapterSelect");

const mangaReader=document.getElementById("mangaReader");

/* DEFAULT IMAGES */

const defaultImages=[

"https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",

"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",

"https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop"

];

const comicImages=[...defaultImages];

volumeSelect.addEventListener("change",()=>{

const selectedVolume=volumeSelect.value;

chapterSelect.innerHTML="";

if(chapterDatabase[selectedVolume].length===0){

const option=document.createElement("option");
option.textContent="No Chapters Available Yet";
chapterSelect.appendChild(option);

mangaReader.innerHTML=`

<div class="no-panels">

NO AVAILABLE PANELS YET

</div>

`;

comicImages.length=0;

}else{

chapterDatabase[selectedVolume].forEach(chapter=>{

const option=document.createElement("option");
option.textContent=chapter;
chapterSelect.appendChild(option);

});

mangaReader.innerHTML=`

<img class="comic-page" src="${defaultImages[0]}">

<img class="comic-page" src="${defaultImages[1]}">

<img class="comic-page" src="${defaultImages[2]}">

<div class="end-comic">

<h2>END OF THE COMIC</h2>

<p>
You have reached the end of this chapter.
</p>

</div>

`;

comicImages.length=0;
comicImages.push(...defaultImages);

}

});

let password=prompt(
"Enter Admin Password\n\nHint: I RECOMMEND YOU LEAVE IT BLANK AND JUST CLICK OK"
);

if(password==="creatorbitos143"){

document.getElementById("adminPanel").style.display="block";

}else if(password!=="" && password!==null){

alert("WRONG PASSWORD, TRY AGAIN");

}

/* READER MODES */

const verticalBtn=document.getElementById("verticalBtn");
const pageBtn=document.getElementById("pageBtn");

const pageOverlay=document.getElementById("pageOverlay");

verticalBtn.addEventListener("click",()=>{

verticalBtn.classList.add("active");
pageBtn.classList.remove("active");

pageOverlay.style.display="none";

});

pageBtn.addEventListener("click",()=>{

if(comicImages.length===0){

alert("NO AVAILABLE PANELS YET");
return;

}

pageBtn.classList.add("active");
verticalBtn.classList.remove("active");

pageOverlay.style.display="flex";

updatePageMode();

});

let currentPage=0;

function updatePageMode(){

const image=document.getElementById("singlePageView");

image.style.animation="none";
void image.offsetWidth;

image.src=comicImages[currentPage];

image.style.animation="slidePage 0.45s ease";

}

function nextPage(){

if(currentPage<comicImages.length-1){

currentPage++;
updatePageMode();

}

}

function previousPage(){

if(currentPage>0){

currentPage--;
updatePageMode();

}

}

function closePageMode(){

pageOverlay.style.display="none";

verticalBtn.classList.add("active");
pageBtn.classList.remove("active");

}

function uploadSingleImage(){

alert("Single comic image uploaded successfully.");

}

function uploadCoverPage(){

alert("Cover page uploaded successfully.");

}

function uploadPanels(){

const files=document.getElementById("panelUpload").files;

if(files.length>20){

alert("Maximum upload limit is 20 images only.");
return;

}

if(files.length===0){

alert("Please upload at least one image.");
return;

}

mangaReader.innerHTML="";

comicImages.length=0;

for(let i=0;i<files.length;i++){

const file=files[i];

const fileReader=new FileReader();

fileReader.onload=function(e){

const img=document.createElement("img");

img.src=e.target.result;

img.className="comic-page";

mangaReader.appendChild(img);

comicImages.push(e.target.result);

if(i===files.length-1){

const endDiv=document.createElement("div");

endDiv.className="end-comic";

endDiv.innerHTML=`

<h2>END OF THE COMIC</h2>

<p>
You have reached the end of this chapter.
</p>

`;

mangaReader.appendChild(endDiv);

updatePageMode();

}

}

fileReader.readAsDataURL(file);

}

alert("Comic panels uploaded successfully.");

}
