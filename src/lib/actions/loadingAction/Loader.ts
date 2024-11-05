export default class Loader<T extends HTMLElement = HTMLElement> {
	private __loader: HTMLDivElement;

	constructor() {
		const loader = document.createElement("div");
		const loaderStyles = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        opacity: 0.75;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    loader.setAttribute("style", loaderStyles);

		this.__loader = loader;

		this.addIcon();
	}

	private addIcon() {
		const styles = `
        .loader,
        .loader:after {
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        
        .loader {
          font-size: 10px;
          position: relative;
          text-indent: -9999em;
          border-top: 2px solid rgba(0, 0, 0);
          border-right: 2px solid rgba(0, 0, 0);
          border-bottom: 2px solid rgba(0, 0, 0);
          border-left: 2px solid #ffffff;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-animation: load8 1.1s infinite linear;
          animation: load8 1.1s infinite linear;
        }
        @-webkit-keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load8 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `;

		const style = document.createElement("style");
		style.innerHTML = styles;
    this.__loader.appendChild(style);

		const icon = document.createElement("div");
		icon.className = "loader";

    this.__loader.appendChild(icon);
	}

	mount(container: T) {
    container.appendChild(this.__loader);
	}

	unmount() {
		this.__loader.remove();
	}
}
