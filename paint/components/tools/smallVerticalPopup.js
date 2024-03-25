
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
::slotted(div[slot=list]){
display:flex;
gap:0.5rem;
flex-direction:column;
align-items:center;
justify-content:center;
}
.vertical-popup{
position:absolute;
background:white;
width:32px;
height:auto;
max-height:600px;
bottom:50px;
border-radius:0.25rem;
box-shadow: 0px 0px 0.5rem rgba(0,0,0,0.3);
transition: 100ms max-height;
overflow-y:hidden;
overflow-x:hidden;
display:flex;
padding:0.25rem;
gap:0.25rem;
flex-direction:column;
flex-wrap:nowrap;
justify-content:end;
align-items:center;
}

.hidden{
max-height:0px;
padding:0;
}

</style>
<button class='js-open-popup'>
	<slot name='button'></slot>
</button>
<div class='vertical-popup hidden'>
<slot class='list' name='list'></slot>
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
/*let tileTemplateContent = tileTemplate.content;
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
*/
class VerticalPopup extends HTMLElement{
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
	
		this.verticalPopup = shadowRoot.querySelector(".vertical-popup")

		this.openPopupButton = shadowRoot.querySelector("button.js-open-popup")
		this.openPopupButton.addEventListener("click", ()=>this.clicked())
	}
	clicked(){
		this.verticalPopup.classList.toggle("hidden")
	}

}

window.customElements.define("vertical-popup", VerticalPopup);
