let template = document.createElement("template");
template.innerHTML = `
<style>
*{
	margin:0px;
	padding:0px;
	box-sizing:border-box;
}
:host{
	background-position:center;
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
	transition: background-size 300ms;
}
canvas{
scale:0.5;
background:white;
box-shadow: 0px 0px 2rem rgba(0,0,0,0.75);
transition: scale 300ms;
position:absolute;
cursor:crosshair;
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
<p class='offset_label'>0, 0 offset</p>
</div>
<canvas></canvas>
`;
let templateContent = template.content;
const lerp = (a, b, n) => (1 - n) * a + n * b
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
class PaintCanvas extends HTMLElement{
	static observedAttributes = ["scale", "width", "height"];
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
		this.strokeColor = "black"
		this.strokeSize = 10
		this.canDraw = true
		
		this.host = shadowRoot.getRootNode().host
		this.resolution = {x: 1920, y: 1080}
		this.canvasSize = this.host.getBoundingClientRect()
		const {width: canvasWidth, height: canvasHeight} = this.canvasSize
	 	this.offset = {x:0,y:0}
		this.scrollSensitivity = 0.0005;

		this.canvas = shadowRoot.querySelector("canvas")
		this.canvas.width = this.resolution.x
		this.canvas.height = this.resolution.y
		this.canvas.style.width = this.resolution.x+"px"
		this.canvas.style.height = this.resolution.y+"px"

		this.context = this.canvas.getContext('2d')

		this.setAttribute("scale",0.8)
		this.updateScale()
		this.updateOffset()
		this.canvas.addEventListener("mousemove", (event)=>this.canvasMouseMoved(event))
		this.canvas.addEventListener("mousedown",(event)=>this.canvasMouseMoved(event))
		window.addEventListener("mousedown", ()=>this.context.beginPath())
		window.addEventListener("mouseup", ()=>this.context.closePath())
		this.addEventListener("mousemove",(event)=>this.mouseMoved(event))
		window.addEventListener("wheel", (event)=>this.wheelScrolled(event))
		document.addEventListener(
		    "wheel",
		    function touchHandler(e) {
		      if (e.ctrlKey) {
			e.preventDefault();
		      }
		    }, { passive: false } );
	}
	canvasStroke(event){
		const {offsetX:x,offsetY:y} = event
	//this.context.beginPath()
		this.context.strokeStyle = this.strokeColor
		console.log(this.strokeColor)
		this.context.lineWidth = this.strokeSize
		this.context.lineCap = 'round'
		this.context.lineJoin = 'round'
		this.context.lineTo(x,y)
		this.context.stroke()
	 //this.context.closePath()
		this.context.moveTo(x,y)

	}
	canvasMouseMoved(event){
		const {offsetX:x,offsetY:y} = event
	//this.context.moveTo(x,y)
		if(event.buttons == 1 && this.canDraw){
	
			this.canvasStroke(event)
		}else{
		
			this.context.moveTo(x,y)
		}
	}
	updateOffset(){
		const {height,width} = this.canvas.getBoundingClientRect()
		const {height : canvasHeight,  width: canvasWidth} = this.canvasSize
		let left = (this.offset.x)
		let top = (this.offset.y)
		this.canvas.style.cursor = "move"
		this.style.backgroundPosition = `${left}px ${top}px`
		
	 	//this.canvas.style.left = `${left-width-canvasWidth/2}px`
		//this.canvas.style.top = `${top-height-canvasHeight/2}px`
		this.canvas.style.translate = `${left}px ${top}px`
		this.shadowRoot.querySelector(".offset_label").innerText = `${left}, ${top} offset`
	}
	mouseMoved(event)
	{
		let {offsetX, offsetY} = event
	 	//this.canvas.style.transformOrigin = `${offsetX}px ${offsetY}px`
		this.canvas.style.cursor = "crosshair"
		if(event.buttons != 4) return
		
		let {movementX: x, movementY: y} = event
	
		let scale = this.getAttribute("scale")
		this.offset.x += x
		this.offset.y += y


		this.updateOffset()
	

	}
	wheelScrolled(event){
 		if(!event.ctrlKey) return
		let scale = parseFloat(this.getAttribute("scale"))
		let value = Math.round(event.wheelDelta)*this.scrollSensitivity;
		
		let newValue = Math.round((scale+value)*100000)/100000
		newValue = clamp(newValue,0.001,10)
		
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
