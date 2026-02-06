var cl = cloudinary.Cloudinary.new({ cloud_name: "dyyvwfgqr", secure: !0 }),
	url = cl.url("sample.jpg", { width: 300, height: 200, crop: "fill" });
document.getElementById("myImage").src = url;
const slider = document.querySelector(".slider");
(document.querySelector(".right").onclick = () => {
	slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
}),
	(document.querySelector(".left").onclick = () => {
		slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
	}),
	document.addEventListener("DOMContentLoaded", () => {
		const e = document.querySelector(".tile-slider");
		if (!e) return;
		let t;
		function l() {
			e.classList.add("show-nav"),
				clearTimeout(t),
				(t = setTimeout(() => {
					e.classList.remove("show-nav");
				}, 2500));
		}
		["mousemove", "click", "touchstart", "focusin"].forEach((t) => {
			e.addEventListener(t, l);
		});
	});
