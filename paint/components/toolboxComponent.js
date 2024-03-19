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
	padding:0.5rem !important;
	font-weight:500;font-size:1rem;
	border-radius:0.5rem;
	display:flex;
	justify-content:center;
	flex-direction:row;
	align-items:center;
	gap:0.5rem;
	flex-wrap: wrap;
}
div{
display:flex;
flex-direction:row;
flex-wrap:wrap;
gap:0.5rem;
}
separator{
width:1px;
background-color:lightgray;
}
button{
border:0;
background: transparent;
cursor:pointer;
}
</style>
<div>
<button class="js-move-button"><box-icon name='move' ></box-icon></button>
<separator></separator>
<button><box-icon name='eraser' ></box-icon></button>
<button><box-icon name='paint'></box-icon></button>
<button><box-icon name='palette' type='solid' color='#c50202'></box-icon></button>
<button><box-icon name='color-fill'></box-icon></button>
<button><box-icon name='edit'></box-icon></button>
<separator></separator>
<button><box-icon name='menu' ></box-icon></button>
</div>
`;
let templateContent = template.content;

class PaintToolbox extends HTMLElement{
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
		// PLEASE MAKE THIS INTO A SINGLE COMPONENT
		this.moveButton = shadowRoot.querySelector(".js-move-button")
		this.moveButton.addEventListener("mouseenter",(event)=>this.moveToolbox(event))
		this.moveButton.addEventListener("mousemove",(event)=>this.moveToolbox(event))
	}
	moveToolbox(event){
		let pressed = (event.buttons & 1) === 1;
		console.log(pressed)
	}
}

window.customElements.define("paint-toolbox", PaintToolbox);
