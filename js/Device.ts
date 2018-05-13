export enum Orientation {
	Portrait,
	Landscape
}

export enum DpiMode {
	Normal,
	Retina
}

export class Device {
	static Mobile = new Device("mobile", "s", "m", "1rem", "1rem");
	static Phablet = new Device("phablet", "s", "l", "1rem", "1rem");
	static Tablet = new Device("tablet", "m", "h", "1rem", "1rem");
	static Desktop = new Device("desktop", "m", "h", "1rem", "1rem");
	static DesktopHd = new Device("desktop-hd", "m", "", "1rem", "1rem");
    
	public name: string;
	public imgurThumbnail: string;
	public iconSize: string;
	public landscapeFontSize: string;
	public portraitFontSize: string;

	public get imageFolder(): string {
        return this.name;
    }

	constructor(
		name: string,
		iconSize: string,
		imgurThumbnail: string,
		landscapeFontSize: string,
		portraitFontSize: string
	)
	{
		this.name = name;
		this.iconSize = iconSize;
		this.imgurThumbnail = imgurThumbnail;
		this.landscapeFontSize = landscapeFontSize;
		this.portraitFontSize = portraitFontSize;
	}
}
