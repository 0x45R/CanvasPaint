let template = document.createElement("template");
template.innerHTML = `
<style>
*{
	margin:0px;
	padding:0px;
	box-sizing:border-box;
}
:host{
	background:white;
	box-shadow:0px 0px 0.5rem rgba(0,0,0,0.3);
	font-weight:500;font-size:1rem;
	border-radius:0.5rem;
	display:flex;
	justify-content:space-between;
	flex-direction:row;
	gap:0.5rem;
	flex:1;
	width:100%;
}
</style>
<canvas></canvas>
`;
let templateContent = template.content;

class PaintCanvas extends HTMLElement{
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
	}
}

window.customElements.define("paint-canvas", PaintCanvas);
