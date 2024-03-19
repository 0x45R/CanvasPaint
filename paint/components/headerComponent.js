let template = document.createElement("template");
template.innerHTML = `
<style>
*{
	margin:0;
	padding:0;
	box-sizing:border-box;
}
:host{
	background:white;
	box-shadow:0px 0px 0.5rem rgba(0,0,0,0.3);
	padding:0.5rem !important;
	font-weight:500;font-size:1rem;
	border-radius:0.5rem;
	display:flex;
	justify-content:space-between;
	flex-direction:row;
	gap:0.5rem;
	width:100%;
	flex-wrap:wrap;
}
div{
display:flex;
flex-direction:row;
gap:0.5rem;
}
separator{
height:100%;
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
draw.it
<separator></separator>
<button>
<box-icon type='solid' name='file-image'></box-icon>
</button>
</div>
<div>
</div>
<div>

</div>
`;
let templateContent = template.content;

class PaintHeader extends HTMLElement{
	constructor(){
		super();
		const shadowRoot = this.attachShadow({mode: "open"})
		shadowRoot.appendChild(templateContent.cloneNode(true))
	}
}

window.customElements.define("paint-header", PaintHeader);
