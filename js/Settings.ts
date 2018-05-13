import { Device, DpiMode, Orientation } from "./Device";

export class Settings {
	public screenWidth: number;
	public screenHeight: number;

	private _dpiMode: DpiMode;

	get orientation(): Orientation {
		return this.screenHeight > this.screenWidth
			? Orientation.Portrait
			: Orientation.Landscape;
	}

	get device(): Device {
		var deviceWidth = this.orientation == Orientation.Portrait
			? this.screenHeight
			: this.screenWidth;

		if (deviceWidth < 550)
			return Device.Mobile;
		else if (deviceWidth < 700)
			return Device.Phablet;
		else if (deviceWidth < 1000)
			return Device.Tablet;
		else if (deviceWidth < 1200)
			return Device.Desktop;
		return Device.DesktopHd;
	}

	get dpiMode(): DpiMode {

		if (this._dpiMode == null) {
			var isRetina = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2));

			this._dpiMode = isRetina
				? DpiMode.Retina
				: DpiMode.Normal;
		}

		return this._dpiMode;
	}

	constructor() {
		this.screenWidth = $(window).width();
		this.screenHeight = $(window).height();
	}
}
