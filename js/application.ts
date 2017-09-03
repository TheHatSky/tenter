/// <reference path="../typings/tsd.d.ts" />

enum Orientation {
	Portrait,
	Landscape
}

class Device {
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

enum DpiMode {
	Normal,
	Retina
}

module Tenter {
	class Gallary {
		public static Weddings = "weddings";
		public static Fashion = "fashion";
		public static Commercial = "commercial";
	}

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

	type ResizeFunc = () => void;

	export class Application {
		public settings: Settings;

		private onResizeFunctions: ResizeFunc[];
		private sizes: { [gallaryName: string] : number };

		private static BlockSpeed = 150;
		private static navigationSelector = '.navigation';
		private static LeftNavigationSelector = '.left' + Application.navigationSelector;
		private static RightNavigationSelector = '.right' + Application.navigationSelector;

		constructor() {
			this.settings = new Settings();
			this.onResizeFunctions = new Array<ResizeFunc>();
			this.sizes = {};

			$(this.initialize);
		}

		public setWeddingsGallerySize(size: number) {
			this.setGallarySize(Gallary.Weddings, size);
		}

		public setFashionGallarySize(size: number) {
			this.setGallarySize(Gallary.Fashion, size);
		}

		public setCommercialGallerySize(size: number) {
			this.setGallarySize(Gallary.Commercial, size);
		}

		private setGallarySize = (galleryName: string, size: number) => {
			if (size <= 0)
				throw new RangeError("Gallary size must be greater than zero.");
			if (this.sizes[galleryName] != null)
				throw new Error("Gallary " + galleryName + 'is already registered.');

			this.sizes[galleryName] = size;
		}

		private updateGallaryBackgroudSize = (sizeChanged: boolean) => {
			if (this.settings.orientation == Orientation.Portrait)
				$('.portrait').css('background-size', 'cover');
			else
				$('.portrait').css('background-size', 'contain');

			if (sizeChanged){
				$('[data-image-name]').each((index, element) => {
					var elem = $(element);
					var imageName = elem.data('image-name');
					//elem.css('background-image', 'url(/images/' + this.settings.device.imageFolder + '/' + imageName + ')');
					elem.css('background-image', `url(https://i.imgur.com/${imageName}${this.settings.device.imgurThumbnail}.jpg)`);
				});
                
                for (var key in this.sizes) {
                    if (this.sizes.hasOwnProperty(key)) {
                        var size = this.sizes[key];
                        
                        var width = this.settings.screenWidth / (size + 1);
                        
                        $('.case.' + key)
                            .find('.fp-slidesNav > ul > li > a > span')
                            .css('width', width + 'px')
                            .css('left', 0);
                            
                        $('.case.' + key)
                            .find('.fp-slidesNav ul li')
                            .css('width', width + 'px')
                    }
                }
            }
		};

		private updateIconsSize = () => {
			$('.container').find('.icon--s, .icon--m, .icon--l').each((index, element) => {
				$(element)
					.removeClass('icon--s')
					.removeClass('icon--m')
					.removeClass('icon--l')
					.addClass('icon--' + this.settings.device.iconSize);
			});
		}

		private prepareIconsSize = () => {
			$('.container').find('[data-size]').each((index, element) => {
				$(element).attr('data-size', this.settings.device.iconSize);
			});
		}

		public addOnResize = (func: ResizeFunc) => {
			this.onResizeFunctions.push(func);
		}
        
        private checkResize = () => {
            var newSettings = new Settings();
            
            var widhtChanged = newSettings.screenWidth != this.settings.screenWidth;
            var heightChanged = newSettings.screenHeight != this.settings.screenHeight;

            return widhtChanged || heightChanged;           
        }
        
        private resizeWatcher = () => {
            setTimeout(() => {
                if(this.checkResize())
                    $(window).trigger('resize');
                this.resizeWatcher();
            }, 200);
        }
        
        private infoHandler = () => {
            $(document).on('click', '.open', () => {
                $('.close').removeClass('hidden').show();
                $('.open').hide();
                $('.description').fadeIn(300);
            });

            $(document).on('click', '.close', () => {
                $('.close').hide();
                $('.open').show();
                $('.description').fadeOut(300);
            });
        }
        
        private isOnscreen = function(el: HTMLElement) {
            return !(
              (el.offsetLeft + el.offsetWidth) < 0 
              || (el.offsetTop + el.offsetHeight) < 0
              || (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
         );
        };
        
        private setInfoVisibility = () => {
            var isBackground = $('section.active .fp-slidesNav')
                .find('li a')
                .first()
                .hasClass('active');

            if (isBackground)
                $('.bottom.layout-menu').fadeOut(300);
            else
                $('.bottom.layout-menu').fadeIn(300);
        }

		private initialize = () => {
			$(window).resize(
				() => {
                    var oldDevice = this.settings.device;
					this.settings = new Settings();
                    
                    var isDeviceChanged = oldDevice != this.settings.device; 
                    
                    setTimeout(() => {
                        this.updateGallaryBackgroudSize(isDeviceChanged);
                        this.updateIconsSize();
    					this.onResizeFunctions.forEach((func) => func());
                    }, 0);
				});
                
            this.resizeWatcher();

			$('#fullpage').fullpage({
				sectionSelector: 'section',
				anchors: ['', 'contacts', Gallary.Weddings, Gallary.Fashion, Gallary.Commercial],
				slidesNavPosition: 'bottom',
				slidesNavigation: true,
                menu: '#menu',
				animateAnchor: false,
				controlArrows: false,
				loopHorizontal: false,
				afterRender: () => {
					$(Application.LeftNavigationSelector)
						.hide()
						.on('click', () => $.fn.fullpage.moveSlideLeft());

					$(Application.RightNavigationSelector)
                        .on('click', () => $.fn.fullpage.moveSlideRight());

					this.updateGallaryBackgroudSize(true);
					this.prepareIconsSize();
                    this.infoHandler();
                    
                    setTimeout(function() {
                        $('.loader').fadeOut(1000);
                    }, 1000);
				},
                afterSlideLoad: () => this.setInfoVisibility(),
                afterLoad: () => this.setInfoVisibility(),
                onLeave: (index, nextIndex, direction) => {
                    if (nextIndex != 1) {
                        $('#menu').removeClass('faded');
                    }
                    else {
                        $('#menu').addClass('faded');
                    }
                },
				onSlideLeave: (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
                    var gallerySize = this.sizes[anchorLink];
					if (gallerySize == null)
						return;

					// There is zero slide.
					if (nextSlideIndex == gallerySize) {
						this.enableGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
						this.blockGallaryNavigation(anchorLink, Application.RightNavigationSelector);
					}
					else if (nextSlideIndex == 0) {
						this.blockGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
						this.enableGallaryNavigation(anchorLink, Application.RightNavigationSelector);
					} else {
						this.enableGallaryNavigation(anchorLink, Application.LeftNavigationSelector);
						this.enableGallaryNavigation(anchorLink, Application.RightNavigationSelector);
					}
				}
			});
		}

		private blockGallaryNavigation = (gallaryName: string, navigationSelector: string) => {
			$('.' + gallaryName + ' > ' + navigationSelector).fadeOut(Application.BlockSpeed);
		}

		private enableGallaryNavigation = (gallaryName: string, navigationSelector: string) => {
			$('.' + gallaryName + ' > ' + navigationSelector).fadeIn(Application.BlockSpeed);
		}
	}
}

var Application = new Tenter.Application();
