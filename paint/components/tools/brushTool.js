import * as verticalPopup from "./smallVerticalPopup.js"
let template = document.createElement("template");
template.innerHTML = `
<vertical-popup>
<box-icon slot="button" name='paint' type='solid'></box-icon>
<div slot="list">
<brush-stroke-size-tile size=1></brush-stroke-size-tile>
<brush-stroke-size-tile size=2></brush-stroke-size-tile>
<brush-stroke-size-tile size=4></brush-stroke-size-tile>
<brush-stroke-size-tile size=8></brush-stroke-size-tile>
<brush-stroke-size-tile size=16></brush-stroke-size-tile>
</div>
</vertical-popup>
`;
let templateContent = template.content;
let tileTemplate = document.createElement("template");
tileTemplate.innerHTML = `
<style>
:host{
height:24px;
width:24px;
border-radius:50%;
box-shadow: 0px 0px 0.25rem rgba(0,0,0,0.3);
cursor:pointer;display:block;

background: radial-gradient(black var(--size), white var(--size), white 100%);
}
</style>
`
let tileTemplateContent = tileTemplate.content;
class BrushStrokeSizeTile extends HTMLElement{
	static observedAttributes = ["size"];
	constructor(){
		super();

		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(tileTemplateContent.cloneNode(true))
		
		this.addEventListener('click', ()=>this.clicked())
		const {host} = this.getRootNode()
		this.reference = host.getReference()
	}

	clicked(){
		this.reference.strokeSize = this.getAttribute('size')
		console.log(this.getAttribute('size'))
	}
	connectedCallback(){
		this.style.setProperty('--size', this.getAttribute("size")+'px')
	}
}

window.customElements.define("brush-stroke-size-tile", BrushStrokeSizeTile);
class BrushTool extends HTMLElement{
	constructor(){
		super();
		
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
		
		const {host} = this.getRootNode()
		this.reference = host.getReference()
	}
	
	getReference(){
		const {host} = this.getRootNode()
		return host.getReference()
	}
	

}

window.customElements.define("brush-tool", BrushTool);
