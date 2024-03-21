let template = document.createElement("template");
template.innerHTML = `
<style>
*{
	margin:0px;
	padding:0px;
	box-sizing:border-box;
}
:host{
	background-image:url("/paint/img/transparent_grid.png");
	background-repeat:repeat;
	box-shadow:0px 0px 0.5rem rgba(0,0,0,0.3);
	font-weight:500;font-size:1rem;
	border-radius:0.5rem;
	display:flex;
	justify-content:center;
	align-items:center;
	flex-direction:row;
	gap:0.5rem;
	background-size: 100px;
	flex:1;
	width:100%;
	overflow:hidden;
	position:relative;
	background-position:center;
	transition: background-size 300ms;
}
canvas{
scale:0.5;
background:white;
box-shadow: 0px 0px 2rem rgba(0,0,0,0.75);
transition: scale 300ms, translate 300ms;
}
.info{
position:absolute;
top:0;
left:0;
margin:0.5rem;
z-index:1;
}
</style>
<div class='info'>
<p>Untitled</p>
<p class='scale_label'>0.5 scale</p>
</div>
<canvas></canvas>
`;
let templateContent = template.content;

class PaintCanvas extends HTMLElement{
	static observedAttributes = ["scale", "width", "height"];
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))

		this.resolution = {x: 1920, y: 1080}
		this.scrollSensitivity = 0.0001;
		this.setAttribute("scale",0.5)

		this.canvas = shadowRoot.querySelector("canvas")
		this.canvas.style.width = this.resolution.x+"px"
		this.canvas.style.height = this.resolution.y+"px"

		this.setAttribute("scale",0.5)
		this.updateScale()

		this.addEventListener("mousemove",(event)=>{
			let {offsetX: x,offsetY: y} = event
			let scale = this.getAttribute("scale")
			let {width, height} = this.canvas.getBoundingClientRect()
			//this.canvas.style.translate = `${x}px ${(y)}px`
		})
		window.addEventListener("wheel", (event)=>this.wheelScrolled(event))
	}
	wheelScrolled(event){
		let scale = parseFloat(this.getAttribute("scale"))
		let value = Math.round(event.wheelDelta)*this.scrollSensitivity;
		
		let newValue = Math.round((scale+value)*100000)/100000
		if(scale+value<=0) newValue = 0.001
		if(scale+value>=10) newValue = 9.99
		
		this.setAttribute("scale",newValue);
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if(name == "scale"){
			this.updateScale()
		}
		console.log(`Attribute ${name} has changed.`);
	}
	updateScale(){
		let scale = this.getAttribute("scale");
		this.canvas.style.scale = scale;
		this.style.backgroundSize = `${scale*300}px`
		this.shadowRoot.querySelector(".scale_label").innerText = `${scale} scale`
	}
}

window.customElements.define("paint-canvas", PaintCanvas);
