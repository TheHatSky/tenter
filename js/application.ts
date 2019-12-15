import "./vendor/evil-icons.js";
import "./snap.scss";

import { Settings } from "./Settings";
import { Orientation, Device } from "./Device";

type Gallery = "weddings" | "fashion" | "commercial";

type ResizeFunc = () => void;

class Application {
	public settings: Settings;

	private sizes: { [gallery: string] : number };

	private static BlockSpeed = 150;
	private static navigationSelector = '.navigation';
	private static LeftNavigationSelector = '.left' + Application.navigationSelector;
	private static RightNavigationSelector = '.right' + Application.navigationSelector;

	constructor() {
		this.settings = new Settings();
		this.sizes = {
			"weddings": 14,
			"fashion": 14,
			"commercial": 14
		};

		this.onOrientationChange();

		// On load finish
		this.initialize();

		for(let name of ["eCOph24", "2SSDovb", "NNgTqg1"])
		{
			const img = new Image();
			img.src = `./images/${name}${this.settings.device.thumbnail}.jpg`;
		}
		
		document.querySelectorAll('[data-image-name]').forEach((element) => {
			const imageName = element.getAttribute('data-image-name');
			//elem.css('background-image', 'url(/images/' + this.settings.device.imageFolder + '/' + imageName + ')');
			//elem.css('background-image', `url(https://i.imgur.com/${imageName}${this.settings.device.imgurThumbnail}.jpg)`);
			const imgL = new Image();
			imgL.src = `images/${imageName}${this.settings.device.thumbnail}.jpg`;
		});

		this.onScreenSizeChange();
	}

	private updateGallaryBackgroudSize = (sizeChanged: boolean) => {
		if (this.settings.orientation == Orientation.Portrait)
			document.querySelector<HTMLElement>('.portrait').style.backgroundSize = 'cover';
		else
			document.querySelector<HTMLElement>('.portrait').style.backgroundSize = 'contain';

		if (sizeChanged){
			document.querySelectorAll<HTMLElement>('[data-image-name]').forEach((element) => {
				const imageName = element.getAttribute('data-image-name');
				//elem.css('background-image', 'url(/images/' + this.settings.device.imageFolder + '/' + imageName + ')');
				//elem.css('background-image', `url(https://i.imgur.com/${imageName}${this.settings.device.imgurThumbnail}.jpg)`);
				element.style.backgroundImage  = `url(images/${imageName}${this.settings.device.thumbnail}.jpg)`;
			});
			
			for (let key in this.sizes) {
				const size = this.sizes[key];
				
				const width = this.settings.screenWidth / (size + 1);
				/*
				$('.case.' + key)
					.find('.fp-slidesNav > ul > li > a > span')
					.css('width', width + 'px')
					.css('left', 0);
					
				$('.case.' + key)
					.find('.fp-slidesNav ul li')
					.css('width', width + 'px')
				*/
			}
		}
	};

	private updateIconsSize = () => {
		document.querySelectorAll<HTMLElement>('.icon--s, .icon--m, .icon--l').forEach((element) => {
			element.classList.remove('icon--s');
			element.classList.remove('icon--m');
			element.classList.remove('icon--l');
			element.classList.add('icon--' + this.settings.device.iconSize);
		});
	}

	private prepareIconsSize = () => {
		// $('.container').find('[data-size]').each((index, element) => {
		// 	$(element).attr('data-size', this.settings.device.iconSize);
		// });
	}

	private checkResize = () => {
		const newSettings = new Settings();
		
		const widhtChanged = newSettings.screenWidth != this.settings.screenWidth;
		const heightChanged = newSettings.screenHeight != this.settings.screenHeight;

		return widhtChanged || heightChanged;           
	}
	
	private resizeWatcher = () => {
		setTimeout(() => {
			// if(this.checkResize())
				// $(window).trigger('resize');
			this.resizeWatcher();
		}, 200);
	}
	
	private infoHandler = () => {
		// $(document).on('click', '.open', () => {
		// 	$('.close').removeClass('hidden').show();
		// 	$('.open').hide();
		// 	$('.description').fadeIn(300);
		// });

		// $(document).on('click', '.close', () => {
		// 	$('.close').hide();
		// 	$('.open').show();
		// 	$('.description').fadeOut(300);
		// });
	}
	
	private isOnscreen = function(el: HTMLElement) {
		return !(
			(el.offsetLeft + el.offsetWidth) < 0 
			|| (el.offsetTop + el.offsetHeight) < 0
			|| (el.offsetLeft > window.innerWidth || el.offsetTop > window.innerHeight)
		);
	};
	
	private setInfoVisibility = () => {
		// const isBackground = $('section.active .fp-slidesNav')
		// 	.find('li a')
		// 	.first()
		// 	.hasClass('active');

		// if (isBackground)
		// 	$('.bottom.layout-menu').fadeOut(300);
		// else
		// 	$('.bottom.layout-menu').fadeIn(300);
	}

	private onScreenSizeChange() {
		let idToBeRemoved = 'mobile_device';
		let idToBeShown = 'other_device';

		if (this.settings.device == Device.Mobile) {
			idToBeRemoved = 'other_device';
			idToBeShown = 'mobile_device';
		}

		document.getElementById(idToBeRemoved).className = "none";
		document.getElementById(idToBeShown).className = "";
	}

	private onOrientationChange() {
	}

	private initialize = () => {
		// $(window).resize(
		// 	() => {
		// 		const oldDevice = this.settings.device;
		// 		this.settings = new Settings();
				
		// 		const isDeviceChanged = oldDevice != this.settings.device; 
				
		// 		setTimeout(() => {
		// 			this.updateGallaryBackgroudSize(isDeviceChanged);
		// 			this.updateIconsSize();
		// 			this.onScreenSizeChange();
		// 			this.onOrientationChange();
		// 		}, 0);
		// 	});
			
		this.resizeWatcher();

		this.updateGallaryBackgroudSize(true);
		this.prepareIconsSize();
		// this.infoHandler();
		
		setTimeout(function() {
			// $('.loader').fadeOut(1000);
			document.querySelector('.loader').remove();
		}, 1000);
		/*
		$('#fullpage').fullpage({
			sectionSelector: 'section',
			anchors: ['', 'contacts', "weddings", "fashion", "commercial"],
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
				const gallerySize = this.sizes[anchorLink];
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
		*/
	}
}

window['Application'] = new Application();
