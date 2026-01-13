const navbar =
document.querySelector(".navbar");


window.addEventListner("scroll", () => {
   if (window.scrollY > 50) {

      navbar.classList.add("scrolled");

   } else {
       navbar.classList.remove("scrolled");
   }
});












const reveals =
document.querySelectorALL(".reveal");

const observer = new
IntersectionObserver(
   entries =>
   {
   	entries.forEach(entry =>
   	{
   		if (entry.isIntersecting){
   			entry.target.classList.add("active");
   		}
   	});
   },
   { threshold:0.2}

	);

reveals.forEach(el =>
	observer.observe(el));


const groups =
document.querySelectorALL(".reveal-group");

const observer = new
IntersectionObserver(
   entries =>
   {
      entries.forEach(entry =>
      {
         if (entry.isIntersecting){
            entry.target.classList.add("active");
         }
      });
   },
   { threshold:0.2}

   );

groups.forEach(el =>
   observer.observe(el));





const modal = document.getElementById("socialModal");

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});