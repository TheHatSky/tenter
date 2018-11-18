export enum Orientation {
	Portrait,
	Landscape
}

export enum DpiMode {
	Normal,
	Retina
}

export class Device {
	static Mobile = new Device("mobile", "s", "s", "1rem", "1rem");
	static Phablet = new Device("phablet", "s", "m", "1rem", "1rem");
	static Tablet = new Device("tablet", "m", "l", "1rem", "1rem");
	static Desktop = new Device("desktop", "m", "l", "1rem", "1rem");
	static DesktopHd = new Device("desktop-hd", "m", "l", "1rem", "1rem");
    
	public name: string;
	public thumbnail: string;
	public iconSize: string;
	public landscapeFontSize: string;
	public portraitFontSize: string;

	public get imageFolder(): string {
        return this.name;
    }

	constructor(
		name: string,
		iconSize: string,
		thumbnail: "s" | "m" | "l",
		landscapeFontSize: string,
		portraitFontSize: string
	)
	{
		this.name = name;
		this.iconSize = iconSize;
		this.thumbnail = thumbnail;
		this.landscapeFontSize = landscapeFontSize;
		this.portraitFontSize = portraitFontSize;
	}
}
