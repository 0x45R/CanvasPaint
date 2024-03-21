
let template = document.createElement("template");
template.innerHTML = `
<style>
*{
	margin:0;
	padding:0;
	box-sizing:border-box;
}
:host{
position:relative;

}
div{
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content: center;
align-items:center;
}
separator{
width:1px;
background-color:lightgray;

}
button{
padding:0.5rem;
border:0;
background:transparent;
cursor:pointer;
}
.color-palette-popup{
position:absolute;
background:white;
width:32px;
height:auto;
max-height:600px;
bottom:50px;
border-radius:0.25rem;
box-shadow: 0px 0px 0.5rem rgba(0,0,0,0.3);
transition: 100ms max-height;
overflow-y:scroll;
overflow-x:hidden;
display:flex;
padding:0.25rem;
gap:0.25rem;
flex-direction:column;
flex-wrap:nowrap;
justify-content:end;
}

.hidden{
max-height:0px;
padding:0;
}

</style>

<button class='js-palette-button'><box-icon class='palette-icon' name='palette' type='solid' color='black'></box-icon></button>
<div class='color-palette-popup hidden'>

</div>
`;
let templateContent = template.content;
let tileTemplate = document.createElement("template");
tileTemplate.innerHTML = `
<style>
:host{
height:24px;
width:24px;
border-radius:0.25rem;
box-shadow: 0px 0px 0.25rem rgba(0,0,0,0.3);
cursor:pointer;}
</style>
`
let tileTemplateContent = tileTemplate.content;
class SelectColorTile extends HTMLElement{
	static observedAttributes = ["color"];
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(tileTemplateContent.cloneNode(true))
		this.getRootNode().addEventListener("click", ()=>this.clicked())

	}
	clicked(){
		let host = this.getRootNode().host
		let reference = host.offsetParent.getReference()
		let color =  this.getAttribute("color")
		host.paletteIcon.setAttribute("color",color)
		reference.strokeColor = color
		console.log(reference)
	}
	attributeChangedCallback(){
		this.getRootNode().style.backgroundColor = this.getAttribute("color")
	}
}

window.customElements.define("paint-select-color-tile", SelectColorTile);
class ColorPaletteTool extends HTMLElement{
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
		const {host} = this.getRootNode()
		this.reference = host.getReference()
		console.log(this.reference)
		this.paletteIcon = shadowRoot.querySelector(".palette-icon")
		this.palettePopup = shadowRoot.querySelector(".color-palette-popup")
		this.paletteButton = shadowRoot.querySelector(".js-palette-button")
		this.paletteButton.addEventListener("click", ()=>{
			this.palettePopup.classList.toggle("hidden");
		})
		this.colors = ["black","#ff595e","#ffca3a","#8ac926","#1982c4","#6a4c93","white"]
		this.colors.forEach(color => {
			let tile = document.createElement("paint-select-color-tile")
			tile.setAttribute("color", color)
			this.palettePopup.appendChild(tile)
		})
	}

}

window.customElements.define("paint-color-palette-tool", ColorPaletteTool);
