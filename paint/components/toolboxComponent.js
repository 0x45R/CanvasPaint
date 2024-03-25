import * as colorPaletteTool from "./tools/colorPaletteTool.js";
import * as brushTool from "./tools/brushTool.js"
let template = document.createElement("template");
template.innerHTML = `
<style>
*{
	margin:0;
	padding:0;
	box-sizing:border-box;
}
:host{
position:absolute;
	background:white;
	box-shadow:0px 0px 0.5rem rgba(0,0,0,0.3);
	padding:0rem !important;
	font-weight:500;font-size:1rem;
	border-radius:0.5rem;
	display:flex;
	justify-content:center;
	flex-direction:row;
	align-items:center;
	gap:0rem;
	flex-wrap: wrap;

display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content: center;
}
separator{
width:1px;
height:24px;
background-color:lightgray;

}
button{
padding:0.5rem;
border:0;
background:transparent;
cursor:pointer;
}
</style>

<button class="js-move-button"><box-icon name='move' ></box-icon></button>
<separator></separator>
<button><box-icon name='eraser'></box-icon></button>
<brush-tool></brush-tool>
<paint-color-palette-tool></paint-color-palette-tool>
<button><box-icon name='color-fill'></box-icon></button>
<button><box-icon name='edit'></box-icon></button>
<separator></separator>
<button><box-icon name='menu' ></box-icon></button>

`;
let templateContent = template.content;

class PaintToolbox extends HTMLElement{
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
		// PLEASE MAKE THIS INTO A SINGLE COMPONENT
		this.moveButton = shadowRoot.querySelector(".js-move-button")
		this.moveButton.addEventListener("mousedown",(event)=>this.moveToolbox(event))
		this.moveButton.addEventListener("mouseup", (event)=>{
			this.canMove = false;
			this.getReference().canDraw = true
		
		})
		this.moveButton.addEventListener("mouseenter", (event)=>{
			this.canMove=true;
			this.moveToolbox(event);
			this.getReference().canDraw = false
		})

		window.addEventListener("mousemove",(event)=>this.moveToolbox(event))
	}
	getReference(){
		return document.getElementById(this.getAttribute("ref"))
	}
	moveToolbox(event){
		const pressed = (event.buttons & 1) === 1;
		const {x,y} = event;
		const {width, height } = this.moveButton.getBoundingClientRect();
		if(pressed && this.canMove){

			this.style.left = x -(width/2) + 'px';
			this.style.top = y - (height/2) + 'px';
		}
	}
}

window.customElements.define("paint-toolbox", PaintToolbox);
